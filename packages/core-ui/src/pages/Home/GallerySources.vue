<template>
  <div>
    <Gallery>
      <div>
        <GalleryList>
          <GalleryListItem v-for="(i, idx) in baseFiles" :key="idx">
            <div @click="modal.show = true; modal.source=i">
              <UIImage
                :imgAttrs="{
                class: 'h-24 md:h-56 w-full object-cover',
                src: i,
                alt: sourceIdx(i) && `Source ${sourceIdx(i)}`
              }"
              />
            </div>
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
import UIImage from '@/components/Image.vue';
import Gallery from '@/components/Gallery.vue';
import GalleryList from '@/components/GalleryList.vue';
import GalleryListItem from '@/components/GalleryListItem.vue';
import GalleryPagination from '@/components/GalleryPagination.vue';
import GallerySourceSelect from '@/components/GallerySourceSelect.vue';
const sourceIdx = (url) => url.slice(url.lastIndexOf('/source-') + 8, url.lastIndexOf('.'))

export default {
  components: {
    UIImage,
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
