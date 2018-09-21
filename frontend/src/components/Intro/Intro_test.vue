<template>
    <div class="Intro">
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
import { mapMutations } from 'vuex'

export default {
  methods: {
    ...mapMutations([
      'setVideoMode',
      'setLocalStorageVideoMode'
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
.Intro {
    text-align: left;
    background: url(../../assets/bg_3.jpg);
    height: 100%;
    box-sizing: border-box;
}

.Intro__logo {
    display: none;
    align-items: center;

    padding: 14px;
}

.Intro__logo img {
    width: 64px;
    height: 64px;
}

.Intro__logo span {
    font-size: 22px;
    font-weight: bold;
    padding: 4px;
}

.Intro__about {
    display: flex;
    justify-content: center;
    align-items: center;
}

.Intro__about_content {
    margin: 56px;
    padding: 14px;
}

.Intro__about_content h1 {
    margin: 0;
    font-size: 2.6rem;
}

.Intro__about_content p {
    font-size: 1.4rem;
}

._toHome {
    display: flex;
    justify-content: center;

    text-align: center;
    font-size: 18px;
    font-weight: bold;

    width: 250px;
    height: 45px;
    line-height: 45px;
    border: 1.5px solid white;

    cursor: pointer;
}

.Intro__info {
    display: flex;
    flex-direction: row;
    justify-content: center;
}

.inc {
    display: flex;
    justify-content: center;
    margin: 14px;

    background-color: rgba(255, 255, 255, 0.2);
    cursor: pointer;
}

.open_comp {
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 160px;
    padding: 14px;
    border-radius: 4px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
}

.open_comp h2 {
    margin: 8px;
}

.Intro_facebook_page {
    display: flex;
    justify-content: center;

    padding: 24px;
}

.Intro__contact {
    text-align: right;
    padding: 14px;
    font-size: 14px;
}

@media screen and (max-width: 800px) {
    .Intro__logo {
        display: flex;
    }

    .Intro__about_content {
        margin: 0;
        padding: 14px;
    }

    ._toHome {
        width: 100%;
    }

    .Intro__info {
        flex-direction: column;
        justify-content: center;
    }

    .open_comp {
        width: 100%;
    }
}
</style>