import { ref } from 'vue'
import { loginUser, registerUser, logoutUser, updateProfile as updateProfileRequest } from '../services/api.js'

const AUTH_KEY = 'isAuthenticated'
const USER_NAME_KEY = 'userName'
const USER_EMAIL_KEY = 'userEmail'
const USER_PROFILE_KEY = 'userProfile'

const readStoredProfile = () => {
  try {
    return JSON.parse(localStorage.getItem(USER_PROFILE_KEY) || '{}')
  } catch {
    return {}
  }
}

const saveProfile = (profile) => {
  localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile))
  localStorage.setItem(USER_NAME_KEY, profile.name || '')
  localStorage.setItem(USER_EMAIL_KEY, profile.email || '')
}

const isAuthenticated = ref(localStorage.getItem(AUTH_KEY) === 'true')
const user = ref({
  name: localStorage.getItem(USER_NAME_KEY) || '',
  email: localStorage.getItem(USER_EMAIL_KEY) || '',
  ...readStoredProfile()
})

// Shared by login() and register(): applies the user object returned by the
// backend (id, name, email, phone, university, department, semester, roll,
// photo) on top of whatever was cached locally, so the server's data wins.
const applyAuthenticatedUser = (result) => {
  localStorage.setItem(AUTH_KEY, 'true')
  localStorage.setItem(USER_EMAIL_KEY, result.email)
  localStorage.setItem(USER_NAME_KEY, result.name || '')
  isAuthenticated.value = true
  user.value = { ...readStoredProfile(), ...result }
  saveProfile(user.value)
}

const login = async (emailValue, passwordValue) => {
  const result = await loginUser(emailValue, passwordValue)
  applyAuthenticatedUser(result)
  return result
}

const register = async (nameValue, emailValue, passwordValue) => {
  const result = await registerUser(nameValue, emailValue, passwordValue)
  applyAuthenticatedUser(result)
  return result
}

// Persists profile changes to the backend (PUT /api/users/profile via
// src/services/api.js) and refreshes local state/cache from the server's
// response, so edits actually survive across devices/browsers.
const updateProfile = async (changes) => {
  const updatedUser = await updateProfileRequest(changes)
  user.value = { ...user.value, ...updatedUser }
  saveProfile(user.value)
  return user.value
}

const logout = () => {
  logoutUser() // clears the JWT stored under 'authToken' (src/services/api.js)
  localStorage.removeItem(AUTH_KEY)
  localStorage.removeItem(USER_NAME_KEY)
  localStorage.removeItem(USER_EMAIL_KEY)
  localStorage.removeItem(USER_PROFILE_KEY)
  isAuthenticated.value = false
  user.value = { name: '', email: '' }
}

export function useAuth() {
  return {
    isAuthenticated,
    user,
    login,
    register,
    updateProfile,
    logout
  }
}
