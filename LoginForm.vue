<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth.js'

const router = useRouter()
const { login } = useAuth()
const showPassword = ref(false)
const email = ref('')
const password = ref('')
const remember = ref(false)

const submitLogin = async () => {
  if (!email.value || !password.value) {
    alert('Please enter your email and password.')
    return
  }

  try {
    await login(email.value, password.value)
    router.push('/dashboard')
  } catch (error) {
    alert(error.message || 'Login failed. Please try again.')
  }
}
</script>

<template>
  <div class="login-card">
    <div class="left">
      <i class="bi bi-camera-video-fill"></i>
      <h2>Sign Language Translation</h2>
      <p>AI Powered Gesture Recognition System</p>
    </div>

    <div class="right">
      <h1>Welcome Back</h1>
      <p>Login to continue</p>

      <form @submit.prevent="submitLogin">
        <div class="mb-3">
          <label>Email</label>
          <input
            v-model="email"
            type="email"
            class="form-control"
            placeholder="Enter email"
          />
        </div>

        <div class="mb-3">
          <label>Password</label>
          <div class="input-group">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              class="form-control"
              placeholder="Enter password"
            />
            <button
              type="button"
              class="btn btn-outline-secondary"
              @click="showPassword = !showPassword"
            >
              <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
            </button>
          </div>
        </div>

        <div class="d-flex justify-content-between mb-4">
          <div>
            <input type="checkbox" v-model="remember" />
            Remember Me
          </div>
          <a href="#">Forgot Password?</a>
        </div>

        <button class="btn btn-primary w-100">Login</button>
      </form>

      <div class="text-center mt-4">
        Don't have an account?
        <router-link to="/register">Register</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-card {
  width: 100%;
  max-width: 1100px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: white;
  border-radius: 25px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
}

.left {
  background: #2563EB;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px;
}

.left i {
  font-size: 120px;
  margin-bottom: 20px;
}

.left h2 {
  font-size: 32px;
  font-weight: 700;
  text-align: center;
}

.left p {
  text-align: center;
  opacity: 0.9;
}

.right {
  padding: 60px;
}

.right h1 {
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 10px;
}

.right p {
  color: #666;
  margin-bottom: 30px;
}

@media (max-width: 900px) {
  .login-card {
    grid-template-columns: 1fr;
  }

  .left {
    display: none;
  }

  .right {
    padding: 40px;
  }
}
</style>