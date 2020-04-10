<template>
  <div>
    <select class="text-black" v-model="selectedFx" @change="addFx(sourceidx)">
      <option value="display" disabled>Adicionar Efeito</option>
      <optgroup v-for="(items, group) in fxLabels" :key="`${sourceidx}-${group}`" :label="group">
        <option
          v-for="(label, item) in items"
          :key="`${sourceidx}-${group}-${item}`"
          :value="item"
        >{{label}}</option>
      </optgroup>
    </select>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { fxLabels, fxParams } from '@/lib/about-fx';

export default {
  props: {
    sourceidx: {
      required: true,
      type: Number
    }
  },
  computed: {
    ...mapGetters({
      dataSources: 'generator/dataSources'
    }),
  },
  data() {
    return {
      fxLabels,
      selectedFx: 'display',
    }
  },
  methods: {
    ...mapActions('generator', [
      'updateSources'
    ]),
    addFx(sourceidx) {
      const localSources = [...this.dataSources];
      if (!Object.prototype.hasOwnProperty.call(localSources[sourceidx], 'preFx')) {
        localSources[sourceidx].preFx = [];
      }

      localSources[sourceidx].preFx.push(
        [
          this.selectedFx,
          Array((fxParams[this.selectedFx]||[]).length).fill('')
        ]
      );
      this.updateSources(localSources);
      this.selectedFx = 'display';
    },
  }
}
</script>
