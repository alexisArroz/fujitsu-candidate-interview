<script setup lang="ts">
import TextInput from '../molecules/TextInput.vue'
import { ref, watch, computed } from 'vue'
//Creating Regex for fields validation
const emailValidation = RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
const passwordValidation = RegExp(/(?=.{8,}$)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\W)/)

//Each field in the login form has its own flags and state
const email = ref('')
const emailHasError = ref(false)

const password = ref('')
const displayPassword = ref(false)
const passwordHasError = ref(false)
//This also applies for forgot password field
const forgotPasswordEmail = ref('')
const forgotPasswordHasError = ref(false)

const showModal = ref(false)

const emit = defineEmits(['submit'])

const submitForm = () => {
  //When trying to submit we first validate fields and set error
  //flags true or false so this
  passwordHasError.value = !passwordValidation.test(password.value)
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

//This function will be used when validating modal
//input
const validateModal = () => {
  forgotPasswordHasError.value = !emailValidation.test(forgotPasswordEmail.value)
}

const emptyFields = computed(() => {
  return password.value.length < 1 || email.value.length < 1
})

//Since we're validating this form, should watch
//and remove the error displayed when the input
//meets the requirements to let the user know
//the input is valid already
watch(email, (newemail) => {
  emailHasError.value = !emailValidation.test(newemail)
})
watch(password, (newPassword) => {
  passwordHasError.value = !passwordValidation.test(newPassword)
})
</script>

<template>
  <div class="login-form">
    <h2 class="login-form--header">{{ $t('login.title') }}</h2>
    <TextInput
      icon="user"
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
        $t('login.forgotPassword.formLink')
      }}</a>
      <button
        class="btn login-form--login-controls--button"
        :disabled="emptyFields || passwordHasError || emailHasError"
        @click="submitForm"
      >
        {{ $t('login.submitButton') }}
      </button>
    </div>
    <!--This teleport is used to move modal to body tag to prevent styling and functionality issues-->
    <Teleport to="body">
      <div v-if="showModal">
        <div class="login-form--modal--backdrop" @click="toggleModal"></div>
        <div class="login-form--modal--body">
          <h2>{{ $t('login.forgotPassword.title') }}</h2>
          <p>{{ $t('login.forgotPassword.description') }}</p>
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
  max-width: 595px;
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
  margin-bottom: 40px;
  font-weight: bold;
}
.login-form--login-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
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
  font-size: 0.85rem;
  font-family: 'Open sans';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: 30px auto;
  max-width: 670px;
  padding: 15px;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 5px 3px 15px 3px rgba(0, 0, 0, 0.3);
}
.login-form--modal--body h2 {
  font-size: 1.8rem;
}
.login-form--modal--body p {
  color: #83878f;
}
.login-form--modal--body h2,
.login-form--modal--body p {
  margin: 10px 0;
  text-align: center;
}
.login-form--modal--body--buttons {
  display: flex;
}
.login-form--modal--body .btn {
  padding: 6px 12px;
  border-radius: 4px;
  line-height: 1.3rem;
  font-weight: 300;
}
.login-form--modal--body .btn.cancel {
  margin-right: auto;
  background-color: #6c757d;
  color: #ffffff;
}
.login-form--modal--body .btn.next {
  background-color: #337ab7;
  color: #ffffff;
}
.login-form--modal--body .base-input {
  border: 1px solid #a0a0a0;
}
</style>
