<template>
  <div class="btn-container">
    <button @click="$emit('translate')">
      Translate Gesture
    </button>
  </div>
</template>

<script setup>
defineEmits(['translate'])
</script>

<style scoped>
.btn-container{
    text-align:center;
    margin:20px 0;
}

button{
    background:#2563eb;
    color:white;
    border:none;
    padding:15px 40px;
    border-radius:8px;
    cursor:pointer;
    font-size:18px;
}

button:hover{
    background:#1d4ed8;
}
</style>