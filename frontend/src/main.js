import Vue from 'vue'
import App from './App'
import axios from 'axios'
import { store } from './store/store'
import router from './router'
import VueYouTubeEmbed from 'vue-youtube-embed'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faVideo, faFileAlt, faEnvelope, faStepBackward,
  faStepForward, faPlay, faPause, faRedo, faTimes,
  faShareAlt, faCog, faTrashAlt, faQuestionCircle,
  faSyncAlt, faMobileAlt, faKeyboard, faDollarSign,
  faExpand, faCompress, faBars, faHome, faCaretSquareRight,
  faThLarge, faArrowLeft, faClosedCaptioning
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import 'es6-promise/auto'
import infiniteScroll from 'vue-infinite-scroll'

library.add(
  faVideo, faFileAlt, faEnvelope, faStepBackward, faStepForward,
  faPlay, faRedo, faPause, faTimes, faShareAlt, faCog, faTrashAlt,
  faQuestionCircle, faSyncAlt, faMobileAlt, faKeyboard, faDollarSign,
  faExpand, faCompress, faBars, faHome, faCaretSquareRight, faThLarge,
  faArrowLeft, faClosedCaptioning
)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueYouTubeEmbed)
Vue.use(infiniteScroll)

Vue.prototype.$http = axios

Vue.config.productionTip = true

new Vue({
  el: '#app',
  router,
  store,
  directives: {infiniteScroll},
  render (h) {
    return h(App)
  }
})
