<template>
  <div class="translate-page">
    <header class="translate-hero">
      <div>
        <p class="kicker"><i class="bi bi-stars"></i> AI-powered recognition</p>
        <h1>Live sign translator</h1>
        <p class="subtitle">Start your camera, hold a hand sign steady, and see the translation instantly.</p>
      </div>
      <div class="hero-tip"><i class="bi bi-lightbulb"></i><span><strong>Best results</strong> Keep one hand visible in good light.</span></div>
    </header>

    <div class="supported-signs">
      <span>Supported signs</span><strong>👍</strong><strong>👎</strong><strong>✋</strong><strong>✊</strong><strong>☝️</strong><strong>✌️</strong><strong>🤟</strong>
      <small>More custom signs require a trained model.</small>
    </div>

    <div class="translate-grid">
      <CameraFeed @gestureDetected="handleGestureDetected" />

      <div class="translate-panel">
        <Translation
          :gesture="translation.gesture"
          :translation="translation.translation"
          :confidence="translation.confidence"
          :language="translation.language"
          :status="translation.status"
          :voiceEnabled="settings.voice"
          @speak="handleSpeak"
        />

        <div class="custom-gesture-form">
          <div class="form-title"><div><p class="form-kicker">Personal dictionary</p><h3>Add a custom label</h3></div><i class="bi bi-bookmark-plus"></i></div>
          <p class="form-description">Save a label for your own reference. It does not train the camera model.</p>
          <label>
            Choose Symbol
            <select v-model="selectedSymbol">
              <option v-for="option in symbolOptions" :key="option" :value="option">
                {{ option }}
              </option>
            </select>
          </label>

          <label>
            Or enter a custom symbol
            <input
              type="text"
              v-model="customSymbol"
              placeholder="Type your own symbol"
            />
          </label>

          <label>
            Translation Text
            <input
              type="text"
              v-model="customTranslation"
              placeholder="Enter the text meaning"
            />
          </label>
          <button type="button" class="btn-add" @click="addCustomGesture">
            Add Gesture
          </button>
        </div>

        <TranslateButton @translate="performTranslation" />
      </div>
    </div>

    <router-link class="history-link" to="/history"><i class="bi bi-clock-history"></i> View saved translations in History <i class="bi bi-arrow-right"></i></router-link>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import CameraFeed from '../components/CameraFeed.vue'
import Translation from '../components/Translation.vue'
import TranslateButton from '../components/TranslateButton.vue'
import { useHistory } from '../composables/useHistory.js'
import { useSettings } from '../composables/useSettings.js'

const searchQuery = ref('')

const translation = reactive({
  gesture: '👍',
  translation: 'Hello',
  confidence: '98%',
  language: 'English',
  status: 'AI Ready'
})

const { history, addHistoryItem } = useHistory()
const { settings } = useSettings()

const filteredHistory = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) return history.value

  return history.value.filter((item) => {
    return (
      item.gesture.toLowerCase().includes(query) ||
      item.translation.toLowerCase().includes(query)
    )
  })
})

const customSymbol = ref('')
const customTranslation = ref('')
const selectedSymbol = ref('👍')
const symbolOptions = ['👍', '✋', '👋', '👌', '🙏', '🔥', '😀']

const addCustomGesture = () => {
  const gesture = customSymbol.value.trim() || selectedSymbol.value
  const translationText = customTranslation.value.trim()

  if (!gesture || !translationText) {
    alert('Please select or enter a symbol and add its translation.')
    return
  }

  Object.assign(translation, {
    gesture,
    translation: translationText,
    confidence: '99%',
    language: 'English',
    status: 'Custom Gesture'
  })

  addHistoryItem({
    id: Date.now(),
    gesture,
    translation: translationText,
    confidence: '99%',
    date: 'Just now'
  })

  customSymbol.value = ''
  customTranslation.value = ''
}

const performTranslation = () => {
  const gesture = customSymbol.value.trim() || selectedSymbol.value || '👌'
  const translationText = customTranslation.value.trim() || 'Okay'

  Object.assign(translation, {
    gesture,
    translation: translationText,
    confidence: '99%',
    language: 'English',
    status: 'AI Ready'
  })
}

const handleSearch = (value) => {
  searchQuery.value = value
}

const handleSpeak = () => {
  if (!('speechSynthesis' in window)) {
    alert('Voice output is not supported in this browser.')
    return
  }
  window.speechSynthesis.cancel()
  window.speechSynthesis.speak(new SpeechSynthesisUtterance(translation.translation))
}

