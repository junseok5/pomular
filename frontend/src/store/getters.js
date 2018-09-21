const subtitleMaxIndex = (state) => {
  return state.subtitle.length - 1
}

const koSubtitleMaxIndex = (state) => {
  return state.koSubtitle.length - 1
}

export { subtitleMaxIndex, koSubtitleMaxIndex }
