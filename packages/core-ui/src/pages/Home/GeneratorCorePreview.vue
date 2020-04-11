<template>
  <div>
    <div class="font-bold p-3 pb-0">
      <p>PREVIEW</p>
    </div>

    <div class="p-3">
      <div v-if="generator.selectedTemplate.data">
        <div class="flex justify-center pt-2">
          <img class="object-contain h-40 bg-gray-800 w-40" :src="generator.preview" />
        </div>
        <div class="p-2 pt-4">
          <div v-if="generator.message">
            <p class="text-center">{{generator.message}}</p>
          </div>
          <div v-else>
            <div v-if="!generator.selectedTemplate.data.base">
              <p class="text-center font-bold">por favor, selecione um template</p>
            </div>

            <div v-else class="flex justify-center text-center flex-col">
              <a
                class="font-bold text-xs p-2 rounded"
                :download="`armarios-${generator.preview[0]||''}${Math.round(Math.random()*1000000)}.jpg`"
                :href="generator.preview"
              >Baixar Imagem</a>
              <button class="font-bold text-xs p-2 rounded" @click="preview">Atualizar preview</button>
            </div>
          </div>
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
    ...mapActions('generator', [
      'preview',
    ])
  }
}
</script>
