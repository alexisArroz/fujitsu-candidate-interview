<script setup lang="ts">
import FujitsuGeneralImg from '@/assets/fujitsu-general-limited.png'
import Dropdown from '../molecules/Dropdown.vue'

const languages = [
  { name: 'English', value: 'en' },
  { name: 'Español', value: 'es' }
]
const changeLanguage = (value: string) => {
  if (localStorage.lang !== value) {
    localStorage.lang = value
    location.reload()
  }
}
</script>
<template>
  <div class="footer">
    <div class="footer--info">
      <img class="footer--info--img" :src="FujitsuGeneralImg" />
      <div class="footer--info--links">
        <a href="https://www.fujitsugeneral.com/us/terms/index.html" target="_blank"
          >Terms of Service</a
        >
        |
        <a href="https://www.fujitsugeneral.com/us/privacy/index.html" target="_blank"
          >Privacy Policy</a
        >
      </div>
      <p class="footer--info--paragraph">
        © 2023 FUJITSU GENERAL LIMITED | All Rights Reserved 2.1.1-R1 (cefc3c9)
      </p>
    </div>
    <div class="footer--language">
      <Dropdown :text="$t('language')" @select-value="changeLanguage" :items="languages" />
    </div>
  </div>
</template>
<style scoped>
.footer {
  min-height: 72px;
  background-color: #186e73;
  padding: 12px 7% 15px 7%;
  display: flex;
  justify-content: space-between;
}
.footer--info {
  display: flex;
  flex-direction: column;
  font-family: 'Times New Roman', Times, serif;
  color: #ffffff;
  font-size: 0.75rem;
}
.footer--info--links a {
  color: #ffffff;
}
.footer--info--img {
  width: 310px;
}
.footer--info--paragraph {
  margin: 4px 0 0 0;
}
.footer--language {
  display: flex;
  align-items: end;
}
</style>
