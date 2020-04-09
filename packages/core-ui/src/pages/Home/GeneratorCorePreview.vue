<template>
  <div>
    <div class="font-bold p-3 pb-0">
      <p>PREVIEW</p>
    </div>

    <div class="p-3">
      <div v-if="generator.selectedTemplate.data">
        <div class="flex justify-center pt-2">
          <img class="object-contain h-40 bg-black" :src="generator.preview" />
        </div>
        <div class="flex justify-center">
          <button class="font-bold text-xs p-4 rounded">Baixar Imagem</button>
        </div>
      </div>
      <div v-else>
        <p>Envie um template de seu dispositivo ou selecione um da galeria.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  computed: mapState(['generator']),
  methods: {
    ...mapActions({
      resetTemplate: 'generator/resetTemplate'
    })
  }
}
</script>
