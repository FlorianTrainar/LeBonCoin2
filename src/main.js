import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faSearch, faCircle } from '@fortawesome/free-solid-svg-icons'
import { faUser, faPlusSquare } from '@fortawesome/free-regular-svg-icons'
import {} from '@fortawesome/free-brands-svg-icons'
library.add(faSearch, faUser, faPlusSquare, faCircle)

const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon)

app.use(router)

app.mount('#app')
