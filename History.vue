<script setup>
import { computed } from 'vue'
import HistorySearch from '../components/HistorySearch.vue'
import HistoryTable from '../components/HistoryTable.vue'
import { useHistory } from '../composables/useHistory.js'
import { useSearch } from '../composables/useSearch.js'

const { searchQuery } = useSearch()
const query = searchQuery
const { history, removeHistoryItem } = useHistory()

const filteredHistory = computed(() => {
  const normalized = query.value.trim().toLowerCase()
  if (!normalized) return history.value

  return history.value.filter((item) => {
    return (
      item.gesture.toLowerCase().includes(normalized) ||
      item.translation.toLowerCase().includes(normalized)
    )
  })
})

const onSearch = (value) => {
  searchQuery.value = value
}

const onViewItem = (item) => {
  alert(`Viewing: ${item.gesture} → ${item.translation}`)
}

const onDeleteItem = async (item) => {
  if (!confirm(`Delete this history entry: ${item.gesture} → ${item.translation}?`)) return

  try {
    await removeHistoryItem(item.id)
  } catch (error) {
    alert(error.message || 'Failed to delete history item. Please try again.')
  }
}
</script>

<template>
  <div class="container-fluid">
    <h1 class="page-title">History</h1>
    <HistorySearch :query="query" @search="onSearch" />
    <HistoryTable :history="filteredHistory" @view-item="onViewItem" @delete-item="onDeleteItem" />
  </div>
</template>

<style scoped>

.page-title{

font-size:42px;

font-weight:700;

margin-bottom:25px;

}

</style>