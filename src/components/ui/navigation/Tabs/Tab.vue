<script setup lang="ts">
import Typography from "@src/components/ui/data-display/Typography.vue";

const props = defineProps<{
  active: boolean;
  name: string;
}>();
</script>

<template>
  <button
    class="p-4 flex-auto rounded-sm outline-none focus:outline-none transition-all duration-200"
    :class="
      props.active
        ? ['bg-indigo-400', 'text-white']
        : ['text-black', 'opacity-60', 'dark:text-white', 'dark:opacity-70']
    "
  >
    <Typography no-color variant="body-6">{{ props.name }}</Typography>
  </button>
</template>
