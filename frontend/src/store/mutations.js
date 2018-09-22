const setShowMediaLoading = (state, val) => {
  state.showMediaLoading = val
}

const setShowLoading = (state, val) => {
  state.showLoading = val
}

const setShowDataLoading = (state, val) => {
  state.showDataLoading = val
}

const setShowError = (state, payload) => {
  state.showError = payload.showError
  if (payload.errorMessage !== undefined) {
    state.errorMessage = payload.errorMessage
  }
  if (payload.errorDelay !== undefined) {
    state.errorDelay = payload.errorDelay
  }
}

const setDuration = (state, val) => {
  state.duration = val
}

const setIsFullScreen = (state, val) => {
  state.isFullScreen = val
  console.log(state.isFullScreen)
}

const setCurrentTime = (state, val) => {
  state.currentTime = val
}

const setLocalStorageCurrentTime = (state, val) => {
  localStorage.currentTime = val
}

const setMedia = (state, val) => {
  state.Media = val
}

const setIsMedia = (state, val) => {
  state.isMedia = val
}

const setPlay = (state, val) => {
  state.play = val
}

const setShowMessage = (state, payload) => {
  state.showMessage = payload.showMessage
  if (payload.messageText !== undefined) {
    state.messageText = payload.messageText
  }
  if (payload.messageDelay !== undefined) {
    state.messageDelay = payload.messageDelay
  }
}

const setViewMediaContr = (state, val) => {
  state.viewMediaContr = val
}

const setContrViewSectionContr = (state, val) => {
  state.contrView.sectionContr = val
}

const setLocalStorageContrViewSectionContr = (state, val) => {
  localStorage.contrViewSectionContr = val
}

const getLocalStorageContrViewSectionContr = (state) => {
  if (localStorage.contrViewSectionContr) {
    state.contrView.sectionContr = JSON.parse(localStorage.contrViewSectionContr)
  }
}

const setContrViewRepeat = (state, val) => {
  state.contrView.repeat = val
}

const setLocalStorageContrViewRepeat = (state, val) => {
  localStorage.contrViewRepeat = val
}

const getLocalStorageContrViewRepeat = (state) => {
  if (localStorage.contrViewRepeat) {
    state.contrView.repeat = JSON.parse(localStorage.contrViewRepeat)
  }
}

const getLocalStorageContrViewPlay = (state) => {
  if (localStorage.contrViewPlay) {
    state.contrView.play = JSON.parse(localStorage.contrViewPlay)
  }
}

const setContrViewPlay = (state, val) => {
  state.contrView.play = val
}

const setLocalStorageContrViewPlay = (state, val) => {
  localStorage.contrViewPlay = val
}

const getLocalStorageContrViewSectionRepeat = (state) => {
  if (localStorage.contrViewSectionRepeat) {
    state.contrView.sectionRepeat = JSON.parse(localStorage.contrViewSectionRepeat)
  }
}

const setContrViewSubConverter = (state, val) => {
  state.contrView.subConverter = val
}

const setLocalStorageContrViewSubConverter = (state, val) => {
  localStorage.contrViewSubConverter = val
}

const getLocalStorageContrViewSubConverter = (state) => {
  if (localStorage.contrViewSubConverter) {
    state.contrView.subConverter = JSON.parse(localStorage.contrViewSubConverter)
  }
}

const setContrViewSectionRepeat = (state, val) => {
  state.contrView.sectionRepeat = val
}

const setLocalStorageContrViewSectionRepeat = (state, val) => {
  localStorage.contrViewSectionRepeat = val
}

const getLocalStorageIsSectionRepeat = (state) => {
  if (localStorage.isSectionRepeat) {
    state.isSectionRepeat = JSON.parse(localStorage.isSectionRepeat)
  }
}

const setIsSectionRepeat = (state, val) => {
  state.isSectionRepeat = val
}

const setLocalStorageIsSectionRepeat = (state, val) => {
  localStorage.isSectionRepeat = val
}

const removeLocalStorageSubtitle = () => {
  localStorage.removeItem('subtitle')
  localStorage.removeItem('koSubtitle')
}

const removeLocalStorageObjectURL = () => {
  localStorage.removeItem('objectURL')
}

