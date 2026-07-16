<template>
  <div class="profile-page">
    <div class="profile-sidebar">
      <ProfileCard />

      <div class="summary-card">
        <div class="summary-header">
          <h3>Account Summary</h3>
          <p>Quick overview of your profile status.</p>
        </div>

        <div class="summary-list">
          <div class="summary-row">
            <span>Role</span>
            <strong>Administrator</strong>
          </div>
          <div class="summary-row">
            <span>Member Since</span>
            <strong>January 2024</strong>
          </div>
          <div class="summary-row">
            <span>Status</span>
            <span class="status-pill">Active</span>
          </div>
        </div>
      </div>
    </div>

    <div class="profile-details">
      <div class="profile-details-header">
        <div class="profile-heading">
          <h2>Profile Details</h2>
          <p>View and update your personal information here.</p>
        </div>

        <div class="profile-actions">
          <span class="status-chip">{{ isEditing ? 'Editing' : 'Active' }}</span>
          <button v-if="!isEditing" type="button" class="btn edit-btn" @click="openEditProfile">
            Edit Details
          </button>
        </div>
      </div>

      <div class="photo-editor">
        <img :src="photoPreview" alt="Profile preview" class="photo-preview" />
        <div>
          <h3>Profile photo</h3>
          <p>Upload a JPG, PNG, or WebP image (maximum 2 MB).</p>
          <label class="upload-btn">
            <i class="bi bi-image"></i> Choose photo
            <input type="file" accept="image/png,image/jpeg,image/webp" @change="changePhoto" />
          </label>
        </div>
      </div>

      <form @submit.prevent="saveProfile">
        <div class="detail-grid">
          <div class="detail-item">
            <label>Name</label>
            <input v-model="editedUser.name" :readonly="!isEditing" :class="{ editable: isEditing }" />
          </div>
          <div class="detail-item">
            <label>Email</label>
            <input v-model="editedUser.email" :readonly="!isEditing" :class="{ editable: isEditing }" />
          </div>
          <div class="detail-item">
            <label>Phone</label>
            <input v-model="editedUser.phone" :readonly="!isEditing" :class="{ editable: isEditing }" />
          </div>
          <div class="detail-item">
            <label>University</label>
            <input v-model="editedUser.university" :readonly="!isEditing" :class="{ editable: isEditing }" />
          </div>
          <div class="detail-item">
            <label>Department</label>
            <input v-model="editedUser.department" :readonly="!isEditing" :class="{ editable: isEditing }" />
          </div>
          <div class="detail-item">
            <label>Semester</label>
            <input v-model="editedUser.semester" :readonly="!isEditing" :class="{ editable: isEditing }" />
          </div>
          <div class="detail-item full-width">
            <label>Roll No</label>
            <input v-model="editedUser.roll" :readonly="!isEditing" :class="{ editable: isEditing }" />
          </div>
        </div>

        <div v-if="isEditing" class="edit-actions">
          <button type="submit" class="btn btn-primary">Save Changes</button>
          <button type="button" class="btn btn-outline-secondary" @click="cancelEdit">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue'
import ProfileCard from '../components/ProfileCard.vue'
import { useAuth } from '../composables/useAuth.js'

const { user, updateProfile } = useAuth()
const isEditing = ref(false)
const editedUser = reactive({ ...user.value })
const photoPreview = computed(() => editedUser.photo || 'https://i.pravatar.cc/160?img=32')

watch(user, (newUser) => {
  Object.assign(editedUser, newUser)
}, { deep: true, immediate: true })

const openEditProfile = () => {
  Object.assign(editedUser, user.value)
  isEditing.value = true
}

const saveProfile = async () => {
  try {
    await updateProfile({ ...editedUser })
    isEditing.value = false
    alert('Profile updated successfully')
  } catch (error) {
    alert(error.message || 'Failed to update profile. Please try again.')
  }
}

