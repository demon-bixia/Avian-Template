<script setup lang="ts">
import Typography from "@src/components/ui/data-display/Typography.vue";
</script>

<template>
  <div
    class="w-full min-h-[80px] max-h-fit px-5 py-6 flex justify-between items-center"
  >
    <Typography variant="heading-1" tabindex="0" class="outline-none">
      <slot name="title"></slot>
    </Typography>

    <div>
      <slot name="actions"></slot>
    </div>
  </div>
</template>
