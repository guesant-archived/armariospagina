<template>
  <div>
    <div class="font-bold p-3 pb-0">
      <p>OPÇÕES</p>
    </div>
    <div class="p-3">
      <div class="flex items-center">
        <input id="check-preview" type="checkbox" v-model="preview" />
        <label for="check-preview" class="ml-2">Preview Automatico</label>
      </div>

      <div>
        <p
          class="italic text-sm my-2"
        >Se seu dispositivo for consideravelmente bom, ative a opção acima. Caso contrario, você ponhará fogo nele kk</p>
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