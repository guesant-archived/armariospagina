<template>
  <li class="my-2">
    <span>- {{fx[0]}}</span>

    <input
      class="inline-block w-16 text-black ml-2 text-center"
      v-for="(pm, pmid) in fxInfo"
      :key="`fx-${sourceidx}-${fxidx}-${pm}`"
      :type="pm[1]"
      :placeholder="pm[0]"
      :value="(fx[1]||[])[pmid+1]"
      @change="parameterChange(pmid, $event.target.value)"
    />
    <button class="ml-2" @click="removeFx">- remover</button>
  </li>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { fxParams } from '@/lib/about-fx';

export default {
  props: {
    fx: {
      required: true,
      type: Array
    },
    fxidx: {
      required: true,
      type: Number
    },
    sourceidx: {
      required: true,
      type: Number
    },
  },
  computed: {
    ...mapGetters({
      dataSources: 'generator/dataSources'
    }),
    fxInfo() {
      return fxParams[this.fx[0]]
    }
  },
  methods: {
    ...mapActions('generator', [
      'updateSources'
    ]),
    parameterChange(parameterIdx, value) {
      const localSources = [...this.dataSources];
      const apply = this.fxInfo[parameterIdx][1] || (a => a);

      const fx = this.fx;
      fx[1][parameterIdx] = apply(value);
      localSources[this.sourceidx].preFx[this.fxidx] = fx;

      this.updateSources(localSources);
    },
    removeFx() {
      const localSources = [...this.dataSources];
      localSources[this.sourceidx].preFx.splice(this.fxidx, 1);
      this.updateSources(localSources);
    }
  }
}
</script>
