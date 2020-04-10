<template>
  <div>
    <Gallery>
      <div>
        <GalleryList>
          <GalleryListItem v-for="(i, idx) in baseFiles" :key="idx">
            <img
              class="h-full w-full object-cover"
              :src="i"
              :alt="`Source ${sourceIdx(i)}`"
              @click="modal.show = true; modal.source=i"
            />
          </GalleryListItem>
        </GalleryList>
      </div>

      <template v-slot:pagination>
        <GalleryPagination
          :currentPage="currentPage"
          :totalPages="lastPage"
          @input="changePage({ resource: 'sources', page: $event })"
        />
      </template>
    </Gallery>

    <GallerySourceSelect v-model="modal.show" :source="modal.source" />
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';
import Gallery from '@/components/Gallery.vue';
import GalleryList from '@/components/GalleryList.vue';
import GalleryListItem from '@/components/GalleryListItem.vue';
import GalleryPagination from '@/components/GalleryPagination.vue';
import GallerySourceSelect from '@/components/GallerySourceSelect.vue';
const sourceIdx = (url) => url.slice(url.lastIndexOf('/source-') + 8, url.lastIndexOf('.'))

export default {
  components: {
    Gallery,
    GalleryList,
    GalleryListItem,
    GalleryPagination,
    GallerySourceSelect
  },
  computed: {
    lastPage() {
      return this.$store.getters['gallery/lastPage']('sources')
    },
    ...mapGetters({
      sources: 'generator/sources'
    }),
    ...mapState('gallery', {
      currentPage: state => (state.pagination.sources || {}).currentPage || 1,
      baseFiles: state => (state.pagination.sources || {}).files || [],
    })
  },
  data() {
    return {
      modal: {
        show: false,
        source: ''
      }
    }
  },
  methods: {
    sourceIdx,
    ...mapActions('gallery', [
      'changePage'
    ]),
  }
}
</script>
