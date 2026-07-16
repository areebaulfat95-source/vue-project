<template>
  <div class="gesture-card">
    <h3>{{ gesture }}</h3>
    <p>{{ meaning }}</p>
  </div>
</template>

<script setup>
defineProps({
    gesture:String,
    meaning:String
})
</script>

<style scoped>
.gesture-card{
    background:white;
    padding:20px;
    border-radius:10px;
    box-shadow:0 2px 10px rgba(0,0,0,.1);
    margin:15px 0;
}
</style>