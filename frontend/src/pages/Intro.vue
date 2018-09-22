<template>
  <div>
    <Header />
    <Intro />
  </div>
</template>

<script>
  import Header from '@/components/Header/Header'
  import Intro from '@/components/Intro/Intro'

  export default {
    components: {
      'Header': Header,
      'Intro': Intro
    }
  }
</script>
