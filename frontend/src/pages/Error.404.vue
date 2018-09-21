<template>
  <div>
    <Header />
    <div class="content">
      <h2>Error: 404 <br />
        페이지를 찾을 수 없습니다.
      </h2>
      <button class="po-button" @click="goBack">돌아가기</button>
    </div>
    <Tabs />
  </div>
</template>

<script>
  import Header from '../components/Header/Header.vue'
  import Tabs from '../components/Tabs/Tabs'
  import ModalSetting from '../components/Modal/ModalSetting.vue'

  export default {
    components: {
      'Header': Header,
      'Tabs': Tabs,
      'ModalSetting': ModalSetting
    },
    methods: {
      goBack () {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
  .content {
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
  }
</style>
