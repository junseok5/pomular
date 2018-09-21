<template>
  <div class="app fadeIn animated">
    <router-view></router-view>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'

  export default {
    computed: {
      ...mapState(['isFullScreen'])
    },
    created () {
      document.addEventListener('fullscreenchange', () => {
        this.setIsFullScreen(!this.isFullScreen)
      })
      document.addEventListener('webkitfullscreenchange', () => {
        console.log('fullscreenchange event')
        this.setIsFullScreen(!this.isFullScreen)
      })
      document.addEventListener('mozfullscreenchange', () => {
        this.setIsFullScreen(!this.isFullScreen)
      })
      document.addEventListener('MSFullscreenChange', () => {
        this.setIsFullScreen(!this.isFullScreen)
      })
      this.indexedDBInit()
    },
    methods: {
      ...mapMutations([
        'setIdb',
        'setIsIdb',
        'setIsFullScreen'
      ]),
      indexedDBInit () {
        const inexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB
        window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction
        window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

        if (!indexedDB) {
          console.log("Your browser doesn't support a stable version of IndexedDB.")
        }

        let request = inexedDB.open('pomular', 10)

        request.onupgradeneeded = () => {
          let db = request.result
          this.setIdb(db)
          let enStore = db.createObjectStore('en_subtitles', {keyPath: 'youtubeId'})
          enStore.createIndex('by_youtubeId', 'youtubeId', {unique: true})

          let koStore = db.createObjectStore('ko_subtitles', {keyPath: 'youtubeId'})
          koStore.createIndex('by_youtubeId', 'youtubeId', {unique: true})

          let yvideoStore = db.createObjectStore('yvideos', {keyPath: 'youtubeId'})
          yvideoStore.createIndex('by_youtubeId', 'youtubeId', {unique: true})
        }

        request.onsuccess = () => {
          this.setIdb(request.result)
          this.setIsIdb(true)
        }
      }
    }
  }
</script>

<style>
  @import './styles/App.css';
</style>
