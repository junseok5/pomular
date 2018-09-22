<template>
    <div class="Intro" ref="intro">
        <div class="Intro__logo">
            <img src="../../assets/logo_pomular_8_128.png" draggable="false" />
            <span>Pomular</span>
        </div>
        <div class="Intro__about">
            <div class="Intro__about_content">
                <div class="about_comment">
                    <h1>
                        영어 스피킹 공부는 Pomular에서!
                    </h1>
                    <p>
                        Pomular는 영화, 미드, 유튜브 영상으로 스피킹을 공부하도록 도와줍니다.
                    </p>
                    <p>
                        영화나 미드로 회화 공부를 하려면 배우가 대화를 시작하는 부분을 계속 반복해서 보고 들어야합니다.
                        그러기 위해선 일반 미디어로는 몇 초 전으로 되돌려야 하거나 편리하게 대화가 시작하는 지점으로 갈 수 있는
                        방법이 없습니다. Pomular는 클릭 한 번으로 대화 시작 부분으로 되돌려 주어 편리하게 회화
                        공부를 하는 환경을 조성합니다.
                    </p>
                    <p>
                        기존 영어 스피킹 공부 서비스의 지나친 유료 결제 서비스에 부정적인 시선을 가지게 되면서 직접 개발하여 무료로 배포한 서비스입니다.
                    </p>
                    <p>
                        언제나 무료로 계속 유지할 것을 약속 드립니다. 기능 개선 사항은 아래 메일 주소로 연락 주시면 감사합니다. :)
                    </p>
                </div>
                <div class="_toHome" @click="linkToMyVideo">
                    <span>공부하러 가기</span>
                </div>
            </div>
        </div>

        <div class="Intro__info">
            <div class="inc Intro__open" @click="linkToMyVideo">
                <div class="open_comp">
                    <img src="../../assets/my_video.png" width="100" draggable="false" />
                    <h2>영화, 미드로 공부</h2>
                </div>
            </div>
            <div class="inc Intro__open" @click="linkToYoutube">
                <div class="open_comp">
                    <img src="../../assets/youtube_logo.jpg" width="100" draggable="false" />
                    <h2>400편 이상의 유튜브 영상</h2>
                </div>
            </div>
            <div class="inc Intro__open" @click="linkToGithub">
                <div class="open_comp">
                    <img src="../../assets/github_logo.png" width="100" draggable="false" />
                    <h2>오픈소스 프로젝트</h2>
                </div>
            </div>
        </div>

        <div class="Intro_facebook_page">
            <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fpomular&tabs&width=340&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false&appId=1726723337618733" width="340" height="130" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe>
        </div>

        <div class="Intro__contact">
            <div class="_copyright">
                Copyright © 2018 Pomular
            </div>
            <div class="_contact">
                <font-awesome-icon icon="envelope" />
                vkehrkrl82@gmail.com
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState(['gapScroll'])
  },
  mounted () {
    const intro = this.$refs['intro']
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
      'setVideoMode',
      'setLocalStorageVideoMode',
      'setGapScroll'
    ]),
    linkToGithub () {
      window.open('https://github.com/junseok5/pomular')
    },
    linkToMyVideo () {
      this.setVideoMode('my')
      this.setLocalStorageVideoMode()
      this.$router.push('/')
    },
    linkToYoutube () {
      this.$router.push('/list')
    }
  }
}
</script>

<style>
@import '../../styles/components/Intro/Intro.css';
</style>