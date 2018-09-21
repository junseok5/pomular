<template>
  <div>
    <Header />
    <IntroTest />
  </div>
</template>

<script>
  import Header from '@/components/Header/Header.vue'
  // import Intro from '@/components/Intro/Intro.vue'
  import IntroTest from '@/components/Intro/Intro_test.vue'
  // import Footer from '@/components/Footer/Footer.vue'

  export default {
    components: {
      'Header': Header,
      'IntroTest': IntroTest
      // 'Footer': Footer
    }
  }
</script>
