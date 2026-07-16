<template>
  <div class="register-page">
    <RegisterForm />
  </div>
</template>

<script setup>
import RegisterForm from '../components/RegisterForm.vue'
</script>

<style scoped>
.register-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #2563EB, #1E3A8A);
  padding: 30px;
}
</style>
