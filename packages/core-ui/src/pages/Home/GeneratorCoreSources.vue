<template>
  <div>
    <div class="font-bold p-3 pb-0">
      <p>SOURCES</p>
    </div>
    <div class="p-3">
      <div v-if="dataSources.length >= 1">
        <ul>
          <SourceManager v-for="(_, sourceidx) in dataSources"
            :key="`gallery-source-${sourceidx}`" :sourceidx="sourceidx" />
        </ul>
      </div>
      <div v-else>Você pode selecionar sources abaixo ou enviar de seu dispositivo.</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SourceManager from '@/components/Generator/SM.vue';

export default {
  components: {
    SourceManager
  },
  computed: mapGetters({
    dataSources: 'generator/dataSources'
  })
}
</script>
