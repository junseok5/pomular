<template>
  <div class="Category">
    <HeaderInfo headerInfo="카테고리" />
    <div class="m-category-list">
      <router-link :to="category.link" v-bind:key="index" v-for="(category, index) in categoryData">
        <div class="m-category">
          {{ category.name }}
        </div>
      </router-link>
    </div>
    <ModalSetting />
    <Tabs />
  </div>
</template>

<script>
  import HeaderInfo from '@/components/Header/HeaderInfo'
  import Tabs from '@/components/Tabs/Tabs'
  import ModalSetting from '@/components/Modal/ModalSetting.vue'

  export default {
    components: {
      'HeaderInfo': HeaderInfo,
      'Tabs': Tabs,
      'ModalSetting': ModalSetting
    },
    data () {
      return {
        categoryData: [
          {
            name: '최근에 본 영상',
            link: '/list/최근에 본 영상'
          },
          {
            name: '강연',
            link: '/list/강연'
          },
          {
            name: '토크쇼',
            link: '/list/토크쇼'
          },
          {
            name: 'TV쇼',
            link: '/list/TV쇼'
          },
          {
            name: '인터뷰',
            link: '/list/인터뷰'
          },
          {
            name: '뉴스',
            link: '/list/뉴스'
          },
          {
            name: '여행',
            link: '/list/여행'
          },
          {
            name: '단편영화',
            link: '/list/단편영화'
          },
          {
            name: '동기부여',
            link: '/list/동기부여'
          },
          {
            name: '뷰티패션',
            link: '/list/뷰티패션'
          },
          {
            name: '실험카메라',
            link: '/list/실험카메라'
          },
          {
            name: '유튜버',
            link: '/list/유튜버'
          },
          {
            name: '영어교육',
            link: '/list/영어교육'
          },
          {
            name: '기타교육',
            link: '/list/기타교육'
          }
        ]
      }
    }
  }
</script>

<style>
@import '../styles/components/Category/Category.css';
</style>
