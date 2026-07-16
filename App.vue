<template>
  <div class="app-container">
    <Navbar v-if="showShell" @toggle-sidebar="sidebarOpen = !sidebarOpen" />

<div class="layout">
      <Sidebar v-if="showShell" v-show="sidebarOpen" />

      <main class="content" role="main">
        <div class="page-wrap">
          <router-view />
        </div>
      </main>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAuth } from './composables/useAuth.js'
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar.vue'
import Footer from './components/Footer.vue'

const route = useRoute()
const { isAuthenticated } = useAuth()
const showShell = computed(() => isAuthenticated.value && route.name !== 'Login' && route.name !== 'Register')
const sidebarOpen = ref(true)

watch(route, () => {
  if (window.innerWidth > 1100) sidebarOpen.value = true
})
</script>

<style>
body {
  margin: 0;
  font-family: 'Segoe UI', Roboto, sans-serif;
  background: linear-gradient(135deg, #f8fbff 0%, #eef4ff 100%);
  color: #0f172a;
}

* {
  box-sizing: border-box;
}

.layout {
  display: flex;
  min-height: calc(100vh - 72px);
}

 .content {
  flex: 1;
  padding: 26px;
  background: transparent;
  min-height: 100vh;
}

.page-wrap{
  max-width: 1440px;
  margin: 0 auto;
}

@media (max-width: 992px) {
  .layout {
    flex-direction: column;
  }

  .content {
    padding: 16px;
  }
}

</style>
