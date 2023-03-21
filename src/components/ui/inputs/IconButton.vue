<script setup lang="ts">
import { twMerge } from "tailwind-merge";
import { computed } from "vue";

const props = defineProps<{
  variant?: string;
}>();

let baseClasses = `group flex justify-center items-center
    outline-none rounded-full focus:outline-none transition-all
    duration-200`;

const variantClasses = computed(() => {
  if (props.variant === "ghost") {
    return "";
  } else {
    return "focus:bg-gray-50 hover:bg-gray-50 dark:hover:bg-gray-700 dark:focus:bg-gray-600";
  }
});

const classes = twMerge(baseClasses, variantClasses.value);
</script>

<template>
  <button :class="classes">
    <slot></slot>
  </button>
</template>
