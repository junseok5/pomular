<template>
  <div id="home">
    <Header />
    <MediaView />
    <Tabs />
    <ModalSetting />
    <ModalVideo />
    <ModalSubtitle />
    <Loading />
  </div>
</template>

<script>
import Header from '@/components/Header/Header'
import MediaView from '@/components/MediaView/MediaView'
import Tabs from '@/components/Tabs/Tabs'
import ModalSetting from '@/components/Modal/ModalSetting'
import ModalSubtitle from '@/components/Modal/ModalSubtitle'
import ModalVideo from '@/components/Modal/ModalVideo'
import Loading from '@/components/common/Loading'
import { mapState } from 'vuex'

export default {
  name: 'home',
  components: {
    'Header': Header,
    'MediaView': MediaView,
    'Tabs': Tabs,
    'ModalSetting': ModalSetting,
    'ModalSubtitle': ModalSubtitle,
    'ModalVideo': ModalVideo,
    'Loading': Loading
  },
  computed: {
    ...mapState(['deviceType'])
  },
  created () {
    this.$store.commit('setDeviceType')
    this.$store.commit('getLocalStorageShowSubtitle')
    this.$store.commit('getLocalStorageObjectURL')
    this.$store.commit('getLocalStorageIsSectionRepeat')
    this.$store.commit('getLocalStorageContrViewSubConverter')
    this.$store.commit('getLocalStorageContrViewPlay')
    this.$store.commit('getLocalStorageContrViewRepeat')
    this.$store.commit('getLocalStorageContrViewSectionRepeat')
    this.$store.commit('getLocalStorageContrViewSectionContr')
  }
}
</script>
