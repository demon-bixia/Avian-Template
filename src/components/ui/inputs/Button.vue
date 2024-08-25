<script setup lang="ts">
import { RouterLink } from "vue-router";

const props = defineProps<{
  loading?: boolean;
  link?: boolean;
  typography?: string;
}>();
</script>

<template>
  <component
    :is="link ? RouterLink : 'button'"
    @click="$emit('button-clicked', $event)"
    tabindex="0"
    class="group btn"
  >
    <!--loading icon-->
    <svg
      v-if="props.loading"
      :class="{ 'animate-spin': props.loading }"
      class="-ml-1 mr-3 h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 01412H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>

    <!--loading text-->
    <template v-if="props.loading"> Processing </template>

    <!--text-->
    <template v-else>
      <slot></slot>
    </template>
  </component>
</template>
