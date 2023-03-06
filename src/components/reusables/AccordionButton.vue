<script setup lang="ts">
import { ChevronRightIcon } from "@heroicons/vue/24/outline";

const props = defineProps<{
  collapsed: boolean;
  chevron?: boolean;
}>();
</script>

<template>
  <!--accordion toggle button-->
  <button role="listitem" :aria-expanded="!props.collapsed">
    <!--title-->
    <div class="grow text-start">
      <slot></slot>
    </div>
    <!--dropdown button icon-->
    <ChevronRightIcon
      v-if="props.chevron"
      class="w-5 h-5 stoke-1 text-black opacity-70 dark:text-white dark:opacity-70 transition-all duration-300"
      :class="{ 'rotate-90': !props.collapsed }"
    />
  </button>
</template>
