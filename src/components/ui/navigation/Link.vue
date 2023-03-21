<script setup lang="ts">
import Typography from "@src/components/ui/data-display/Typography.vue";

const props = defineProps<{
  variant?: string;
  noColor?: boolean;
  href: string;
}>();
</script>

<template>
  <a :href="props.href">
    <Typography :variant="props.variant" :no-color="props.noColor">
      <slot></slot>
    </Typography>
  </a>
</template>
