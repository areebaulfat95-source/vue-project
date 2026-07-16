// Axios-based API client for the Express + MongoDB backend.
// Every exported function keeps the exact same name/signature the rest of
// the app already relies on (composables/useAuth.js, useHistory.js, etc.),
// so nothing else had to change — only how the request is made under the hood.

import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const TOKEN_KEY = 'authToken'

const getToken = () => localStorage.getItem(TOKEN_KEY)
const setToken = (token) => localStorage.setItem(TOKEN_KEY, token)
const clearToken = () => localStorage.removeItem(TOKEN_KEY)

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' }
})

// Attach the JWT (if we have one) to every outgoing request. Routes that
// don't need it (login/register) simply ignore the header on the server.
apiClient.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Normalize errors so callers can keep doing `error.message` exactly like
// before, regardless of whether it's a network error or a backend { message }.
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const backendMessage = error.response?.data?.message
    const message = backendMessage || error.message || 'Something went wrong. Please try again.'
    return Promise.reject(new Error(message))
  }
)

export const loginUser = async (email, password) => {
  const { data } = await apiClient.post('/auth/login', { email, password })
  setToken(data.token)
  return data.user
}

export const registerUser = async (name, email, password) => {
  const { data } = await apiClient.post('/auth/register', { name, email, password })
  setToken(data.token)
  return data.user
}

export const logoutUser = () => {
  clearToken()
}

export const updateProfile = async (changes) => {
  const { data } = await apiClient.put('/users/profile', changes)
  return data.user
}

export const updateSettings = async (settings) => {
  const { data } = await apiClient.put('/users/settings', settings)
  return data.settings
}

// `email` is kept as a parameter for compatibility with existing composables,
// but the backend identifies the user from the auth token, not the email.
export const getHistory = async (_email) => {
  const { data } = await apiClient.get('/history')
  return data
}

export const saveHistoryItem = async (_email, item) => {
  const { data } = await apiClient.post('/history', item)
  return data
}

export const deleteHistoryItem = async (id) => {
  const { data } = await apiClient.delete(`/history/${id}`)
  return data
}
