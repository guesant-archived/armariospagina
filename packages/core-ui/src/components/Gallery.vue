<template>
  <section class="mt-5 py-24">
    <slot name="pagination" />

    <div class="px-4 md:px-16">
      <slot name="before" />

      <slot />
    </div>

    <slot name="pagination" />
  </section>
</template>
