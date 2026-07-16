<template>
  <div class="card">
    <div class="card-top">
        <div class="icon-box">
          <i :class="icon"></i>
        </div>
        <span class="badge-live">Live</span>
      </div>

      <div class="card-body">
        <p class="title">{{ title }}</p>
        <h2 class="value">{{ value }}</h2>
        <p class="subtitle">{{ subtitle }}</p>
      </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  value: String,
  subtitle: String,
  icon: String
})
</script>

<style scoped>
.card {
  background: linear-gradient(135deg, #ffffff 0%, #f8fbff 100%);
  border: 1px solid #e2e8f0;
  border-radius: 22px;
  padding: 22px;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.06);
  transition: 0.3s ease;
  /* Ensure horizontal text flow to avoid vertical/per-letter wrapping */
  writing-mode: horizontal-tb;
  word-break: normal;
  overflow-wrap: normal;
  min-width: 220px;
  min-height: 200px;
  box-sizing: border-box;
  /* make cards behave well inside a flex row */
  flex: 0 0 260px;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 34px rgba(37, 99, 235, 0.14);
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}

.icon-box {
  width: 52px;
  height: 52px;
  background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 14px;
  font-size: 22px;
}

.pill {
  padding: 6px 10px;
  border-radius: 999px;
  background: #eff6ff;
  color: #2563eb;
  font-size: 0.75rem;
  font-weight: 700;
}

.badge-live {
  padding: 6px 10px;
  border-radius: 999px;
  background: #eff6ff;
  color: #2563eb;
  font-size: 0.75rem;
  font-weight: 700;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: center;
  text-align: center;
  justify-content: center;
  padding: 6px 8px 18px;
}

.title {
  margin: 0;
  font-weight: 600;
  color: #64748b;
  font-size: 0.95rem;
}

.value {
  margin: 0;
  font-size: 2.1rem;
  color: #0f172a;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.subtitle {
  margin: 8px 0 0;
  color: #10b981;
  font-weight: 700;
}
</style>