<template>
  <div class="Header" ref="header">
    <div class="logo">
      <router-link to="/">
        <img src="../../assets/logo_pomular_8_128.png" align="center" draggable="false" />
        Pomular
      </router-link>
    </div>
    <div class="menu" ref="menu">
      <ul>
        <li class="menu-intro" @click="clearTimer">
          <router-link to="/intro">소개</router-link>
        </li>
        <li @click="clearTimer">
          <router-link to="/list">채널 목록</router-link>
        </li>
        <li @click="clearTimer">
          <router-link to="/">학습 공간</router-link>
        </li>
        <li class="menu-cog" @click="setShowModalSetting(true)">
          <font-awesome-icon icon="cog" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {
    data () {
      return {
        showMenu: false
      }
    },
    methods: {
      ...mapMutations(['setShowModalSetting']),
      ...mapMutations(['clearTimer'])
    }
  }
</script>

<style scoped>
  @import '../../styles/Header/Header.css';
</style>
