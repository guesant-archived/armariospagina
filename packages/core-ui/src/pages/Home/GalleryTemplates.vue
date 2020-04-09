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
            <img class="h-full w-full object-cover" v-lazy="i" :alt="`Source ${idx+1}`" />
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
    ])
  }
}
</script>
