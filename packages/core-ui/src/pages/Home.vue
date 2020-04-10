<template>
  <div class="font-app bg-gray-900 text-white">
    <Intro />
    <Generator />
    <About />
    <Footer />
  </div>
</template>

<script>
import About from '@/pages/Home/About.vue';
import Intro from '@/pages/Home/Intro.vue';
import Generator from '@/pages/Home/Generator.vue';
import Footer from '@/pages/Home/Footer.vue';

export default {
  components: {
    About,
    Intro,
    Generator,
    Footer
  }
}
</script>