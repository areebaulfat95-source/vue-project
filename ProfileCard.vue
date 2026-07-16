<template>
  <section class="profile-card">
    <div class="avatar-wrap">
      <img class="avatar-image" :src="avatar" :alt="`${user.name || 'User'} profile`" width="82" height="82" />
      <span class="online-dot" title="Active"></span>
    </div>
    <div class="profile-card-content">
      <p class="eyebrow">Account</p>
      <h3>{{ user.name || 'Your profile' }}</h3>
      <p>{{ user.email || 'Add your account details' }}</p>
    </div>
    <router-link to="/translate" class="translate-link">
      <i class="bi bi-camera-video"></i> Open translator
    </router-link>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useAuth } from '../composables/useAuth.js'

const { user } = useAuth()
const avatar = computed(() => user.value.photo || 'https://i.pravatar.cc/160?img=32')
</script>

<style scoped>
.profile-card { background: #fff; border-radius: 28px; padding: 28px; box-shadow: 0 22px 60px rgba(15, 23, 42, .08); }
.avatar-wrap { position: relative; width: 82px; height: 82px; overflow: visible; flex: 0 0 82px; }.avatar-image { display: block; width: 82px !important; min-width: 82px; max-width: 82px; height: 82px !important; min-height: 82px; max-height: 82px; border-radius: 24px; object-fit: cover; border: 4px solid #dbeafe; }.online-dot { position: absolute; right: -2px; bottom: -2px; width: 18px; height: 18px; border-radius: 50%; background: #22c55e; border: 3px solid #fff; }.eyebrow { margin: 22px 0 5px; text-transform: uppercase; letter-spacing: .13em; font-size: .72rem; font-weight: 800; color: #2563eb; }.profile-card h3 { margin: 0; color: #0f172a; font-size: 1.35rem; }.profile-card-content > p:last-child { margin: 8px 0 22px; color: #64748b; overflow-wrap: anywhere; }.translate-link { display: inline-flex; align-items: center; gap: 8px; color: #1d4ed8; font-weight: 700; text-decoration: none; }
</style>
