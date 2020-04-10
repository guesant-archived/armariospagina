<template>
  <div class="container max-w-5xl mx-auto px-4 flex items-center">
    <div class="w-full border-solid border-4 border-gray-800 flex flex-col sm:flex-row">
      <GeneratorCoreSources class="flex-1" />

      <div class="bg-gray-800 opacity-75 h-1 sm:h-auto sm:w-1 hidden sm:block"></div>

      <GeneratorCorePreview class="flex-1" />

      <div class="bg-gray-800 opacity-75 h-1 sm:h-auto sm:w-1 hidden sm:block"></div>

      <GeneratorCoreSettings class="flex-1" />
    </div>
  </div>
</template>

<script>
import GeneratorCorePreview from "@/pages/Home/GeneratorCorePreview.vue";
import GeneratorCoreSources from "@/pages/Home/GeneratorCoreSources.vue";
import GeneratorCoreSettings from "@/pages/Home/GeneratorCoreSettings.vue";

export default {
  components: {
    GeneratorCorePreview,
    GeneratorCoreSources,
    GeneratorCoreSettings
  }
}
</script>
