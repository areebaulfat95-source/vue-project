<template>
  <footer class="app-footer">
    <div class="footer-inner">
      <div class="footer-brand">
        <strong>SLTS</strong>
        <span>Sign Language Translation System</span>
      </div>

      <p class="footer-copy">© {{ new Date().getFullYear() }} · Built for accessible communication</p>
    </div>
  </footer>
</template>

<script setup>
// No script needed
</script>

<style scoped>
.app-footer {
  margin-top: 34px;
  border-top: 1px solid rgba(148, 163, 184, 0.35);
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(10px);
}

.footer-inner {
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 20px 28px;
  color: #64748b;
  font-size: 0.86rem;
}

.footer-brand {
  display: flex;
  align-items: baseline;
  gap: 10px;
}

.footer-brand strong {
  color: #2563eb;
  letter-spacing: 0.06em;
}

.footer-copy {
  margin: 0;
}

:global(body.theme-dark) .app-footer {
  background: rgba(17, 24, 39, 0.65);
  border-top-color: rgba(148, 163, 184, 0.2);
}

:global(body.theme-dark) .footer-inner {
  color: #9ca3af;
}

@media (max-width: 600px) {
  .footer-inner {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>

