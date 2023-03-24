<script setup lang="ts">
import { CheckIcon } from "@heroicons/vue/24/outline";

const props = defineProps<{
  value: boolean;
  inputId?: string;
  handleCheck?: () => void;
}>();
</script>

<template>
  <div class="relative flex justify-center items-center">
    <input
      :id="props.inputId"
      :class="props.value ? ['bg-indigo-400'] : []"
      type="checkbox"
      @click="
        () => {
          if (props.handleCheck) props.handleCheck();
          $emit('update', !props.value);
        }
      "
      :checked="props.value"
      class="h-5 w-5 appearance-none relative cursor-pointer outline-none rounded-[5px] border border-indigo-400 transition-all duration-300"
    />
    <CheckIcon
      @click="
        () => {
          if (props.handleCheck) props.handleCheck();
          $emit('update', !props.value);
        }
      "
      class="absolute top-[3px] cursor-pointer z-10 left-[2px] w-4 h-4 text-white transition-all duration-300"
      :class="props.value ? [] : ['hidden']"
    />
  </div>
</template>