const setShowModalVideo = (state, val) => {
  state.keyControl = !val
  state.showModalVideo = val
}

const setSubcount = (state, val) => {
  state.subcount = val
}

const setLocalStorageSubcount = (state) => {
  localStorage.subcount = state.subcount
}

const getLocalStorageSubcount = (state) => {
  if (localStorage.subcount) {
    state.subcount = localStorage.subcount
  }
}

const setDeviceType = (state) => {
  let filter = 'win16|win32|win64|mac'
  if (navigator.platform) {
    if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
      state.deviceType = 'Mobile'
    } else {
      state.deviceType = 'PC'
    }
  }
}

const setObjectURL = (state, objectURL) => {
  state.objectURL = objectURL
}

const setLocalStorageObjectURL = (state, url) => {
  localStorage.objectURL = url
}

const getLocalStorageObjectURL = (state) => {
  if (localStorage.objectURL) {
    state.objectURL = localStorage.objectURL
    state.isMedia = true
  }
}

const setShowModalSetting = (state, val) => {
  state.showModalSetting = val
}

const getLocalStorageSubtitle = (state) => {
  if (localStorage.subtitle) {
    let subtitle = JSON.parse(localStorage.subtitle).subtitle
    state.subtitle = subtitle.slice()
    state.isSubtitle = true
  }
}

const getLocalStorageShowSubtitle = (state) => {
  if (localStorage.showSubtitle) {
    state.showSubtitle = JSON.parse(localStorage.showSubtitle)
  }
}

const setSubtitle = (state, subtitle) => {
  state.subtitle = subtitle.slice()
  state.isSubtitle = true
}

const setKoSubtitle = (state, subtitle) => {
  state.koSubtitle = subtitle.slice()
  state.isKoSubtitle = true
}

const getLocalStorageKoSubtitle = (state) => {
  if (localStorage.koSubtitle) {
    let subtitle = JSON.parse(localStorage.koSubtitle).koSubtitle
    state.koSubtitle = subtitle.slice()
    state.isKoSubtitle = true
  }
}

const setIsSubtitle = (state, val) => {
  state.isSubtitle = val
}

const setShowSubtitle = (state, val) => {
  state.showSubtitle = val
  localStorage.showSubtitle = val
}

const setLocalStorageSubtitle = (state) => {
  let object = { subtitle: state.subtitle }
  localStorage.subtitle = JSON.stringify(object)
}

const setLocalStorageKoSubtitle = (state) => {
  let object = { koSubtitle: state.koSubtitle }
  localStorage.koSubtitle = JSON.stringify(object)
}

const setShowModalSubtitle = (state, val) => {
  state.showModalSubtitle = val
}

const detectOrientation = (state) => {
  if (window.innerHeight < window.innerWidth) {
    state.orientation = 'landscape'
  } else {
    state.orientation = 'portrait'
  }
}

const onMouseMove = (state, event) => {
  if (state.deviceType === 'Mobile') return
  if (!state.play) return
  state.viewMediaContr = true
  let x = event.clientX
  let y = event.clientY
  state.mousePosition.x = event.clientX
  state.mousePosition.y = event.clientY
  setTimeout(() => {
    if (state.play) {
      if (x === state.mousePosition.x && y === state.mousePosition.y) {
        state.viewMediaContr = false
      }
    }
  }, 3000)
}

const showMediaControl = (state) => {
  if (state.deviceType === 'PC') return
  state.viewMediaContr = !state.viewMediaContr
}

const setYoutubeId = (state, val) => {
  state.youtubeId = val
}

const subtitleStart = (state, index) => {
  if (state.language === 'en') {
    state.subtitleContent = state.subtitle[index].content
  } else if (state.language === 'ko') {
    state.subtitleContent = state.koSubtitle[index].content
  }
}

const subtitleEnd = (state) => {
  state.subtitleContent = ''
}

const setVideoMode = (state, val) => {
  if (val === 'youtube') {
    state.videoMode = {
      youtube: true,
      my: false
    }
  } else {
    state.videoMode = {
      youtube: false,
      my: true
    }
  }
}

const setLocalStorageVideoMode = (state) => {
  localStorage.videoMode = JSON.stringify(state.videoMode)
}

