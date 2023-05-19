import './assets/main.css'

import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import router from './router'

import messages from '@/utils/translations'

//Importing font awesome core
import { library } from '@fortawesome/fontawesome-svg-core'
//Importing font awesome icon component
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { fas } from '@fortawesome/free-solid-svg-icons'

const i18n = createI18n({
  locale: localStorage.lang || 'es',
  messages: messages
})

const app = createApp(App)
library.add(fas)
app.use(i18n)
app.use(router)
app.component('FaIcon', FontAwesomeIcon)
app.mount('#app')
