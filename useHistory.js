import { ref, watch } from 'vue'
import { useSettings } from './useSettings.js'
import { useAuth } from './useAuth.js'
import { getHistory, saveHistoryItem, deleteHistoryItem } from '../services/api.js'

const { settings } = useSettings()
const { user, isAuthenticated } = useAuth()
const historyKey = 'sign-language-history'

const defaultHistory = [
  {
    id: 1,
    gesture: '👍',
    translation: 'Hello',
    confidence: '98%',
    date: 'Today'
  },
  {
    id: 2,
    gesture: '✋',
    translation: 'Stop',
    confidence: '96%',
    date: 'Today'
  },
  {
    id: 3,
    gesture: '👋',
    translation: 'Bye',
    confidence: '95%',
    date: 'Yesterday'
  },
  {
    id: 4,
    gesture: '👌',
    translation: 'Okay',
    confidence: '99%',
    date: 'Yesterday'
  }
]

const history = ref([...defaultHistory])

const loadHistory = async () => {
  try {
    if (isAuthenticated.value && user.value.email) {
      const backendHistory = await getHistory(user.value.email)
      if (Array.isArray(backendHistory)) {
        history.value = backendHistory
        return
      }
    }

    const saved = JSON.parse(localStorage.getItem(historyKey) || 'null')
    if (Array.isArray(saved) && saved.length) {
      history.value = saved
    }
  } catch (error) {
    console.warn('Failed to load history:', error)
    const saved = JSON.parse(localStorage.getItem(historyKey) || 'null')
    if (Array.isArray(saved) && saved.length) {
      history.value = saved
    }
  }
}

const saveHistory = () => {
  if (!settings.autoSaveHistory) return
  localStorage.setItem(historyKey, JSON.stringify(history.value))
}

watch([
  () => user.value.email,
  () => isAuthenticated.value
], loadHistory, { immediate: true })
watch(history, saveHistory, { deep: true })

const addHistoryItem = async (item) => {
  history.value.unshift(item)

  if (isAuthenticated.value && user.value.email) {
    try {
      await saveHistoryItem(user.value.email, item)
    } catch (error) {
      console.warn('Failed to save history to backend:', error)
    }
  }
}

// Removes an item locally (optimistic) and, when logged in, deletes it on
// the backend too (DELETE /api/history/:id via src/services/api.js).
const removeHistoryItem = async (id) => {
  history.value = history.value.filter((item) => item.id !== id)

  if (isAuthenticated.value && user.value.email) {
    try {
      await deleteHistoryItem(id)
    } catch (error) {
      console.warn('Failed to delete history item from backend:', error)
    }
  }
}

export function useHistory() {
  return {
    history,
    addHistoryItem,
    removeHistoryItem
  }
}
