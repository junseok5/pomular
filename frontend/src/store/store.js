import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as mutations from './mutations'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    showModalSetting: false,
    showModalVideo: false,
    showModalSubtitle: false,
    showSubtitle: true,
    mediaMode: '',
    objectURL: '',
    youtubeId: 'SA0y8V5Jt2w',
    channelName: '',
    title: '폴 매너 포트의 사기재판, 솜사탕의 날 - 독백',
    media: '',
    isMedia: false,
    orientation: 'portrait',
    isSubtitle: false,
    isKoSubtitle: false,
    language: 'en',
    subtitle: [],
    koSubtitle: [],
    deviceType: '',
    subcount: 0,
    ysubcount: 0,
    keyControl: true,
    isSectionRepeat: false,
    contrView: {
      subConverter: true,
      subtitle: true,
      sectionRepeat: true,
      play: true,
      repeat: true,
      sectionContr: true
    },
    viewMediaContr: false,
    showMessage: false,
    messageText: '',
    messageDelay: 800,
    subtitleContent: '',
    play: false,
    currentTime: 0,
    isFullScreen: false,
    duration: 0,
    showLoading: false,
    showMediaLoading: false,
    showDataLoading: false,
    showError: false,
    errorDelay: 3000,
    errorMessage: '',
    mousePosition: {
      x: 0,
      y: 0
    },
    videoMode: {
      youtube: false,
      my: true
    },
    timer: '',
    headerInfo: '',
    idb: undefined,
    isIdb: false
  },
  mutations,
  getters
})
