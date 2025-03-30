import './assets/main.css'

import { createApp, ref } from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faSearch,
  faCircle,
  faAngleLeft,
  faAngleRight,
  faCheckDouble,
  faMapMarkerAlt,
  faSignOutAlt,
  faEye,
  faEyeSlash,
  faCamera,
  faArrowRight,
  faArrowLeft,
  faTrash,
  faEdit,
} from '@fortawesome/free-solid-svg-icons'
import { faUser, faPlusSquare, faHeart, faClock } from '@fortawesome/free-regular-svg-icons'
import {} from '@fortawesome/free-brands-svg-icons'
library.add(
  faSearch,
  faUser,
  faPlusSquare,
  faCircle,
  faHeart,
  faAngleLeft,
  faAngleRight,
  faClock,
  faCheckDouble,
  faMapMarkerAlt,
  faSignOutAlt,
  faEye,
  faEyeSlash,
  faCamera,
  faArrowRight,
  faArrowLeft,
  faTrash,
  faEdit,
)

const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon)

app.use(router)
app.use(VueCookies)

const userInfo = ref($cookies.get('userInfo') || { username: '', token: '' })
const userId = ref(parseInt($cookies.get('userId')) || null)

const changeUserInfo = (info, id) => {
  userInfo.value = info
  userId.value = id
}

const correctedPrice = (price) => {
  let newPrice = ''

  for (let i = price.length - 1; i >= 0; i--) {
    if (price[i] === '.') {
      newPrice = ',' + newPrice
    } else {
      if (newPrice.length === 3 || newPrice.length === 7) {
        newPrice = price[i] + ' ' + newPrice
      } else {
        newPrice = price[i] + newPrice
      }
    }
  }
  console.log('1 = ' + newPrice[newPrice.length - 3])
  if (newPrice[newPrice.length - 3] === ',') {
    newPrice =
      newPrice.substring(0, newPrice.length - 4) +
      newPrice.substring(newPrice.length - 3, newPrice.length - 2) +
      ' ' +
      newPrice.substring(newPrice.length - 2, newPrice.length)
    console.log(newPrice)
  }
  return newPrice
}

app.provide('GlobalStore', {
  userInfo: userInfo,
  userId: userId,
  changeUserInfo: changeUserInfo,
  correctedPrice: correctedPrice,
})

app.mount('#app')
