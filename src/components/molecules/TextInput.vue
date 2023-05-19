<script setup lang="ts">
const props = defineProps<{
  icon?: any
  type?: string
  button?: boolean
  errorText?: string
  hasError?: boolean
  required?: boolean
  placeholder?: string
  modelValue?: any
}>()
const hasIcon = props.icon ? true : false
const emit = defineEmits(['update:modelValue', 'buttonClick'])
const updateValue = (value: string) => {
  emit('update:modelValue', value)
}
</script>
<template>
  <div>
    <div class="base-input" :class="hasError ? 'has-error' : ''">
      <div v-if="icon" class="base-input--has-icon">
        <FaIcon :icon="icon" />
      </div>
      <input
        class="base-input--input"
        :type="props.type || 'text'"
        :placeholder="props.placeholder"
        :required="props.required"
        :value="props.modelValue"
        @input="updateValue($event.target.value)"
      />
      <button v-if="button" class="base-input--button" @click="emit('buttonClick')">
        <slot></slot>
      </button>
    </div>
    <div class="base-input--error-text">
      <small v-show="hasError">{{ errorText }}</small>
    </div>
  </div>
</template>

<style>
.base-input {
  border: 2px solid #a0a0a0;
  border-radius: 8px;
  display: flex;
  align-items: stretch;
  overflow: hidden;
  background-color: #ffffff;
}
.base-input.has-error {
  border-color: #a94442;
}
.base-input--input {
  border: none;
  background-color: transparent;
  font-size: 1rem;
  flex: auto;
  padding: 6px;
  line-height: 1.5rem;
  min-width: 0;
}
.base-input--has-icon {
  display: flex;
  padding: 0 10px;
  align-items: center;
}
.base-input--button {
  border: none;
  padding: 0 10px;
  border-left: 1px solid #a0a0a0;
}
.base-input--error-text {
  color: #a94442;
  min-height: 22px;
}
</style>
