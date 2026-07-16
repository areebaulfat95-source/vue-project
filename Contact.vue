<script setup>
import ContactSection from '../components/ContactSection.vue'
</script>

<template>
  <div class="container-fluid contact-page">
    <header class="contact-page-header">
      <div>
        <h1 class="page-title">Contact Us</h1>
        <p class="page-subtitle">
          Need help with the sign language translator? Our team is ready to support your project and answer all questions.
        </p>
      </div>
      <span class="page-badge">Fast support · Trusted service · Expert guidance</span>
    </header>

    <ContactSection />
  </div>
</template>

<style scoped>
.page-title {
  font-size: 44px;
  font-weight: 800;
  margin: 0 0 12px;
  letter-spacing: -0.03em;
}

.page-subtitle {
  max-width: 720px;
  margin: 0;
  color: #475569;
  font-size: 17px;
  line-height: 1.85;
}

.contact-page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 36px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e2e8f0;
}

.page-badge {
  display: inline-flex;
  padding: 12px 18px;
  border-radius: 999px;
  background: rgba(59, 130, 246, 0.12);
  color: #1d4ed8;
  font-weight: 700;
  font-size: 14px;
}

@media (max-width: 900px) {
  .contact-page-header {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>