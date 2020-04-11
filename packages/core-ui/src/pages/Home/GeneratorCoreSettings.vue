<template>
  <div>
    <div class="font-bold p-3 pb-0">
      <p>OPÇÕES</p>
    </div>
    <div class="p-3 pt-2">
      <div class="pl-2 flex items-center">
        <input id="check-preview" type="checkbox" v-model="preview" />
        <label for="check-preview" class="py-1 ml-3">Preview Automatico</label>
      </div>
      <div class="pl-2 flex items-center">
        <input id="check-canvas" type="checkbox" v-model="canvas" />
        <label for="check-canvas" class="py-1 ml-3">Renderização Canvas</label>
      </div>

      <div>
        <p
          v-if="!canvas && preview"
          class="italic text-sm my-2"
        >Lembre-se de pagar o Gabriel Agiota em dia KKKKKKkKKésério</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState('settings', {
      'options': 'options',
    }),
    canvas: {
      get() {
        return this.options.canvas
      },
      set(value) {
        this.updateOption({ option: 'canvas', value: value })
      }
    },
    preview: {
      get() {
        return this.options.preview
      },
      set(value) {
        this.updateOption({ option: 'preview', value: value })
      }
    }
  },
  methods: mapActions('settings', ['updateOption'])
}
</script>