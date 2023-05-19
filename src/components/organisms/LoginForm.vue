<script setup lang="ts">
import TextInput from '../molecules/TextInput.vue'
import { ref, watch } from 'vue'

const emailValidation = RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)

const email = ref('')
const emailHasError = ref(false)

const password = ref('')
const displayPassword = ref(false)
const passwordHasError = ref(false)

const forgotPasswordEmail = ref('')
const forgotPasswordHasError = ref(false)
const showModal = ref(false)

const emit = defineEmits(['submit'])

const submitForm = () => {
  passwordHasError.value = password.value.length < 8
  emailHasError.value = !emailValidation.test(email.value)
  if (passwordHasError.value || emailHasError.value) return
  emit('submit')
}

const togglePassword = () => {
  displayPassword.value = !displayPassword.value
}

const toggleModal = () => {
  showModal.value = !showModal.value
}

const validateModal = () => {
  console.log(!emailValidation.test(forgotPasswordEmail.value))
  forgotPasswordHasError.value = !emailValidation.test(forgotPasswordEmail.value)
}

watch(email, (newemail) => {
  emailHasError.value = !emailValidation.test(newemail)
})
watch(password, (newPassword) => {
  passwordHasError.value = newPassword.length < 8
})
</script>

<template>
  <div class="login-form">
    <h2 class="login-form--header">{{ $t('login.title') }}</h2>
    <TextInput
      icon="user"
      required
      :errorText="$t('login.email.error')"
      :placeholder="$t('login.email.placeholder')"
      :hasError="emailHasError"
      v-model="email"
    />
    <TextInput
      icon="shield"
      :errorText="$t('login.password.error')"
      :placeholder="$t('login.password.placeholder')"
      :type="displayPassword ? 'text' : 'password'"
      :button="true"
      :hasError="passwordHasError"
      @buttonClick="togglePassword"
      v-model="password"
    >
      <FaIcon :icon="`eye${displayPassword ? '' : '-slash'}`" />
    </TextInput>
    <div class="login-form--login-controls">
      <a class="login-form--forgot-password" href="#" @click="toggleModal">{{
        $t('login.forgotPassword')
      }}</a>
      <button
        class="btn login-form--login-controls--button"
        :disabled="passwordHasError || emailHasError"
        @click="submitForm"
      >
        {{ $t('login.submitButton') }}
      </button>
    </div>
    <Teleport to="body">
      <div v-if="showModal">
        <div class="login-form--modal--backdrop" @click="toggleModal"></div>
        <div class="login-form--modal--body">
          <h2>Forgot your password?</h2>
          <p>Enter your email to receive your password reset instructions.</p>
          <TextInput
            v-model="forgotPasswordEmail"
            :errorText="$t('login.email.error')"
            :hasError="forgotPasswordHasError"
          />
          <div class="login-form--modal--body--buttons">
            <button class="btn cancel" @click="toggleModal">Cancel</button>
            <button class="btn next" @click="validateModal">Next</button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.login-form {
  max-width: 600px;
  background-color: #ffffff;
  padding: 50px 100px;
  border-radius: 5px;
  box-shadow: 5px 3px 15px 3px rgba(140, 140, 140, 0.15);
  width: 100%;
  height: fit-content;
  box-sizing: border-box;
}
.login-form--header {
  text-align: center;
  margin-top: 0;
  font-weight: bold;
}
.login-form--login-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  font-size: 1rem;
}
.login-form--login-controls--button {
  font-size: 0.9rem;
  background-color: #0076bc;
  color: #ffffff;
}
.login-form--forgot-password {
  color: #0076bc;
  text-decoration: none;
  border-bottom: 2px solid #64acd7;
}

.login-form--modal--backdrop {
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  position: absolute;
  display: block;
  background-color: rgba(0, 0, 0, 0.6);
}
.login-form--modal--body {
  font-size: 0.8rem;
  font-family: 'Open sans';
  position: absolute;
  top: 10%;
  left: 0;
  right: 0;
  margin: 50px auto;
  max-width: 640px;
  padding: 15px;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 5px 3px 15px 3px rgba(0, 0, 0, 0.3);
}
.login-form--modal--body h2,
.login-form--modal--body p {
  margin: 0 0 10px 0;
  text-align: center;
}
.login-form--modal--body--buttons {
  display: flex;
}
.login-form--modal--body .btn.cancel {
  margin-right: auto;
}
.login-form--modal--body .btn.next {
  background-color: #337ab7;
  color: #ffffff;
}
</style>
