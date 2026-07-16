import { reactive, watch } from 'vue'
import { updateSettings as updateSettingsRequest } from '../services/api.js'
import { useAuth } from './useAuth.js'

const settingsKey = 'sign-language-settings'

const defaultSettings = {
  theme: 'Light',
  language: 'English',
  resolution: '720p',
  notifications: true,
  voice: true,
  autoSaveHistory: true,
  confidence: 90
}

const settings = reactive({ ...defaultSettings })

const loadSettings = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(settingsKey) || '{}')
    Object.assign(settings, { ...defaultSettings, ...saved })
  } catch (error) {
    console.warn('Failed to load settings:', error)
    Object.assign(settings, defaultSettings)
  }
}

// Local persistence only — runs on every change (deep watch below) so
// settings survive a page refresh instantly, without hitting the network
// on every slider drag/keystroke.
const persistLocally = () => {
  localStorage.setItem(settingsKey, JSON.stringify(settings))
}

const applyTheme = () => {
  document.body.classList.toggle('theme-dark', settings.theme === 'Dark')
  document.body.classList.toggle('theme-light', settings.theme === 'Light')
}

loadSettings()
applyTheme()
watch(settings, () => {
  persistLocally()
  applyTheme()
}, { deep: true })

// Explicit sync to the backend — called from the "Save Settings" button in
// src/components/SettingsPanel.vue (PUT /api/users/settings via
// src/services/api.js). Falls back to local-only persistence when the
// person isn't logged in yet (there's no anonymous settings endpoint).
const saveSettings = async () => {
  persistLocally()

  const { isAuthenticated } = useAuth()
  if (isAuthenticated.value) {
    await updateSettingsRequest({ ...settings })
  }
}

export function useSettings() {
  return {
    settings,
    saveSettings,
    applyTheme
  }
}
