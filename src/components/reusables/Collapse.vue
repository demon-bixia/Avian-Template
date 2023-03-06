<script setup lang="ts">
import CollapseTransition from "./transitions/CollapseTransition.vue";

const props = defineProps<{
  collapsed: boolean;
}>();
</script>

<template>
  <!--collapsed region-->
  <CollapseTransition>
    <div
      v-if="!props.collapsed"
      class="w-full flex flex-col px-5"
      :aria-hidden="props.collapsed"
    >
      <slot></slot>
    </div>
  </CollapseTransition>
</template>
