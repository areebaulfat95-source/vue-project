<template>
  <aside class="sidebar-panel">
    <div class="sidebar-header">
      <img src="../assets/SLTS p1.webp" alt="Logo" class="sidebar-logo" />
      <div class="sidebar-brand">
        <h1>SLTS</h1>
        <p>Sign Language Translation</p>
      </div>
    </div>

    <nav class="sidebar-menu">
      <router-link
        to="/dashboard"
        class="sidebar-link"
        :class="{ active: route.path === '/dashboard' }"
      >
        <i class="bi bi-grid"></i>
        <span>Dashboard</span>
      </router-link>

      <router-link
        to="/translate"
        class="sidebar-link"
        :class="{ active: route.path === '/translate' }"
      >
        <i class="bi bi-camera-video"></i>
        <span>Translate</span>
      </router-link>

      <router-link
        to="/history"
        class="sidebar-link"
        :class="{ active: route.path === '/history' }"
      >
        <i class="bi bi-clock-history"></i>
        <span>History</span>
      </router-link>

      <router-link
        to="/profile"
        class="sidebar-link"
        :class="{ active: route.path === '/profile' }"
      >
        <i class="bi bi-person"></i>
        <span>Profile</span>
      </router-link>

      <router-link
        to="/about"
        class="sidebar-link"
        :class="{ active: route.path === '/about' }"
      >
        <i class="bi bi-info-circle"></i>
        <span>About</span>
      </router-link>

      <router-link
        to="/contact"
        class="sidebar-link"
        :class="{ active: route.path === '/contact' }"
      >
        <i class="bi bi-envelope"></i>
        <span>Contact</span>
      </router-link>

      <router-link
        to="/settings"
        class="sidebar-link"
        :class="{ active: route.path === '/settings' || route.path === '/setting' }"
      >
        <i class="bi bi-gear-fill"></i>
        <span>Settings</span>
      </router-link>
    </nav>

    <button class="sidebar-logout" type="button" @click="handleLogout">
      <i class="bi bi-box-arrow-right"></i>
      <span>Logout</span>
    </button>
  </aside>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { useAuth } from '../composables/useAuth.js'

const router = useRouter()
const route = useRoute()
const { logout } = useAuth()

const handleLogout = () => {
  logout()
  router.push({ name: 'Login' })
}
</script>

<style scoped>
.sidebar-panel {
  width: 220px;
  min-height: 100vh;
  background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
  border-right: 1px solid rgba(226, 232, 240, 1);
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  box-shadow: 0 24px 72px rgba(15, 23, 42, 0.06);
}

.sidebar-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  border-radius: 22px;
  background: linear-gradient(135deg, #eff6ff, #dbeafe);
  color: #1f2937;
}

.sidebar-logo {
  width: 46px;
  height: 46px;
  border-radius: 16px;
  object-fit: cover;
  background: linear-gradient(135deg, #2563eb, #60a5fa);
}

.sidebar-brand h1 {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.sidebar-brand p {
  margin: 4px 0 0;
  font-size: 11px;
  line-height: 1.2;
  color: #475569;
}

.sidebar-menu {
  display: grid;
  gap: 8px;
  margin-top: 24px;
}

.sidebar-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 18px;
  text-decoration: none;
  color: #334155;
  background: #f8fafc;
  transition: background 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease, color 0.2s ease;
}

.sidebar-link i {
  width: 36px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: #e0f2fe;
  color: #2563eb;
  font-size: 18px;
}

.sidebar-link span {
  flex: 1;
  font-size: 14px;
}

.sidebar-link:hover {
  background: #eff6ff;
  color: #1d4ed8;
  transform: translateX(2px);
  box-shadow: 0 8px 22px rgba(37, 99, 235, 0.08);
}

.sidebar-link.active {
  background: linear-gradient(135deg, #2563eb, #3b82f6);
  color: #ffffff;
  box-shadow: 0 10px 25px rgba(37, 99, 235, 0.18);
}

.sidebar-link.active i {
  background: rgba(255, 255, 255, 0.16);
  color: #ffffff;
}

.sidebar-logout {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 18px;
  border: 1px solid rgba(96, 165, 250, 0.25);
  background: #ffffff;
  color: #1e293b;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
  margin-top: 24px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.04);
}

.sidebar-logout:hover {
  background: #eff6ff;
  transform: translateX(2px);
}

@media (max-width: 1100px) {
  .sidebar-panel {
    width: 100%;
    min-height: auto;
    border-right: none;
    border-bottom: 1px solid rgba(226, 232, 240, 1);
    box-shadow: none;
  }
}
</style>
