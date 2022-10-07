<script setup lang="ts">
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";

const props = defineProps<{
    modelValue?: string | null,
    outline?: boolean,
}>();
</script>

<template>
    <div class="relative">
        <i class="absolute left-0 top-[10.5px] ml-3 text-center">
            <MagnifyingGlassIcon class="w-5 h-5 stroke-2 text-black opacity-90 dark:text-white dark:opacity-70" />
        </i>

        <input type="text" placeholder="Search.." class="w-full h-8 py-3 px-7 border outline-none rounded-sm border-gray-100 dark:border-gray-700
             text-black opacity-60 dark:text-white dark:opacity-70 placeholder:text-black placeholder:opacity-60 dark:placeholder:text-white dark:placeholder:opacity-70
              focus:outline-none  focus:ring focus:ring-indigo-100  duration-200 transition ease-out" :class="props.outline ? ['bg-transparent'] :
              ['bg-gray-100', 'dark:bg-gray-700', 'focus:bg-white', 'dark:focus:bg-gray-800']"
            @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)">
    </div>
</template>