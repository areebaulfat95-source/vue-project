<template>
  <header class="navbar">
    <div class="left-section">
      <button class="menu-btn" type="button" aria-label="Open navigation menu" :aria-expanded="menuOpen" @click.stop="toggleMenu">
        <i class="bi bi-list"></i>
      </button>

      <nav v-if="menuOpen" class="quick-menu" @click.stop>
        <div class="quick-menu-heading"><span>Navigation</span><button type="button" aria-label="Close menu" @click="menuOpen = false"><i class="bi bi-x-lg"></i></button></div>
        <button v-for="page in pageOptions" :key="page.path" type="button" class="quick-menu-link" :class="{ selected: route.path === page.path }" @click="selectPage(page)">
          <i :class="page.icon"></i><span>{{ page.label }}</span><i class="bi bi-chevron-right"></i>
        </button>
      </nav>

      <div class="search-box" @click.stop>
        <button class="search-icon" type="button" @click="handleSearch">
          <i class="bi bi-search"></i>
        </button>
        <input
          type="text"
          placeholder="Search here..."
          v-model="searchTerm"
          @input="handleSearch"
          @focus="searchResultsOpen = true"
        />
        <div v-if="showSearchDropdown" class="search-dropdown" @click.stop>
          <div class="dropdown-section">
            <div class="search-section-title">Pages</div>
            <button
              v-for="page in pageResults"
              :key="page.path"
              type="button"
              class="search-result"
              @click="selectPage(page)"
            >
              <i :class="page.icon"></i>
              <span>{{ page.label }}</span>
            </button>
          </div>

          <div class="dropdown-section" v-if="historyResults.length">
            <div class="search-section-title">History matches</div>
            <button
              v-for="item in historyResults"
              :key="item.id"
              type="button"
              class="search-result"
              @click="selectHistory(item)"
            >
              <span class="history-gesture">{{ item.gesture }}</span>
              <span>{{ item.translation }}</span>
            </button>
          </div>

          <div class="search-empty" v-if="!pageResults.length && !historyResults.length">
            No results for "{{ searchTerm }}"
          </div>
        </div>
      </div>
    </div>

    <div class="right-section">
      <div class="notification" @click.stop="toggleNotification">
        <i class="bi bi-bell"></i>
        <span class="badge">{{ notificationCount }}</span>

        <div v-if="notificationOpen" class="dropdown-menu notifications-menu">
          <div class="dropdown-header">Notifications</div>
          <div v-for="item in notifications" :key="item.id" class="dropdown-item">
            <strong>{{ item.title }}</strong>
            <p>{{ item.message }}</p>
          </div>
        </div>
      </div>

      <div class="user" @click.stop="toggleProfile">
        <img :key="avatarKey" :src="avatarSrc" alt="Profile" @error="handleAvatarError" />
        <div>
          <h4>{{ displayName }}</h4>
          <p>{{ user.value?.email || 'Account menu' }}</p>
        </div>
        <i class="bi bi-chevron-down"></i>

        <div v-if="profileOpen" class="dropdown-menu profile-menu">
          <button type="button" class="dropdown-item" @click="goProfile">Profile</button>
          <button type="button" class="dropdown-item" @click="goSettings">Settings</button>
          <button type="button" class="dropdown-item logout-item" @click="handleLogout">Logout</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth.js'
import { useSearch } from '../composables/useSearch.js'
import { useHistory } from '../composables/useHistory.js'

const route = useRoute()
const router = useRouter()
const { searchQuery } = useSearch()
const { logout, user } = useAuth()
const { history } = useHistory()

const pageOptions = [
  { label: 'Dashboard', path: '/dashboard', icon: 'bi bi-grid' },
  { label: 'Translate', path: '/translate', icon: 'bi bi-camera-video' },
  { label: 'History', path: '/history', icon: 'bi bi-clock-history' },
  { label: 'Profile', path: '/profile', icon: 'bi bi-person' },
  { label: 'Settings', path: '/settings', icon: 'bi bi-gear-fill' },
  { label: 'About', path: '/about', icon: 'bi bi-info-circle' },
  { label: 'Contact', path: '/contact', icon: 'bi bi-envelope' }
]

