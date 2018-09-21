<template>
  <div class="Category">
    <HeaderInfo headerInfo="카테고리" />
    <div class="m-category-list">
      <router-link :to="category.link" v-for="(category, index) in categoryData">
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
  import HeaderInfo from '../components/Header/HeaderInfo'
  import Tabs from '../components/Tabs/Tabs'
  import ModalSetting from '../components/Modal/ModalSetting.vue'

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
  .Category {
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    bottom: 50px;
    overflow-y: auto;
  }

  .m-category-list h3 {
    color: #4374D9;
  }

  .m-category {
    font-weight: bold;
    height: 35px;
    padding-top: 15px;
    border-bottom: 1px solid #5D5D5D;
    /* border-top: 0.5px solid #fff; */
    /* margin: 8px 6px; */
    /* background-color: #3A3A3A; */
  }

  @media screen and (max-width: 700px) {
    .Category {
      padding-top: 43px;
    }
  }
</style>
