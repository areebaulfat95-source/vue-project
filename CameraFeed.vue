<template>
  <div class="camera-card">
    <div class="camera-header">
      <div>
        <p class="eyebrow">Live Feed</p>
        <h3>Camera Preview</h3>
      </div>

      <div class="header-actions">
        <span class="status-pill" :class="{ recording: isStreaming }">
          <i class="bi bi-record-circle"></i>
          {{ statusText }}
        </span>
        <button class="btn-control" @click="toggleStream">
          {{ isStreaming ? 'Stop' : 'Start' }}
        </button>
      </div>
    </div>

    <div class="camera-screen">
      <video
        ref="videoEl"
        autoplay
        playsinline
        muted
        class="camera-video"
        :class="{ mirrored: mirror }"
        v-show="isStreamAvailable"
      ></video>

      <div v-if="isStreamAvailable" class="live-detection" :class="{ empty: !detectedGesture }">
        <template v-if="detectedGesture">
          <span class="gesture-icon">{{ detectedGesture.icon }}</span>
          <div>
            <small>Detected sign</small>
            <strong>{{ detectedGesture.label }}</strong>
            <span>{{ detectedGesture.confidence }} confidence</span>
          </div>
        </template>
        <template v-else>
          <i class="bi bi-hand-index-thumb"></i>
          <span>{{ detectorMessage }}</span>
        </template>
      </div>

      <div class="screen-inner" v-if="!isStreamAvailable">
        <i class="bi bi-camera-video"></i>
        <h4>Camera Preview</h4>
        <p>{{ hintText }}</p>
      </div>
    </div>

    <div class="camera-controls">
      <label class="control-item"><input type="checkbox" v-model="mirror" /> Mirror</label>
      <label class="control-item"><input type="checkbox" v-model="autoTranslate" /> Live detection</label>
      <div class="control-item">Interval: <strong>{{ captureIntervalMs }}ms</strong></div>
      <div class="control-item">Resolution: <strong>{{ resolution }}</strong></div>
    </div>
  </div>
</template>

<script setup>
import { GestureRecognizer, FilesetResolver } from '@mediapipe/tasks-vision'
import { onUnmounted, ref, watch } from 'vue'

const emit = defineEmits(['gestureDetected'])

const MODEL_URL = 'https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task'
const WASM_URL = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
const gestureDetails = {
  Closed_Fist: { icon: '✊', label: 'Closed fist', translation: 'Fist' },
  Open_Palm: { icon: '✋', label: 'Open palm', translation: 'Stop' },
  Pointing_Up: { icon: '☝️', label: 'Pointing up', translation: 'Pointing up' },
  Thumb_Down: { icon: '👎', label: 'Thumb down', translation: 'No' },
  Thumb_Up: { icon: '👍', label: 'Thumb up', translation: 'Good' },
  Victory: { icon: '✌️', label: 'Victory', translation: 'Victory' },
  ILoveYou: { icon: '🤟', label: 'I love you', translation: 'I love you' }
}

const videoEl = ref(null)
const stream = ref(null)
const isStreaming = ref(false)
const isStreamAvailable = ref(false)
const mirror = ref(true)
const resolution = ref('n/a')
const statusText = ref('Stopped')
const hintText = ref('Allow camera access and click Start')
const autoTranslate = ref(true)
const captureIntervalMs = ref(250)
const detectedGesture = ref(null)
const detectorMessage = ref('Preparing sign detector…')
let recognizer = null
let frameId = null
let lastVideoTime = -1
let lastGesture = ''
let lastEmittedAt = 0

async function setupRecognizer() {
  if (recognizer) return
  detectorMessage.value = 'Loading sign detector…'
  const vision = await FilesetResolver.forVisionTasks(WASM_URL)
  recognizer = await GestureRecognizer.createFromOptions(vision, {
    baseOptions: { modelAssetPath: MODEL_URL },
    runningMode: 'VIDEO',
    numHands: 1
  })
  detectorMessage.value = 'Show a supported hand sign to the camera'
}

async function startStream() {
  try {
    statusText.value = 'Loading AI'
    await setupRecognizer()
    const cameraStream = await navigator.mediaDevices.getUserMedia({
      video: { width: { ideal: 640 }, height: { ideal: 480 } },
      audio: false
    })

    stream.value = cameraStream
    videoEl.value.srcObject = cameraStream
    await videoEl.value.play()
    const settings = cameraStream.getVideoTracks()[0].getSettings()
    resolution.value = `${settings.width || 640}×${settings.height || 480}`
    isStreamAvailable.value = true
    isStreaming.value = true
    statusText.value = 'Live'
    startDetection()
  } catch (error) {
    console.error('Camera or sign detector could not start', error)
    hintText.value = 'Could not start the sign detector. Check internet and camera permission.'
    detectorMessage.value = 'Sign detector unavailable'
    statusText.value = 'Error'
    isStreamAvailable.value = false
    isStreaming.value = false
  }
}

