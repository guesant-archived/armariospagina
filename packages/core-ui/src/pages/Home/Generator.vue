<template>
  <div>
    <GalleryTemplates />
    <GeneratorCore id="generatorcore" />
    <GallerySources />
  </div>
</template>

<script>
import GalleryTemplates from '@/pages/Home/GalleryTemplates.vue';
import GallerySources from '@/pages/Home/GallerySources.vue';
import GeneratorCore from '@/pages/Home/GeneratorCore.vue';

export default {
  components: {
    GalleryTemplates,
    GallerySources,
    GeneratorCore
  },
  async mounted() {
    await this.$store.dispatch('gallery/loadInfo');
  }
}
</script>