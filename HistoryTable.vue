<script setup>
const { history } = defineProps({
  history: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['view-item', 'delete-item'])
</script>

<template>
  <div class="history-card">
    <div class="table-header">
      <h3>Translation History</h3>
    </div>

    <table>
      <thead>
        <tr>
          <th>Gesture</th>
          <th>Translation</th>
          <th>Confidence</th>
          <th>Date</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in history" :key="item.id">
          <td>{{ item.gesture }}</td>
          <td>{{ item.translation }}</td>
          <td>
            <span class="badge">
              {{ item.confidence }}
            </span>
          </td>
          <td>{{ item.date }}</td>
          <td>
            <button type="button" @click="emit('view-item', item)">
              <i class="bi bi-eye"></i>
            </button>
            <button type="button" class="delete-btn" @click="emit('delete-item', item)">
              <i class="bi bi-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

.history-card{

background:white;

padding:30px;

border-radius:20px;

box-shadow:0 8px 25px rgba(0,0,0,.08);

}

.table-header{

display:flex;

justify-content:space-between;

align-items:center;

margin-bottom:25px;

}

.table-header h3{

font-size:30px;

font-weight:700;

}

.table-header input{

width:250px;

padding:12px;

border:1px solid #ddd;

border-radius:10px;

outline:none;

}

table{

width:100%;

border-collapse:collapse;

}

th{

background:#3b82f6;

color:white;

padding:18px;

}

td{

padding:18px;

border-bottom:1px solid #eee;

}

tbody tr:hover{

background:#f5f8ff;

}

.badge{

background:#22c55e;

color:white;

padding:6px 14px;

border-radius:20px;

font-size:13px;

}

button{

border:none;

background:#3b82f6;

color:white;

padding:8px 12px;

border-radius:8px;

cursor:pointer;

}

button:hover{

background:#2563eb;

}

.delete-btn{

background:#ef4444;
margin-left:8px;

}

.delete-btn:hover{

background:#dc2626;

}

</style>