function detectFrame(timestamp) {
  if (!isStreaming.value || !autoTranslate.value || !recognizer || !videoEl.value) return
  const video = videoEl.value
  if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA && video.currentTime !== lastVideoTime) {
    lastVideoTime = video.currentTime
    const result = recognizer.recognizeForVideo(video, timestamp)
    const category = result.gestures?.[0]?.[0]
    const info = category && gestureDetails[category.categoryName]

    if (info && category.score >= 0.55) {
      const confidence = `${Math.round(category.score * 100)}%`
      detectedGesture.value = { ...info, confidence }
      detectorMessage.value = ''
      const now = Date.now()
      if (category.categoryName !== lastGesture || now - lastEmittedAt > 2200) {
        lastGesture = category.categoryName
        lastEmittedAt = now
        emit('gestureDetected', {
          gesture: info.icon,
          translation: info.translation,
          confidence,
          source: 'mediapipe'
        })
      }
    } else {
      detectedGesture.value = null
      detectorMessage.value = 'Show your hand clearly in the camera'
    }
  }
  frameId = requestAnimationFrame(detectFrame)
}

function startDetection() {
  stopDetection()
  if (isStreaming.value && autoTranslate.value) frameId = requestAnimationFrame(detectFrame)
}

function stopDetection() {
  if (frameId) cancelAnimationFrame(frameId)
  frameId = null
}

function stopStream() {
  stopDetection()
  stream.value?.getTracks().forEach((track) => track.stop())
  stream.value = null
  if (videoEl.value) {
    videoEl.value.pause()
    videoEl.value.srcObject = null
  }
  isStreamAvailable.value = false
  isStreaming.value = false
  detectedGesture.value = null
  statusText.value = 'Stopped'
  resolution.value = 'n/a'
}

function toggleStream() {
  if (isStreaming.value) stopStream()
  else startStream()
}

watch(autoTranslate, (enabled) => {
  if (enabled) startDetection()
  else {
    stopDetection()
    detectedGesture.value = null
    detectorMessage.value = 'Live detection is paused'
  }
})

onUnmounted(() => {
  stopStream()
  recognizer?.close()
})
</script>

<style scoped>
.camera-card { background: linear-gradient(135deg, #fff 0%, #f8fbff 100%); border: 1px solid #e2e8f0; border-radius: 24px; padding: 20px; box-shadow: 0 16px 35px rgba(15, 23, 42, .08); min-height: 520px; }
.camera-header, .header-actions, .camera-controls { display: flex; align-items: center; }
.camera-header { justify-content: space-between; margin-bottom: 16px; }.header-actions { gap: 12px; }.camera-controls { gap: 18px; margin-top: 14px; flex-wrap: wrap; }
.eyebrow { margin: 0 0 4px; color: #2563eb; font-size: .75rem; text-transform: uppercase; letter-spacing: .18em; font-weight: 700; } h3 { margin: 0; color: #0f172a; }
.status-pill { display: inline-flex; align-items: center; gap: 6px; padding: 8px 12px; border-radius: 999px; background: #ecfdf3; color: #047857; font-size: .84rem; font-weight: 600; }.status-pill.recording { background: linear-gradient(90deg, #ffefef, #fff6f0); color: #dc2626; }
.btn-control { padding: 8px 12px; background: #2563eb; color: #fff; border: 0; border-radius: 10px; cursor: pointer; font-weight: 600; }
.camera-screen { position: relative; width: 100%; min-height: 430px; border-radius: 20px; overflow: hidden; background: linear-gradient(135deg, #eff6ff 0%, #f8fafc 100%); border: 2px dashed #93c5fd; display: flex; align-items: center; justify-content: center; }
.camera-video { width: 100%; height: 430px; object-fit: cover; }.camera-video.mirrored { transform: scaleX(-1); }
.live-detection { position: absolute; left: 18px; bottom: 18px; display: flex; align-items: center; gap: 10px; max-width: calc(100% - 36px); padding: 11px 15px; border-radius: 14px; color: #fff; background: rgba(15, 23, 42, .82); backdrop-filter: blur(8px); }.live-detection.empty { font-size: .9rem; }.live-detection small, .live-detection span { display: block; }.live-detection small { opacity: .72; font-size: .7rem; text-transform: uppercase; letter-spacing: .08em; }.live-detection strong { display: block; font-size: 1rem; }.live-detection div span { margin-top: 2px; font-size: .78rem; opacity: .8; }.gesture-icon { font-size: 1.8rem; }
.screen-inner { text-align: center; color: #2563eb; }.camera-screen > .screen-inner i { font-size: 64px; margin-bottom: 18px; }.screen-inner h4 { margin-bottom: 8px; color: #0f172a; }.screen-inner p { color: #64748b; margin: 0; }.control-item { color: #334155; font-weight: 600; }
</style>