const changePhoto = (event) => {
  const [file] = event.target.files
  if (!file) return
  if (file.size > 2 * 1024 * 1024) {
    alert('Please choose an image smaller than 2 MB.')
    event.target.value = ''
    return
  }
  const reader = new FileReader()
  reader.onload = async () => {
    editedUser.photo = reader.result
    try {
      await updateProfile({ photo: reader.result })
    } catch (error) {
      alert(error.message || 'Failed to upload photo. Please try again.')
    }
  }
  reader.readAsDataURL(file)
}

const cancelEdit = () => {
  Object.assign(editedUser, user.value)
  isEditing.value = false
}
</script>

<style scoped>
.profile-page {
  display: grid;
  grid-template-columns: 360px minmax(0, 1fr);
  gap: 24px;
  align-items: start;
  padding: 18px 0;
}

.profile-sidebar {
  display: grid;
  gap: 20px;
}

.summary-card {
  padding: 24px;
  border-radius: 28px;
  background: #ffffff;
  box-shadow: 0 22px 60px rgba(15, 23, 42, 0.08);
}

.summary-header h3 {
  margin: 0 0 10px;
  font-size: 1.2rem;
}

.summary-header p {
  margin: 0;
  color: #64748b;
}

.summary-list {
  margin-top: 22px;
  display: grid;
  gap: 14px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 18px;
  border-radius: 18px;
  background: #f8fafc;
}

.summary-row strong {
  color: #0f172a;
  font-weight: 700;
}

.status-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 14px;
  border-radius: 999px;
  background: #dcfce7;
  color: #15803d;
  font-weight: 700;
}

.profile-details {
  padding: 34px;
  border-radius: 28px;
  background: #ffffff;
  box-shadow: 0 22px 60px rgba(15, 23, 42, 0.08);
}

.profile-details-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 28px;
  margin-bottom: 30px;
}

.photo-editor {
  display: flex;
  align-items: center;
  gap: 18px;
  margin: 0 0 28px;
  padding: 18px;
  border: 1px solid #dbeafe;
  border-radius: 20px;
  background: #f8fbff;
}

.photo-preview { width: 76px; height: 76px; flex: 0 0 76px; border-radius: 20px; object-fit: cover; border: 3px solid #bfdbfe; }
.photo-editor h3 { margin: 0; font-size: 1rem; }.photo-editor p { margin: 5px 0 12px; color: #64748b; font-size: .9rem; }
.upload-btn { display: inline-flex; align-items: center; gap: 8px; padding: 9px 13px; border-radius: 10px; background: #2563eb; color: #fff; font-size: .88rem; font-weight: 700; cursor: pointer; }.upload-btn input { display: none; }.upload-btn.disabled { cursor: not-allowed; opacity: .5; }

.profile-heading h2 {
  margin: 0;
  font-size: 2.4rem;
  line-height: 1.05;
}

.profile-heading p {
  margin: 12px 0 0;
  color: #64748b;
}

.profile-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 16px;
}

.status-chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 18px;
  border-radius: 24px;
  background: #e2e8f0;
  color: #0f172a;
  font-weight: 700;
}

.btn.edit-btn {
  border-radius: 16px;
  padding: 12px 22px;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.detail-item.full-width {
  grid-column: span 2;
}

.detail-item label {
  margin: 0;
  color: #334155;
  font-weight: 700;
  font-size: 0.95rem;
}

.detail-item input {
  width: 100%;
  padding: 16px 18px;
  height: 56px;
  border: 1px solid #d1d5db;
  border-radius: 18px;
  background: #f8fafc;
}

.detail-item input.editable {
  background: #ffffff;
  border-color: #2563eb;
}

.edit-actions {
  display: flex;
  gap: 14px;
  margin-top: 26px;
}

@media (max-width: 980px) {
  .profile-page {
    grid-template-columns: 1fr;
  }

  .detail-grid {
    grid-template-columns: 1fr;
  }

  .detail-item.full-width {
    grid-column: span 1;
  }

  .profile-actions {
    align-items: flex-start;
  }
}

@media (max-width: 520px) { .photo-editor { align-items: flex-start; flex-direction: column; } }
</style>



