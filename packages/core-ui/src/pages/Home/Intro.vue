<template>
  <section class="intro-bg">
    <div
      class="content container min-h-screen mx-auto px-4 py-16 flex flex-col justify-center items-center"
    >
      <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold">AmazôniaGenerator</h1>

      <img class="mt-12" v-lazy="asset01" alt="Captura de tela da rede social Facebook que mostra um comentário. 'Armários (ok) amazônia grupo' - Palhaço." />
    </div>

    <div class="intro-bg_filter"></div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      asset01: require('@/assets/images/pho01-print.jpg')
    }
  }
}
</script>

<style lang="scss" scoped>
.intro-bg {
  background: url("~@/assets/images/pho00-bg.jpg") white;
  background-position: center;

  position: relative;
  &_filter {
    content: "";
    display: block;
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: linear-gradient(
      180deg,
      rgba(26, 32, 44, 0.86) 0%,
      #1a202c 100%
    );
  }
  .content {
    position: relative;
    z-index: 1;
  }
}
</style>
