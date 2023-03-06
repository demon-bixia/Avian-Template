<script setup lang="ts">
import { CheckIcon } from "@heroicons/vue/24/outline";

const props = defineProps<{
  modelValue: boolean;
}>();
</script>

<template>
  <div class="relative">
    <input
      type="checkbox"
      @input="$emit('update:modelValue', !props.modelValue)"
      :checked="props.modelValue"
      class="h-5 w-5 appearance-none cursor-pointer outline-none rounded-[5px] border border-indigo-400 transition-all duration-300"
      :class="props.modelValue ? ['bg-indigo-400'] : []"
    />
    <CheckIcon
      class="absolute top-[3px] left-[2px] w-4 h-4 text-white transition-all duration-300"
      :class="props.modelValue ? [] : ['hidden']"
    />
  </div>
</template>
