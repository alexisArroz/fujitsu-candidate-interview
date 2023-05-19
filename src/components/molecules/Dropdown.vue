<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps<{
  text: string
  items: Array<any>
}>()

const emit = defineEmits(['selectValue'])
const showDropdown = ref(false)
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}
</script>
<template>
  <div class="dropdown--backdrop" v-show="showDropdown" @click="toggleDropdown"></div>
  <div class="dropdown">
    <ul v-show="showDropdown" class="dropdown--options">
      <li
        :key="item.name"
        @click="
          () => {
            emit('selectValue', item.value)
            toggleDropdown()
          }
        "
        v-for="item in items"
      >
        {{ item.name }}
      </li>
    </ul>
    <div @click="toggleDropdown" class="dropdown--button">
      <div class="dropdown--text">{{ text }}</div>
      <div clasS="dropdown--arrow">
        <FaIcon icon="chevron-up" />
      </div>
    </div>
  </div>
</template>
<style scoped>
.dropdown {
  background-color: #ffffff;
  padding: 5px 10px;
  border-radius: 8px;
  font-size: 0.8rem;
  position: relative;
  border: 1px solid #a0a0a0;
  user-select: none;
  cursor: pointer;
}
.dropdown--button {
  display: flex;
}
.dropdown--text {
  padding-right: 20px;
}
.dropdown--arrow {
  padding-left: 5px;
  border-left: 1px solid #a0a0a0;
}
.dropdown--options {
  position: absolute;
  bottom: 29px;
  left: 5px;
  background-color: #ffffff;
  margin: 0;
  width: 80%;
  padding: 2px;
  border: 1px solid #a0a0a0;
  border-bottom: none;
  border-radius: 5px 5px 0 0;
}
.dropdown--options li {
  display: block;
  padding: 5px;
}
.dropdown--options li:hover {
  background-color: #41b883;
  color: #ffffff;
}
.dropdown--backdrop {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
</style>
