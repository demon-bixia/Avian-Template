<script setup lang="ts">
import type { Ref } from "vue";

import { twMerge } from "tailwind-merge";
import { ref, computed } from "vue";

import { MagnifyingGlassIcon, XCircleIcon } from "@heroicons/vue/24/outline";
import IconButton from "@src/components/ui/inputs/IconButton.vue";

const props = defineProps<{
  variant?: string;
  class?: string;
}>();

const input: Ref<HTMLInputElement | null> = ref(null);

const baseClasses = `w-full h-8 py-3 px-7 border outline-none rounded-sm text-black
dark:text-white dark:opacity-70 placeholder:text-black placeholder:opacity-40
dark:placeholder:text-white dark:placeholder:opacity-70 focus:outline-none 
focus:ring focus:ring-indigo-100 duration-200 transition ease-out
text-opacity-70`;

const variantClasses = computed(() => {
  if (props.variant === "outline") {
    return "bg-transparent border-gray-100 dark:border-gray-600";
  } else {
    return "border-none bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-800";
  }
});

const classes = twMerge(baseClasses, variantClasses.value, props.class);
</script>

<template>
  <div class="relative">
    <i class="absolute left-0 top-[10.5px] ml-3 text-center">
      <MagnifyingGlassIcon
        class="w-5 h-5 stroke-2 text-black opacity-40 dark:text-white dark:opacity-70"
      />
    </i>
    <input
      ref="input"
      type="text"
      placeholder="Search.."
      :class="classes"
      @input="$event => {
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      }
      "
    />
    <div class="absolute top-0 right-0">
      <slot name="endAdornment">
        <IconButton
          v-if="input && input.value"
          @click="
            ($event) => {
              if (input) input.value = '';
              $emit('update:modelValue', '');
            }
          "
          title="clear text"
          aria-label="clear text"
          class="m-[8px] p-2"
        >
          <XCircleIcon
            class="w-5 h-5 text-black opacity-40 dark:text-white dark:opacity-60"
          />
        </IconButton>
      </slot>
    </div>
  </div>
</template>
