<script setup lang="ts">
import type { Component } from "vue";
import { computed } from "vue";

import { ChevronRightIcon } from "@heroicons/vue/24/outline";
import SwitchInput from "@src/components/ui/inputs/SwitchInput.vue";

const props = defineProps<{
  link?: boolean;
  icon?: Component;
  title?: string;
  chevron?: boolean;
  switch?: boolean;
  color?: string;
}>();

const colorClasses = computed(() => {
  if (props.color === "danger") {
    return "text-red-400 group-hover:text-red-500";
  } else {
    return `text-black dark:text-white opacity-50 dark:opacity-70
        group-hover:text-indigo-500 group-active:text-indigo-600 
        dark:group-hover:text-indigo-300 dark:group-active:text-indigo-400`;
  }
});
</script>

<template>
  <!--info button-->
  <button
    v-if="props.link"
    class="group w-full flex items-center outline-none"
    @click="
      $emit('active-page-change', {
        tabName: 'members',
        animationName: 'slide-left',
      })
    "
  >
    <component
      :is="props.icon"
      class="w-[1.25rem] h-[1.25rem] mr-6 transition-all duration-200"
      :class="colorClasses"
    />

    <div class="grow flex justify-start items-start">
      <p class="body-2 transition-all duration-200" :class="colorClasses">
        {{ props.title }}
      </p>
    </div>

    <ChevronRightIcon
      v-if="props.chevron"
      class="w-[1.25rem] h-[1.25rem] duration-200"
      :class="colorClasses"
    />
  </button>

  <!--info item-->
  <div v-else class="w-full flex items-center">
    <component
      :is="props.icon"
      class="w-[1.25rem] h-[1.25rem] mr-6 transition-all duration-200"
      :class="colorClasses"
    />

    <div class="grow flex justify-start items-start">
      <p class="body-2" :class="colorClasses">
        {{ props.title }}
      </p>
    </div>

    <SwitchInput v-if="props.switch" :value="true" />
  </div>
</template>