const searchTerm = ref(searchQuery.value || '')
const searchResultsOpen = ref(false)
const notifications = ref([
  { id: 1, title: 'New gesture added', message: 'Custom gesture saved successfully.', read: false },
  { id: 2, title: 'Session warning', message: 'Camera feed is active.', read: false },
  { id: 3, title: 'Profile update', message: 'Your profile settings are up to date.', read: true }
])
const notificationOpen = ref(false)
const profileOpen = ref(false)
const menuOpen = ref(false)
const avatarFailed = ref(false)

const notificationCount = computed(() => notifications.value.filter((item) => !item.read).length)
const displayName = computed(() => user.value?.name || user.value?.email?.split('@')[0] || 'User')
const avatarSrc = computed(() => avatarFailed.value ? 'https://i.pravatar.cc/150?img=32' : (user.value?.photo || 'https://i.pravatar.cc/150?img=32'))
const avatarKey = computed(() => user.value?.photo || 'default-avatar')

const pageResults = computed(() => {
  const query = searchTerm.value.trim().toLowerCase()
  if (!query) return pageOptions
  return pageOptions.filter((item) => item.label.toLowerCase().includes(query))
})

const historyResults = computed(() => {
  const query = searchTerm.value.trim().toLowerCase()
  if (!query) return []
  return history.value.filter((item) => {
    const gesture = item.gesture.toLowerCase()
    const translation = item.translation.toLowerCase()
    const date = item.date.toLowerCase()
    return gesture.includes(query) || translation.includes(query) || date.includes(query)
  })
})

const handleSearch = () => {
  searchQuery.value = searchTerm.value.trim()
  searchResultsOpen.value = Boolean(searchTerm.value.trim())
}

const showSearchDropdown = computed(() => {
  const query = searchTerm.value.trim()
  return searchResultsOpen.value && (query.length > 0 || pageResults.value.length > 0)
})

watch(searchTerm, (value) => {
  searchQuery.value = value.trim()
  searchResultsOpen.value = true
})

watch(searchQuery, (value) => {
  if (value !== searchTerm.value) {
    searchTerm.value = value
  }
})

const toggleNotification = () => {
  notificationOpen.value = !notificationOpen.value
  if (notificationOpen.value) notifications.value.forEach((item) => { item.read = true })
  profileOpen.value = false
  searchResultsOpen.value = false
}

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
  notificationOpen.value = false
  profileOpen.value = false
  searchResultsOpen.value = false
}

const toggleProfile = () => {
  profileOpen.value = !profileOpen.value
  notificationOpen.value = false
  searchResultsOpen.value = false
}

const closeMenus = () => {
  notificationOpen.value = false
  profileOpen.value = false
  menuOpen.value = false
  searchResultsOpen.value = false
}

const goProfile = () => {
  profileOpen.value = false
  router.push({ name: 'Profile' })
}

const goSettings = () => {
  profileOpen.value = false
  router.push({ name: 'Settings' })
}

const selectPage = (page) => {
  searchResultsOpen.value = false
  menuOpen.value = false
  // Navigation ke liye shared searchQuery update mat karo
  // warna History/HistorySearch ka filter unwanted set ho jata hai
  router.push(page.path)
}

const handleAvatarError = () => {
  avatarFailed.value = true
}

watch(() => user.value?.photo, () => {
  avatarFailed.value = false
})

const selectHistory = (item) => {
  searchResultsOpen.value = false
  searchQuery.value = item.translation
  if (route.name !== 'History') {
    router.push({ name: 'History' })
  }
}

const handleLogout = () => {
  profileOpen.value = false
  logout()
  router.push({ name: 'Login' })
}

onMounted(() => {
  document.addEventListener('click', closeMenus)
})

onUnmounted(() => {
  document.removeEventListener('click', closeMenus)
})
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 0 24px;
}

.left-section,
.right-section {
  display: flex;
  align-items: center;
  gap: 14px;
}

.left-section { position: relative; }

