<template>
  <div class="Intro">
    <HeaderInfo headerInfo="Pomular" />
    <div class="intro-phrases">
      <h2>
        Pomular는 모든 사람들이 유창하게 영어를 구사할 수 있도록<br />
        교육 시스템을 구축해나가는 것을 목표로 합니다.
      </h2>
      <p>
        이 목표를 향한 첫번째 발걸음이 영어 회화 서비스입니다.<br />
        교육 평등의 기회를 제공하고자 누구나 무료로 이용할 수 있으며,<br />
        사용자와의 지속적인 소통을 통하여
        발전시켜 나갈 계획입니다.
      </p>
    </div>
    <div class="intro-prod">
      <div class="intro-prod-youtube prod">
        <img src="../../assets/youtube_logo.jpg" align="center" draggable="false" />
        <h3>
          재밌는 유튜브 영상으로 공부!
        </h3>
      </div>
      <div class="intro-prod-myvideo prod">
        <img src="../../assets/my_video.png" align="center" draggable="false" />
        <h3>
          나의 미드, 영화 파일로 공부!
        </h3>
      </div>
    </div>
    <div class="intro-st">
      <h3>공부법</h3>
      <p>
        영어 회화 공부의 핵심은 <span>따라하기</span>와 <span>반복</span>입니다. <br />
        여러 영상을 자주 접하며 표현을 한번에 많이 익히려고 한다면 <br />
        회화 실력은 항상 제자리일 것입니다.<br />
        하나의 영상을 정해서 자기 것이 될때까지 수 없이 입으로 소리내어 <br />
        따라하고 반복한다면 자신도 모르게 외국인 앞에서 입이 열릴 것입니다. <br />
        <span>100LS</span> 공부법을 실천하여 유창한 회화 실력을 갖추어 봅시다!<br /><br />
        ※100LS 공부법: <span class="book">[9등급 꼴찌, 1년 만에 통역사 된 비법]</span>에서 장동완씨가 <br />
        처음 소개하였습니다. 하나의 영화를 정해서 대사 한 구간마다 자기 것이 <br />
        될때까지 따라하고 반복하는 것입니다. 그 영화를 총 100번을 보며 따라하기와 <br />
        반복을 실천한다면 유창한 영어 실력을 갖게 된다는 공부법입니다.
      </p>
    </div>
    <div class="intro-htu">
      <h3>모바일 사용법</h3>
      <img src="../../assets/intro1.jpg" draggable="false" />
      <p>크롬으로 접속하여 홈화면에 추가하여 이용할 수 있습니다.</p>
    </div>
    <div class="intro-ref">
      <h2>참고사항</h2>
      <ul>
        <li>· Pomular는 Chrome 브라우저를 기준으로 동작합니다.</li>
        <li>· 자막은 현재 .srt 확장자만 지원합니다. smi 확장자는 변환 후 이용바랍니다.</li>
        <li>· 브라우저의 보안 문제로, 기기에 있는 동영상 파일은 접속 시마다 선택해야합니다.</li>
        <li>· 비디오 URL을 등록한다면 사이트에 접속시 바로 비디오가 로드됩니다.</li>
        <li>· 유튜브 한글 자막은 구글 번역기 API가 사용되었습니다. 참고용으로만 사용하시기 바랍니다.</li>
      </ul>
    </div>
    <Tabs />
  </div>
</template>

<script>
  import HeaderInfo from '../Header/HeaderInfo'
  import Tabs from '../Tabs/Tabs'

  export default {
    components: {
      'Tabs': Tabs,
      'HeaderInfo': HeaderInfo
    }
  }
</script>

<style scoped>
  @import '../../styles/Intro/Intro.css';
</style>
