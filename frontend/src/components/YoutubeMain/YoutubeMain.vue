<template>
  <div class="YoutubeMain"
    ref="youtube_main"
    v-infinite-scroll="getCategoryData"
    infinite-scroll-disabled="busy"
    infinite-scroll-distance="50"
  >
    <HeaderInfo :headerInfo="categoryName" />
    <div class="ym-wrapper" ref="youtube-components">
      <YoutubeComponent
        v-for="(data, index) in youtubeData"
        :youtubeData="data"
        :key="index"
      />
    </div>
    <ErrorView :message="errorMessage" />
  </div>
</template>

<script>
  import HeaderInfo from '@/components/Header/HeaderInfo'
  import YoutubeComponent from './YoutubeComponent'
  import ErrorView from '@/components/common/ErrorView'
  import { mapState, mapMutations } from 'vuex'

  export default {
    components: {
      'HeaderInfo': HeaderInfo,
      'YoutubeComponent': YoutubeComponent,
      'ErrorView': ErrorView
    },
    data () {
      return {
        categoryName: this.$route.params.category,
        youtubeData: [
          //  **** Test data ****
          // {
          //   category: 'TV쇼',
          //   channelName: 'REACT',
          //   youtubeId: 'aInPPTiCss0',
          //   title: '10 PHOTOS OF PEOPLE WHO LOOK LIKE OBJECTS w/ ADULTS (React)',
          //   overayTime: '9:12'
          // },
          // {
          //   category: 'TV쇼',
          //   channelName: 'REACT',
          //   youtubeId: 'z2M7eaJHDFA',
          //   title: 'DO TEENS KNOW 90s MUSIC? #20 (REACT: Do They Know It?)',
          //   overayTime: '9:57'
          // },
          // {
          //   category: 'TV쇼',
          //   channelName: 'REACT',
          //   youtubeId: 'Etg0KBE29mY',
          //   title: 'TRY NOT TO AWWW CHALLENGE #4 (ft. FBE Staff)',
          //   overayTime: '9:40'
          // },
          // {
          //   category: 'TV쇼',
          //   channelName: 'REACT',
          //   youtubeId: 'Pvu2yTgOcQY',
          //   title: 'YouTubers React to Try to Watch This Without Laughing or Grinning #18',
          //   overayTime: '9:52'
          // },
          // {
          //   category: 'TV쇼',
          //   channelName: 'REACT',
          //   youtubeId: '5bTQ7hxMWL0',
          //   title: 'KIDS EAT CANADIAN FOOD | Kids Vs. Food',
          //   overayTime: '7:13'
          // },
          // {
          //   category: 'TV쇼',
          //   channelName: 'REACT',
          //   youtubeId: 'cSyZ4Ic2WLA',
          //   title: 'DOMINOES RELAY CHALLENGE! (ft. Hevesh5)',
          //   overayTime: '11:54'
          // },
          // {
          //   category: 'TV쇼',
          //   channelName: 'REACT',
          //   youtubeId: 'ESqKPPH7apc',
          //   title: 'ELDERS PLAY FNAF: ULTIMATE CUSTOM NIGHT | Five Nights at Freddy\'s (Elders React: Gaming)',
          //   overayTime: '8:49'
          // },
          // {
          //   category: 'TV쇼',
          //   channelName: 'REACT',
          //   youtubeId: 'Uz6h5wr8Zsg',
          //   title: 'TEENS READ 10 FUNNY TEST ANSWERS #2 (REACT)',
          //   overayTime: '5:56'
          // }
        ],
        errorMessage: '데이터를 불러오는데 실패하였습니다.',
        busy: false,
        isIdbData: false
      }
    },
    computed: {
      ...mapState([
        'showDataLoading',
        'isIdb',
        'idb'
      ])
    },
    watch: {
      '$route' (to, from) {
        const youtubeComponents = this.$refs['youtube-components']
        window.scrollTo(0, 0)
        youtubeComponents.innerHTML = ''
        this.youtubeData = []
        this.busy = false
        this.categoryName = to.params.category
        this.isIdbData = false
        this.setShowError({
          showError: false
        })
        this.getCategoryData()
      },
      isIdb () {
        if (this.categoryName === '최근에 본 영상') {
          this.getRecentData()
        }
      }
    },
    mounted () {
      const intro = this.$refs['youtube_main']
      let is = intro.scrollTop
      let ws = window.scrollY

      window.onscroll = (e) => {
        is = intro.scrollTop
        ws = window.scrollY
        this.setGapScroll(ws - is)
      }
    },
    methods: {
      ...mapMutations([
        'setShowDataLoading',
        'setShowError',
        'setGapScroll'
      ]),
      getCategoryData () {
        this.busy = true
        this.setShowDataLoading(true)
        let url
        let headers
        if (this.categoryName === undefined) {
          url = `/yvideos/${this.youtubeData.length}`
        } else if (this.categoryName === '최근에 본 영상') {
          if (this.isIdb) {
            this.getRecentData()
          }
          return
        } else {
          url = `/yvideos/${this.categoryName}/${this.youtubeData.length}`
        }
        headers = {
          'Accept': 'application/json'
        }
        this.$http({
          method: 'get',
          url,
          headers
        }).then((res) => {
          if (res.data === 'DATA_END' || res.data.length === 0) {
            this.setShowDataLoading(false)
            return
          }
          for (let item in res.data) {
            this.youtubeData.push(res.data[item])
          }
          this.setShowDataLoading(false)
          setTimeout(() => {
            this.busy = false
          }, 1000)
        }).catch(() => {
          this.setShowError({
            showError: true,
            errorMessage: '데이터를 불러오는데 실패하였습니다.',
            errorDelay: 3000
          })
          this.setShowDataLoading(false)
        })
      },
      getRecentData () {
        if (this.isIdbData) {
          this.setShowDataLoading(false)
          return
        }
        this.isIdbData = true
        let tx = this.idb.transaction('yvideos', 'readonly')
        let store = tx.objectStore('yvideos')
        let index = store.index('by_youtubeId')

        let request = index.openCursor()

        request.onsuccess = () => {
          let cursor = request.result
          if (cursor) {
            this.youtubeData.push(cursor.value)
            cursor.continue()
          }
          this.setShowDataLoading(false)
        }

        request.onerror = event => {
          this.setShowDataLoading(false)
          console.error(request.error)
        }

        tx.onabort = () => {
          this.setShowDataLoading(false)
          console.error(tx.error)
        }
      }
    }
  }
</script>

<style>
  @import '../../styles/components/YoutubeMain/YoutubeMain.css'
</style>
