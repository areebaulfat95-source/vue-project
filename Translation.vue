<template>
  <div class="translation-card">
    <div class="translation-header">
      <div>
        <p class="eyebrow">AI Output</p>
        <h2>Translation Result</h2>
      </div>
      <span class="status-badge">Ready</span>
    </div>

    <div class="gesture">{{ gesture }}</div>

    <div class="result">
      <h3>{{ translation }}</h3>
      <p>Detected Gesture</p>
    </div>

    <div class="details">
      <div class="row">
        <span>Confidence</span>
        <strong>{{ confidence }}</strong>
      </div>

      <div class="row">
        <span>Language</span>
        <strong>{{ language }}</strong>
      </div>

      <div class="row">
        <span>Status</span>
        <strong :class="{ online: status === 'AI Ready' }">{{ status }}</strong>
      </div>
    </div>

    <button class="speak" type="button" @click="$emit('speak')" :disabled="!voiceEnabled">
      <i class="bi bi-volume-up-fill"></i>
      Speak Result
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  gesture: {
    type: String,
    default: '👍'
  },
  translation: {
    type: String,
    default: 'Hello'
  },
  confidence: {
    type: String,
    default: '98%'
  },
  language: {
    type: String,
    default: 'English'
  },
  status: {
    type: String,
    default: 'AI Ready'
  },
  voiceEnabled: {
    type: Boolean,
    default: true
  }
})

defineEmits(['speak'])
</script>

<style scoped>
.translation-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8fbff 100%);
  border: 1px solid #e2e8f0;
  border-radius: 24px;
  padding: 22px;
  box-shadow: 0 16px 35px rgba(15, 23, 42, 0.08);
}

.translation-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.eyebrow {
  margin: 0 0 4px;
  color: #2563eb;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-weight: 700;
}

h2 {
  margin: 0;
  color: #0f172a;
  font-size: 1.2rem;
}

.status-badge {
  padding: 7px 11px;
  background: #eff6ff;
  color: #2563eb;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 700;
}

.gesture {
  font-size: 82px;
  text-align: center;
  margin: 20px 0 14px;
}

.result {
  text-align: center;
}

.result h3 {
  margin: 0;
  color: #0f172a;
}

.result p {
  margin-top: 6px;
  color: #64748b;
}

.details {
  margin-top: 20px;
}

.row {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #e5e7eb;
  color: #334155;
}

.online {
  color: #22c55e;
}

.speak {
  margin-top: 20px;
  width: 100%;
  padding: 13px;
  border: none;
  background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
  color: white;
  border-radius: 12px;
  font-size: 15px;
  cursor: pointer;
  transition: 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.speak:hover {
  background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%);
}
</style>