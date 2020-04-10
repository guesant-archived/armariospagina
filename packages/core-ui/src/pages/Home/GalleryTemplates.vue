<template>
  <div>
    <Gallery>
      <template v-slot:before>
        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold">SELECIONE UM TEMPLATE</h1>
        </div>
      </template>

      <div>
        <GalleryList>
          <GalleryListItem v-for="(i, idx) in baseFiles" :key="idx" :liIndex="idx+1">
            <img
              @click="setTemplate(i)"
              class="h-full w-full object-cover"
              :src="i"
              :alt="`Source ${idx+1}`"
            />
          </GalleryListItem>
        </GalleryList>
      </div>

      <template v-slot:pagination>
        <GalleryPagination
          :currentPage="currentPage"
          :totalPages="lastPage"
          @input="changePage({ resource: 'templates', page: $event })"
        />
      </template>
    </Gallery>
  </div>
</template>

<script>
import unfetch from 'unfetch';
import { mapState, mapActions } from 'vuex';
import Gallery from '@/components/Gallery.vue';
import GalleryList from '@/components/GalleryList.vue';
import GalleryListItem from '@/components/GalleryListItem.vue';
import GalleryPagination from '@/components/GalleryPagination.vue';

export default {
  components: {
    Gallery,
    GalleryList,
    GalleryListItem,
    GalleryPagination
  },
  computed: {
    lastPage() {
      return this.$store.getters['gallery/lastPage']('templates')
    },
    ...mapState('gallery', {
      currentPage: state => (state.pagination.templates || {}).currentPage || 1,
      baseFiles: state => (state.pagination.templates || {}).files || [],
    })
  },
  methods: {
    ...mapActions('gallery', [
      'changePage'
    ]),
    ...mapActions('generator', [
      'loadTemplate'
    ]),
    async setTemplate(i) {
      const element = document.getElementById("generatorcore");
      element.scrollIntoView({ behavior: "smooth", block: "center" });

      const { VUE_APP_GALLERY_URL } = process.env;

      const idx = i.slice(i.lastIndexOf('/base-') + 6, i.lastIndexOf('.'))
      const templateBase = `${VUE_APP_GALLERY_URL}/gallery/templates`;
      const url = `${templateBase}/template-${idx}.json`;

      this.$store.commit('generator/setMessage', 'Carregando template...');
      const template = await unfetch(url).then(r => r.json());

      template.base = template.base.replace('@gallery.templates@', `${templateBase}/`);
      template.sources = template.sources.map(source => {
        const sourceCopy = { ...source };
        sourceCopy.compose.start = [+sourceCopy.compose.start[0], +sourceCopy.compose.start[1]]
        sourceCopy.compose.end = [+sourceCopy.compose.end[0], +sourceCopy.compose.end[1]]

        return sourceCopy;
      })
      this.loadTemplate(JSON.stringify(template));
      this.$store.commit('generator/setMessage', '');
    }
  }
}
</script>
