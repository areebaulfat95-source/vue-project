import { ref, computed, watch } from 'vue'

const STORAGE_KEY = 'appNotifications'

const defaultNotifications = [
  {
    id: 1,
    title: 'Welcome to SLTS',
    message: 'Your dashboard is ready. Start translating with the camera.',
    read: false,
    date: new Date().toLocaleString()
  }
]

const notifications = ref(loadNotifications())

function loadNotifications() {
  if (typeof window === 'undefined') return [...defaultNotifications]

  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')
    if (Array.isArray(stored) && stored.length) {
      return stored
    }
  } catch {
    // ignore
  }

  return [...defaultNotifications]
}

function saveNotifications(value) {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
}

const unreadCount = computed(() => notifications.value.filter((item) => !item.read).length)

const addNotification = (title, message) => {
  const item = {
    id: Date.now(),
    title,
    message,
    read: false,
    date: new Date().toLocaleString()
  }
  notifications.value.unshift(item)
  saveNotifications(notifications.value)
}

const markAllRead = () => {
  notifications.value = notifications.value.map((item) => ({ ...item, read: true }))
  saveNotifications(notifications.value)
}

const markRead = (id) => {
  notifications.value = notifications.value.map((item) => item.id === id ? { ...item, read: true } : item)
  saveNotifications(notifications.value)
}

export function useNotifications() {
  return {
    notifications,
    unreadCount,
    addNotification,
    markAllRead,
    markRead
  }
}
