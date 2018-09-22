<template>
  <div class="YoutubeList">
    <Header />
    <YoutubeMenu :categoryList="categoryList" />
    <YoutubeMain />
    <Tabs />
    <DataLoading />
    <ModalSetting />
  </div>
</template>

<script>
  import Header from '@/components/Header/Header'
  import YoutubeMenu from '@/components/YoutubeMenu/YoutubeMenu'
  import YoutubeMain from '@/components/YoutubeMain/YoutubeMain'
  import Tabs from '@/components/Tabs/Tabs'
  import DataLoading from '@/components/common/DataLoading'
  import ModalSetting from '@/components/Modal/ModalSetting.vue'

  export default {
    components: {
      'Header': Header,
      'YoutubeMenu': YoutubeMenu,
      'YoutubeMain': YoutubeMain,
      'DataLoading': DataLoading,
      'Tabs': Tabs,
      'ModalSetting': ModalSetting
    },
    data () {
      return {
        categoryList: [
          {
            name: '홈',
            path: '/list'
          },
          {
            name: '최근에 본 영상',
            path: '/list/최근에 본 영상'
          },
          {
            name: '강연',
            path: '/list/강연'
          },
          {
            name: '토크쇼',
            path: '/list/토크쇼'
          },
          {
            name: 'TV쇼',
            path: '/list/TV쇼'
          },
          {
            name: '인터뷰',
            path: '/list/인터뷰'
          },
          {
            name: '뉴스',
            path: '/list/뉴스'
          },
          {
            name: '여행',
            path: '/list/여행'
          },
          {
            name: '단편영화',
            path: '/list/단편영화'
          },
          {
            name: '동기부여',
            path: '/list/동기부여'
          },
          {
            name: '뷰티/패션',
            path: '/list/뷰티패션'
          },
          {
            name: '실험카메라',
            path: '/list/실험카메라'
          },
          {
            name: '유튜버',
            path: '/list/유튜버'
          },
          {
            name: '영어교육',
            path: '/list/영어교육'
          },
          {
            name: '기타교육',
            path: '/list/기타교육'
          }
        ]
      }
    }
  }
</script>

<style>
.YoutubeList {
  overflow: hidden;
}
</style>