const handleViewHistory = (item) => {
  alert(`View history item: ${item.gesture} → ${item.translation}`)
}

let lastLiveHistoryKey = ''
let lastLiveHistoryAt = 0

// Receive real-time gesture events from CameraFeed
const handleGestureDetected = (payload) => {
  Object.assign(translation, {
    gesture: payload.gesture || translation.gesture,
    translation: payload.translation || translation.translation,
    confidence: payload.confidence || translation.confidence,
    language: 'English',
    status: payload.source === 'mediapipe' ? 'Live sign detected' : 'AI Ready'
  })
  const historyKey = `${translation.gesture}:${translation.translation}`
  const now = Date.now()
  if (historyKey !== lastLiveHistoryKey || now - lastLiveHistoryAt > 5000) {
    addHistoryItem({ id: now, gesture: translation.gesture, translation: translation.translation, confidence: translation.confidence, date: 'Just now' })
    lastLiveHistoryKey = historyKey
    lastLiveHistoryAt = now
  }
}
</script>

<style scoped>

.translate-page { max-width: 1440px; margin: 0 auto; padding: 16px 8px 32px; }
.translate-hero { display: flex; justify-content: space-between; gap: 24px; align-items: end; margin: 0 0 20px; }.kicker, .form-kicker { margin: 0 0 9px; text-transform: uppercase; letter-spacing: .13em; font-size: .74rem; font-weight: 800; color: #2563eb; }.translate-hero h1 { margin: 0; font-size: clamp(2rem, 4vw, 3rem); letter-spacing: -.04em; }.subtitle { max-width: 650px; margin: 10px 0 0; color: #64748b; font-size: 1rem; line-height: 1.65; }.hero-tip { display: flex; gap: 10px; max-width: 295px; padding: 14px 16px; border: 1px solid #bfdbfe; background: #eff6ff; border-radius: 16px; color: #1e3a8a; font-size: .85rem; }.hero-tip i { color: #2563eb; font-size: 1.1rem; }.hero-tip strong { display: block; margin-bottom: 2px; }.supported-signs { display: flex; align-items: center; gap: 9px; flex-wrap: wrap; padding: 12px 16px; margin-bottom: 24px; color: #475569; background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; box-shadow: 0 6px 18px rgba(15,23,42,.04); }.supported-signs > span { font-size: .82rem; font-weight: 700; color: #64748b; }.supported-signs strong { display: grid; place-items: center; width: 29px; height: 29px; border-radius: 9px; background: #f1f5f9; }.supported-signs small { margin-left: auto; color: #94a3b8; }

.translate-grid{

display:grid;

grid-template-columns:2fr 1fr;

gap:25px;

margin-bottom:30px;

}

.history-link { display:flex; align-items:center; justify-content:center; gap:10px; margin-top:22px; padding:14px; border:1px dashed #93c5fd; border-radius:16px; color:#1d4ed8; background:#eff6ff; font-weight:700; text-decoration:none; }.history-link:hover { background:#dbeafe; }

.custom-gesture-form {
  margin-top: 20px; padding: 24px; background: #fff; border: 1px solid #e2e8f0; border-radius: 20px;
}
.form-title { display: flex; justify-content: space-between; align-items: flex-start; }.form-title h3 { margin: 0; font-size: 1.18rem; }.form-title > i { display: grid; place-items: center; width: 38px; height: 38px; border-radius: 12px; background: #eff6ff; color: #2563eb; }.form-description { margin: 8px 0 18px; color: #64748b; font-size: .86rem; line-height: 1.5; }

.custom-gesture-form label {
  display: block;
  margin-bottom: 14px;
  font-weight: 600;
  color: #334155;
}

.custom-gesture-form input,
.custom-gesture-form select {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  margin-top: 8px;
  outline: none;
}

.custom-gesture-form select {
  appearance: none;
  background: white;
}

.custom-gesture-form .btn-add {
  width: 100%;
  padding: 14px 16px;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 700;
}

.custom-gesture-form .btn-add:hover {
  background: #1d4ed8;
}

@media(max-width:992px){

.translate-grid{

grid-template-columns:1fr;

}

@media (max-width: 680px) { .translate-page { padding: 4px 0 20px; }.translate-hero { align-items: flex-start; flex-direction: column; }.hero-tip { max-width: none; }.supported-signs small { width: 100%; margin-left: 0; }.translate-grid { gap: 16px; } }

}

</style>
