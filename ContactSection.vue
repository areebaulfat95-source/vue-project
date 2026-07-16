<template>
<div class="contact-container">
  <div class="contact-form card">
    <div class="section-header">
      <div>
        <h2>Send us a message</h2>
        <p>We are here to help you with AI sign language translation.</p>
      </div>
     
    </div>

    <form @submit.prevent="sendMessage">
      <div class="grid-inputs">
        <div class="form-group">
          <label>Name</label>
          <input v-model.trim="form.name" type="text" required placeholder="Enter your name" />
        </div>
        <div class="form-group">
          <label>Email</label>
          <input v-model.trim="form.email" type="email" required placeholder="Enter your email" />
        </div>
      </div>

      <div class="form-group">
        <label>Subject</label>
        <input v-model.trim="form.subject" type="text" required placeholder="Subject" />
      </div>

      <div class="form-group">
        <label>Message</label>
        <textarea v-model.trim="form.message" rows="6" required placeholder="Write your message..."></textarea>
      </div>

      <button class="btn-submit" type="submit">
        <i class="bi bi-send-fill"></i>
        Send Message
      </button>
      <p v-if="sent" class="success-message"><i class="bi bi-check-circle-fill"></i> Message ready—thank you for contacting us.</p>
    </form>
  </div>

  <div class="contact-info card">
    <div class="section-header">
      <div>
        <h2>Contact Information</h2>
        <p>Reach out at any time — we’re ready to support you.</p>
      </div>
    </div>

    <div class="info-item">
      <div class="icon-round bg-blue">
        <i class="bi bi-envelope-fill"></i>
      </div>
      <div>
        <h6>Email</h6>
        <p>support@signlanguage.ai</p>
      </div>
    </div>

    <div class="info-item">
      <div class="icon-round bg-cyan">
        <i class="bi bi-telephone-fill"></i>
      </div>
      <div>
        <h6>Phone</h6>
        <p>+92 300 1234567</p>
      </div>
    </div>

    <div class="info-item">
      <div class="icon-round bg-indigo">
        <i class="bi bi-geo-alt-fill"></i>
      </div>
      <div>
        <h6>Address</h6>
        <p>Lahore, Pakistan</p>
      </div>
    </div>

    <div class="info-item">
      <div class="icon-round bg-purple">
        <i class="bi bi-globe"></i>
      </div>
      <div>
        <h6>Website</h6>
        <p>www.signlanguage.ai</p>
      </div>
    </div>

    <div class="social-row">
      <h5>Follow Us</h5>
      <div class="social-icons">
        <i class="bi bi-facebook"></i>
        <i class="bi bi-instagram"></i>
        <i class="bi bi-twitter-x"></i>
        <i class="bi bi-linkedin"></i>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { reactive, ref } from 'vue'
const sent = ref(false)
const form = reactive({ name: '', email: '', subject: '', message: '' })
const sendMessage = () => {
  sent.value = true
  Object.assign(form, { name: '', email: '', subject: '', message: '' })
}
</script>

<style scoped>
.contact-container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  max-width: 1180px;
  margin: 0 auto;
}

.card {
  background: #ffffff;
  padding: 36px;
  border-radius: 28px;
  box-shadow: 0 20px 50px rgba(15, 23, 42, 0.08);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 24px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e2e8f0;
}

.section-header h2 {
  margin: 0;
  font-size: 30px;
}

.section-header p {
  margin: 8px 0 0;
  color: #64748b;
  max-width: 520px;
  line-height: 1.75;
}

.badge {
  display: inline-flex;
  padding: 10px 16px;
  border-radius: 999px;
  background: rgba(37, 99, 235, 0.12);
  color: #1d4ed8;
  font-weight: 700;
  font-size: 13px;
}

.grid-inputs {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-group label {
  color: #334155;
  font-weight: 700;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 16px 18px;
  border: 1px solid #e2e8f0;
  border-radius: 18px;
  background: #f8fafc;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.08);
}

.form-group textarea {
  min-height: 180px;
  resize: vertical;
}

.btn-submit {
  margin-top: 22px;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 16px 24px;
  border: none;
  border-radius: 18px;
  background: #2563eb;
  color: #ffffff;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.2s ease;
}

.btn-submit:hover {
  transform: translateY(-1px);
  background: #1d4ed8;
}

.success-message { margin: 16px 0 0; color: #15803d; font-weight: 600; }

.info-item {
  display: flex;
  gap: 18px;
  align-items: flex-start;
  margin-bottom: 24px;
  padding: 14px 0;
  border-bottom: 1px solid #f1f5f9;
}

.icon-round {
  width: 58px;
  height: 58px;
  border-radius: 18px;
  display: grid;
  place-items: center;
  color: #ffffff;
  font-size: 20px;
}

.bg-blue {
  background: #2563eb;
}

.bg-cyan {
  background: #0ea5e9;
}

.bg-indigo {
  background: #6366f1;
}

.bg-purple {
  background: #7c3aed;
}

.info-item h6 {
  margin: 0 0 6px;
  font-size: 16px;
}

.info-item p {
  margin: 0;
  color: #475569;
  line-height: 1.7;
}

.social-row {
  margin-top: 28px;
}

.social-row h5 {
  margin: 0 0 16px;
  font-size: 18px;
}

.social-icons {
  display: flex;
  gap: 14px;
}

.social-icons i {
  width: 46px;
  height: 46px;
  border-radius: 16px;
  display: grid;
  place-items: center;
  color: #2563eb;
  background: #eff6ff;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.2s ease;
}

.social-icons i:hover {
  transform: translateY(-2px);
  background: #dbeafe;
}

@media (max-width: 980px) {
  .contact-container {
    grid-template-columns: 1fr;
  }
  .grid-inputs {
    grid-template-columns: 1fr;
  }
}

.social-icons i:hover {
  transform: translateY(-2px);
}

@media (max-width: 992px) {
  .contact-container {
    grid-template-columns: 1fr;
  }

  .grid-inputs {
    grid-template-columns: 1fr;
  }
}
</style>