const getLocalStorageVideoMode = (state) => {
  if (localStorage.videoMode) {
    state.videoMode = JSON.parse(localStorage.videoMode)
  }
}

const setYsubcount = (state, val) => {
  state.ysubcount = val
}

const setLocalStorageYsubcount = (state) => {
  localStorage.ysubcount = state.ysubcount
}

const getLocalStorageYsubcount = (state) => {
  if (localStorage.ysubcount) {
    state.ysubcount = Number(localStorage.ysubcount)
  }
}

const setLocalStorageYoutubeId = (state) => {
  localStorage.youtubeId = state.youtubeId
}

const getLocalStorageYoutubeId = (state) => {
  if (localStorage.youtubeId) {
    state.youtubeId = localStorage.youtubeId
  }
}

const setTimer = (state, func) => {
  state.timer = func
}

const clearTimer = (state) => {
  clearInterval(state.timer)
}

const setLanguage = (state, val) => {
  if (val) {
    state.language = val
    return
  }
  if (state.language === 'en') {
    state.language = 'ko'
  } else {
    state.language = 'en'
  }
}

const setIsKoSubtitle = (state, val) => {
  state.isKoSubtitle = val
}

const setIdb = (state, val) => {
  state.idb = val
}

const setIsIdb = (state, val) => {
  state.isIdb = val
}

const setChannelName = (state, val) => {
  state.channelName = val
}

const setLocalStorageChannelName = (state, val) => {
  localStorage.channelName = val
}

const getLocalStorageChannelName = (state) => {
  if (localStorage.channelName) {
    state.channelName = localStorage.channelName
  }
}

const setTitle = (state, val) => {
  state.title = val
}

const setLocalStorageTitle = (state, val) => {
  localStorage.title = val
}

const getLocalStorageTitle = (state) => {
  if (localStorage.title) {
    state.title = localStorage.title
  }
}

const setGapScroll = (state, val) => {
  state.gapScroll = val
}

export {
  setShowMediaLoading, setShowLoading, setShowDataLoading, setShowError, setDuration,
  setIsFullScreen, setCurrentTime, setPlay, setShowMessage, setViewMediaContr,
  setContrViewSectionContr, setLocalStorageContrViewSectionContr,
  getLocalStorageContrViewSectionContr, setContrViewRepeat, setMedia, setIsMedia,
  setLocalStorageContrViewRepeat, getLocalStorageContrViewRepeat,
  getLocalStorageContrViewPlay, setContrViewPlay, setLocalStorageContrViewPlay,
  getLocalStorageContrViewSectionRepeat, setContrViewSectionRepeat,
  setLocalStorageContrViewSectionRepeat, getLocalStorageIsSectionRepeat,
  setIsSectionRepeat, setLocalStorageIsSectionRepeat,
  removeLocalStorageSubtitle, removeLocalStorageObjectURL, setShowModalVideo,
  setSubcount, setLocalStorageSubcount, getLocalStorageSubcount,
  setDeviceType, setObjectURL, setLocalStorageObjectURL, getLocalStorageObjectURL,
  setShowModalSetting, getLocalStorageSubtitle, getLocalStorageShowSubtitle, setSubtitle,
  setKoSubtitle, setLocalStorageKoSubtitle, getLocalStorageKoSubtitle,
  setIsSubtitle, setShowSubtitle, setLocalStorageSubtitle, setShowModalSubtitle,
  detectOrientation, onMouseMove, showMediaControl, setYoutubeId,
  subtitleStart, subtitleEnd, setVideoMode, setYsubcount, setLocalStorageYsubcount,
  getLocalStorageYsubcount, setLocalStorageYoutubeId, setLocalStorageCurrentTime,
  setTimer, clearTimer, setLocalStorageVideoMode, getLocalStorageVideoMode,
  getLocalStorageYoutubeId, setLanguage, setContrViewSubConverter,
  setLocalStorageContrViewSubConverter, getLocalStorageContrViewSubConverter,
  setIsKoSubtitle, setIdb, setIsIdb, setChannelName, setLocalStorageChannelName,
  getLocalStorageChannelName, setTitle, setLocalStorageTitle, getLocalStorageTitle,
  setGapScroll
}
