<script setup lang="ts">
import { twMerge } from "tailwind-merge";
import { computed } from "vue";

const props = defineProps<{
  variant?: string;
  color?: string;
}>();

let baseClasses = `group flex justify-center items-center
    outline-none rounded-full focus:outline-none transition-all
    duration-200`;

const variantClasses = computed(() => {
  if (props.variant === "ghost") {
    return "";
  } else if (props.variant === "solid") {
    if (props.color === "danger") {
      return "rounded-full outline-none focus:outline-none bg-red-400 hover:bg-red-500 active:bg-red-600 transition-all duration-500 ease";
    } else if (props.color === "success") {
      return "rounded-full outline-none focus:outline-none bg-green-400 hover:bg-green-500 active:bg-green-600 transition-all duration-500 ease";
    } else if (props.color === "glass") {
      return "rounded-full outline-none focus:outline-none bg-gray-100 bg-opacity-[0.2] hover:bg-opacity-[0.3] active:bg-opacity-[0.6] transition-all duration-500 ease";
    } else {
      return "rounded-full outline-none focus:outline-none bg-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600 focus:bg-gray-200 dark:focus:bg-gray-600 active:bg-gray-200 dark:bg-gray-700  dark:active:bg-gray-500 transition-all duration-200";
    }
  } else {
    if (props.color === "danger") {
      return "rounded-full outline-none focus:outline-none hover:bg-red-50 dark:hover:bg-red-500 focus:bg-red-100 dark:focus:bg-red-400 transition-all duration-200";
    } else if (props.color === "primary") {
      return "rounded-full outline-none focus:outline-none hover:bg-indigo-50 dark:hover:bg-gray-500 focus:bg-indigo-100 dark:focus:bg-gray-600 transition-all duration-200";
    } else {
      return "rounded-full outline-none focus:outline-none hover:bg-gray-50 dark:hover:bg-gray-700 focus:bg-gray-50 dark:focus:bg-gray-600 transition-all duration-200";
    }
  }
});

const classes = twMerge(baseClasses, variantClasses.value);
</script>

<template>
  <button :class="classes">
    <slot></slot>
  </button>
</template>
