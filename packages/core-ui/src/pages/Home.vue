<template>
  <div class="font-app bg-gray-900 text-white">
    <Intro />
    <Footer />
  </div>
</template>

<script>
import Intro from '@/pages/Home/Intro.vue';
import Footer from '@/pages/Home/Footer.vue';

export default {
  components: {
    Intro,
    Footer
  }
}
</script>