.menu-btn {
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 14px;
  background: linear-gradient(135deg, #eff6ff, #dbeafe);
  color: #2563eb;
  cursor: pointer;
  font-size: 20px;
}

.menu-btn:hover { background: #dbeafe; transform: translateY(-1px); }

.quick-menu { position: absolute; top: 54px; left: 0; z-index: 80; width: 290px; padding: 10px; border: 1px solid #dbeafe; border-radius: 18px; background: rgba(255,255,255,.98); box-shadow: 0 24px 54px rgba(15,23,42,.16); backdrop-filter: blur(12px); }
.quick-menu-heading { display: flex; align-items: center; justify-content: space-between; padding: 8px 8px 11px; color: #64748b; font-size: .75rem; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; }.quick-menu-heading button { width: 28px; height: 28px; border: 0; border-radius: 9px; background: #f1f5f9; color: #475569; cursor: pointer; }.quick-menu-link { width: 100%; display: grid; grid-template-columns: 36px 1fr 18px; align-items: center; gap: 8px; padding: 10px; border: 0; border-radius: 12px; background: transparent; color: #334155; text-align: left; cursor: pointer; font-size: .92rem; }.quick-menu-link > i:first-child { display: grid; place-items: center; width: 32px; height: 32px; border-radius: 10px; color: #2563eb; background: #eff6ff; }.quick-menu-link > i:last-child { font-size: .75rem; color: #94a3b8; }.quick-menu-link:hover, .quick-menu-link.selected { color: #1d4ed8; background: #eff6ff; }.quick-menu-link.selected > i:first-child { color: #fff; background: #2563eb; }

.search-box {
  position: relative;
  display: flex;
  align-items: center;
  background: #f8fafc;
  padding: 10px 12px;
  border-radius: 14px;
  min-width: 320px;
  border: 1px solid #e2e8f0;
}

.search-box button.search-icon {
  border: none;
  background: transparent;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  cursor: pointer;
}

.search-box i {
  font-size: 18px;
}

.search-box input {
  border: none;
  outline: none;
  background: transparent;
  width: 100%;
  font-size: 14px;
  margin-left: 8px;
}

.notification {
  position: relative;
  width: auto;
  min-width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  background: #f8fafc;
  color: #475569;
  cursor: pointer;
}

.badge {
  position: absolute;
  top: -4px;
  right: -4px;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  background: #ef4444;
  color: white;
  border-radius: 999px;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
}

.user {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 10px;
  border-radius: 16px;
  background: #f8fafc;
  position: relative;
  cursor: pointer;
}

.user img {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  object-fit: cover;
}

.user h4 {
  margin: 0;
  font-size: 14px;
  color: #0f172a;
}

.user p {
  margin: 2px 0 0;
  font-size: 12px;
  color: #64748b;
}

.user i {
  color: #64748b;
}

.dropdown-menu {
  position: absolute;
  right: 0;
  top: calc(100% + 10px);
  min-width: 220px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  box-shadow: 0 20px 45px rgba(15, 23, 42, 0.12);
  z-index: 50;
  overflow: hidden;
}

.dropdown-header {
  padding: 12px 14px;
  background: #f8fafc;
  font-weight: 700;
  color: #334155;
  font-size: 13px;
}

.dropdown-item {
  width: 100%;
  text-align: left;
  padding: 12px 14px;
  border: none;
  background: transparent;
  color: #334155;
  font-size: 14px;
  cursor: pointer;
  display: block;
}

.dropdown-item:hover {
  background: #eff6ff;
}

.notifications-menu {
  width: 320px;
}

.notifications-menu .dropdown-item {
  padding-top: 10px;
  padding-bottom: 10px;
}

.notifications-menu .dropdown-item p {
  margin: 6px 0 0;
  color: #64748b;
  font-size: 12px;
}

.search-dropdown {
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
  right: 0;
  max-height: 360px;
  overflow-y: auto;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 18px;
  box-shadow: 0 24px 45px rgba(15, 23, 42, 0.12);
  z-index: 40;
}

.dropdown-section {
  padding: 14px 0;
  border-bottom: 1px solid #f1f5f9;
}

.search-section-title {
  padding: 0 16px 10px;
  font-weight: 700;
  color: #334155;
  font-size: 13px;
}

.search-result {
  width: 100%;
  border: none;
  background: transparent;
  padding: 12px 16px;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 12px;
  color: #0f172a;
  font-size: 14px;
  cursor: pointer;
}

.search-result:hover {
  background: #eff6ff;
}

.history-gesture {
  font-size: 16px;
  margin-right: 10px;
}

.search-empty {
  padding: 14px 16px;
  color: #64748b;
}

.logout-item {
  color: #dc2626;
}

@media (max-width: 768px) {
  .navbar {
    padding: 0 14px;
    flex-wrap: wrap;
    height: auto;
    padding-top: 12px;
    padding-bottom: 12px;
  }

  .left-section,
  .right-section {
    width: 100%;
    justify-content: space-between;
  }

  .search-box {
    min-width: 0;
    flex: 1;
  }
}
</style>
