<template>
  <div class="flex flex-col items-center py-4 px-4 my-4">
    <ul class="flex flex-wrap mx-6 max-w-full overflow-x-auto">
      <li>
        <button
          class="pagination-button rounded-l"
          :disabled="!isValid(especialOp('first'))"
          @click="especialNavigate('first')"
        >Início</button>
      </li>
      <li>
        <button
          class="pagination-button mr-2"
          :disabled="!isValid(especialOp('prev'))"
          @click="especialNavigate('prev')"
        >Anterior</button>
      </li>

      <li v-for="page in pages" :key="page.key" @click="navigate(page.name)">
        <button class="pagination-button" :class="{ active: isPageActive(page.name) }">{{page.name}}</button>
      </li>

      <li>
        <button
          class="pagination-button ml-2"
          :disabled="!isValid(especialOp('next'))"
          @click="especialNavigate('next')"
        >Próximo</button>
      </li>
      <li>
        <button
          class="pagination-button rounded-r"
          :disabled="!isValid(especialOp('last'))"
          @click="especialNavigate('last')"
        >Fim</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: { type: Number, required: true },
    totalPages: { type: Number, required: true },
    maxVisibleButtons: { type: Number, default: 3 },
  },
  computed: {
    startPage() {
      if (this.currentPage === 1) {
        return 1
      }

      if (this.currentPage === this.totalPages) {
        return this.totalPages - this.maxVisibleButtons + 1;
      }

      return this.currentPage - 1;
    },
    pages() {
      const range = [];

      for (let i = this.startPage;
        i <= Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages); i += 1) {
        range.push({
          key: `pagination_index_${i}_${Math.round(Math.random() * 8)}`,
          name: i,
          isDisabled: i === this.currentPage
        })
      }
      return range;
    }
  },
  methods: {
    isPageActive(page) {
      return this.currentPage === page;
    },
    isValid(page) {
      if (page < 1 || page > this.totalPages) return false;
      return true;
    },
    navigate(page) {
      if (!this.isValid(page)) return;
      this.$emit('input', page);
    },
    especialOp(op) {
      return ({ first: 1, prev: this.currentPage - 1, next: this.currentPage + 1, last: this.totalPages })[op];
    },
    especialNavigate(op) {
      this.navigate(this.especialOp(op));
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination-button {
  @apply font-bold text-xs p-4 bg-gray-800;
}
.pagination-button.active {
  @apply bg-gray-700;
}
.pagination-button[disabled] {
  @apply opacity-50 cursor-not-allowed;
}
</style>
