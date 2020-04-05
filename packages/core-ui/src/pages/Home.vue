<template>
  <div class="font-app bg-gray-900 text-white">
    <Intro />
    <About />
    <Footer />
  </div>
</template>

<script>
import About from '@/pages/Home/About.vue';
import Intro from '@/pages/Home/Intro.vue';
import Footer from '@/pages/Home/Footer.vue';

export default {
  components: {
    About,
    Intro,
    Footer
  }
}
</script>