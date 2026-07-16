<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth.js'

const router = useRouter()
const { register } = useAuth()
const name = ref('')
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const agree = ref(false)

const submitRegister = async () => {
  if (!name.value || !email.value || !password.value) {
    alert('Please fill in all fields.')
    return
  }
  if (!agree.value) {
    alert('You must agree to the terms.')
    return
  }

  try {
    await register(name.value, email.value, password.value)
    router.push('/dashboard')
  } catch (error) {
    alert(error.message || 'Registration failed. Please try again.')
  }
}
</script>

<template>
  <div class="register-card">
    <div class="card-header">
      <h1>Create an Account</h1>
      <p>Register to start using sign language translation.</p>
    </div>

    <form @submit.prevent="submitRegister">
      <div class="form-group">
        <label>Full Name</label>
        <input v-model="name" type="text" placeholder="Full Name" />
      </div>

      <div class="form-group">
        <label>Email</label>
        <input v-model="email" type="email" placeholder="Email Address" />
      </div>

      <div class="form-group password-group">
        <label>Password</label>
        <input
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Password"
        />
        <button type="button" class="toggle-pass" @click="showPassword = !showPassword">
          <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
        </button>
      </div>

      <div class="form-group agree-group">
        <label>
          <input type="checkbox" v-model="agree" />
          I agree to the terms and privacy policy
        </label>
      </div>

      <button type="submit" class="btn-register">Register</button>
    </form>

    <div class="login-link">
      Already have an account?
      <router-link to="/login">Login</router-link>
    </div>
  </div>
</template>

<style scoped>
.register-card {
  width: 100%;
  max-width: 520px;
  background: white;
  border-radius: 24px;
  padding: 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.16);
}

.card-header h1 {
  margin: 0 0 10px;
  font-size: 34px;
}

.card-header p {
  margin: 0 0 30px;
  color: #6b7280;
}

.form-group {
  margin-bottom: 18px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
}

.form-group input[type="text"],
.form-group input[type="email"],
.form-group input[type="password"] {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  outline: none;
}

.password-group {
  position: relative;
}

.toggle-pass {
  position: absolute;
  right: 12px;
  top: 44px;
  border: none;
  background: transparent;
  color: #4b5563;
  cursor: pointer;
  padding: 0;
}

.agree-group label {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #475569;
}

.btn-register {
  width: 100%;
  background: #2563EB;
  color: white;
  border: none;
  padding: 14px;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 10px;
}

.login-link {
  margin-top: 20px;
  text-align: center;
  color: #6b7280;
}

.login-link a {
  color: #2563EB;
  text-decoration: none;
  font-weight: 600;
}
</style>
