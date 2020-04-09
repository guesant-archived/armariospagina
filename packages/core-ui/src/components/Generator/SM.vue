<template>
  <li class="mb-1">
    <div class="flex items-center bg-gray-800 p-2">
      <i class="material-icons">filter_frames</i>
      <i class="material-icons hidden">photo_size_select_large</i>
      <p>Source {{ (sourceidx+1).toString().padStart(sources.length.toString().length, '0') }}</p>
    </div>
    <div class="bg-gray-900 my-2">
      <div>
        <div class="flex items-center flex-wrap">
          <SMAddFx :sourceidx="sourceidx" />
        </div>
        <div>
          <ul>
            <SMEditFx
              v-for="(fx, fxidx) in sources[sourceidx].preFx || []"
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
import { mapGetters } from 'vuex';
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
      sources: 'generator/sources'
    }),
  },
}
</script>
