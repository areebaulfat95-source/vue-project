<script setup>
const props = defineProps({
  query: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['search'])

const onInput = (event) => {
  emit('search', event.target.value)
}
</script>

<template>
  <div class="search-card mb-4">
    <div class="input-group">
      <span class="input-group-text">
        <i class="bi bi-search"></i>
      </span>
      <input
        type="text"
        class="form-control"
        placeholder="Search Translation..."
        :value="query"
        @input="onInput"
      />
    </div>
  </div>
</template>

<style scoped>

.search-card{

background:white;

padding:20px;

border-radius:20px;

box-shadow:0 8px 25px rgba(0,0,0,.08);

}

</style>