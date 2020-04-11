<template>
  <div
    v-show="value"
    class="fixed inset-0 z-10 flex items-center justify-center w-full h-full bg-gray-900 feijao"
    :style="{ backgroundImage: `url('${source}')` }"
  >
    <div class="mx-auto px-4 flex flex-col bg-gray-900 p-4">
      <div class="sr-only">
        <img class="h-40 h-40 object-contain" :src="source" :alt="`Source ${1}`" />
      </div>
      <div class>
        Utilizar esta source em:
        <select class="text-black" v-model="selection">
          <option
            v-for="(source, sourceidx) in sources"
            :key="Math.random(source)"
            :value="`s-${sourceidx}`"
          >Slot #{{sourceidx+1}}</option>
        </select>
      </div>
      <div class="mt-4 self-end">
        <button class="font-bold text-xs p-4 bg-gray-900 ml-1" @click="close">Cancelar</button>
        <button class="font-bold text-xs p-4 bg-gray-800" @click="setSource">Ok</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  props: {
    value: {
      type: Boolean,
      required: true
    },
    source: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      sources: 'generator/sources'
    }),
  },
  data() {
    return {
      selection: '',
    }
  },
  methods: {
    ...mapActions('generator', ['updateSources']),
    close() {
      this.$emit('input', false);
    },
    async setSource() {
      const sources = Array.from(this.sources);
      sources[+this.selection.slice(2)] = this.source;
      this.updateSources(sources);
      this.close();
      const element = document.getElementById("generatorcore");
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }
}
</script>

<style lang="scss" scoped>
.feijao {
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
