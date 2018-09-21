<template>
  <div>
    <Header />
    <Intro />
    <Footer />
  </div>
</template>

<script>
  import Header from '../components/Header/Header.vue'
  import Intro from '../components/Intro/Intro.vue'
  import Footer from '../components/Footer/Footer.vue'

  export default {
    components: {
      'Header': Header,
      'Intro': Intro,
      'Footer': Footer
    }
  }
</script>
