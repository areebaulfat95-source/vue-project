<template>
  <div class="settings-card">

    <h2>Application Settings</h2>

    <!-- Theme -->
    <div class="setting-item">
      <label>Theme</label>

      <select v-model="settings.theme" class="form-select">
        <option>Light</option>
        <option>Dark</option>
      </select>
    </div>

    <!-- Language -->
    <div class="setting-item">
      <label>Language</label>

      <select v-model="settings.language" class="form-select">
        <option>English</option>
        <option>Urdu</option>
      </select>
    </div>

    <!-- Camera Resolution -->
    <div class="setting-item">
      <label>Camera Resolution</label>

      <select v-model="settings.resolution" class="form-select">
        <option>480p</option>
        <option>720p</option>
        <option>1080p</option>
      </select>
    </div>

    <!-- Notifications -->
    <div class="setting-item switch-row">
      <label>Notifications</label>

      <div class="form-check form-switch">
        <input
          class="form-check-input"
          type="checkbox"
          v-model="settings.notifications"
        />
      </div>
    </div>

    <!-- Voice -->
    <div class="setting-item switch-row">
      <label>Voice Output</label>

      <div class="form-check form-switch">
        <input
          class="form-check-input"
          type="checkbox"
          v-model="settings.voice"
        />
      </div>
    </div>

    <!-- Auto Save -->
    <div class="setting-item switch-row">
      <label>Auto Save History</label>

      <div class="form-check form-switch">
        <input
          class="form-check-input"
          type="checkbox"
          v-model="settings.autoSaveHistory"
        />
      </div>
    </div>

    <!-- Confidence -->
    <div class="setting-item">
      <label>
        AI Confidence Threshold
        <strong>{{ settings.confidence }}%</strong>
      </label>

      <input
        type="range"
        min="50"
        max="100"
        v-model="settings.confidence"
        class="form-range"
      />
    </div>

    <button
      class="btn btn-primary w-100 mt-4"
      @click="onSaveSettings"
    >
      <i class="bi bi-check-circle"></i>
      Save Settings
    </button>

  </div>
</template>

<script setup>
import { useSettings } from '../composables/useSettings.js'

const { settings, saveSettings } = useSettings()

const onSaveSettings = async () => {
  try {
    await saveSettings()
    alert('Settings saved and applied successfully!')
  } catch (error) {
    alert(error.message || 'Failed to save settings. Please try again.')
  }
}
</script>

<style scoped>

.settings-card{

background:white;
padding:35px;
border-radius:20px;
box-shadow:0 10px 30px rgba(0,0,0,.08);

}

.setting-item{

margin-bottom:25px;

}

.setting-item label{

font-weight:600;
margin-bottom:10px;
display:block;

}

.switch-row{

display:flex;
justify-content:space-between;
align-items:center;

}

h2{

margin-bottom:30px;

}

</style>