<template>
<div class="info-card">
    <h2>{{ title }}</h2>
    <h3>{{ value }}</h3>
</div>
</template>

<script setup>
defineProps({
    title:String,
    value:String
})
</script>

<style scoped>
.info-card{
    background:#2563eb;
    color:white;
    padding:25px;
    border-radius:10px;
    text-align:center;
    width:220px;
}
</style>