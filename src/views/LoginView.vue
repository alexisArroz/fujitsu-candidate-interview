<script setup lang="ts">
import Header from '@/components/organisms/Header.vue'
import Footer from '@/components/organisms/Footer.vue'
import LoginForm from '@/components/organisms/LoginForm.vue'
import { ref } from 'vue'

const showLoading = ref(false)
const onSubmit = () => {
  showLoading.value = true
  setTimeout(() => {
    showLoading.value = false
    console.log('Logged In!')
  }, 3000)
}
</script>

<template>
  <Teleport to="body">
    <div v-if="showLoading" class="loading">
      <FaIcon
        class="loading--spinner"
        :class="{ 'loading--spinner--rotating': showLoading }"
        icon="spinner"
      />
    </div>
  </Teleport>
  <div>
    <Header />
    <div class="login-view--form">
      <LoginForm @submit="onSubmit" />
    </div>
    <Footer />
  </div>
</template>

<style scoped>
.login-view--form {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 225px);
  min-height: 365px;
}
.loading {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}
.loading--spinner {
  color: #ffffff;
  font-size: 3rem;
}
@-webkit-keyframes rotating {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.loading--spinner--rotating {
  animation: rotating 1s linear infinite;
}
</style>
