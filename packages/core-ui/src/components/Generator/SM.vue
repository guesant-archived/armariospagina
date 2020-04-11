<template>
  <li class="mb-1">
    <div class="flex items-center bg-gray-800 p-2">
      <i class="material-icons">filter_frames</i>
      <i class="material-icons hidden">photo_size_select_large</i>

      <p class="ml-1">
        <span>Source #{{ (sourceidx+1).toString().padStart(dataSources.length.toString().length+1, '0') }}</span>

        <span class="mx-1">-</span>
        <button v-if="source" @click="resetSource"><span>Resetar</span></button>
        <button v-else>Selecione</button>
      </p>
    </div>
    <div class="bg-gray-900 my-2" v-if="!$store.state.settings.options.canvas">
      <div>
        <div class="flex items-center flex-wrap">
          <SMAddFx :sourceidx="sourceidx" />
        </div>
        <div>
          <ul>
            <SMEditFx
              v-for="(fx, fxidx) in dataSources[sourceidx].preFx || []"
              :key="`fx-${sourceidx}-${fxidx}`"
              :fx="fx"
              :fxidx="fxidx"
              :sourceidx="sourceidx"
            />
          </ul>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import SMAddFx from '@/components/Generator/SMAddFx.vue';
import SMEditFx from '@/components/Generator/SMEditFx.vue';

export default {
  components: {
    SMAddFx,
    SMEditFx,
  },
  props: {
    sourceidx: {
      required: true,
      type: Number
    }
  },
  computed: {
    ...mapGetters({
      dataSources: 'generator/dataSources',
      sources: 'generator/sources'
    }),
    source() {
      return this.sources[this.sourceidx] || '';
    }
  },
  methods: {
    ...mapActions('generator', ['updateSources']),
    resetSource() {
      const sources = [...this.sources];
      sources[this.sourceidx] = '';
      this.updateSources(sources);
    }
  }
}
</script>
