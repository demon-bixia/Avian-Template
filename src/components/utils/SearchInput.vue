<script setup lang="ts">
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
import { defineProps } from "vue";

const props = defineProps<{
    modelValue?: string | null,
    outline?: boolean,
}>();
</script>

<template>
    <div class="relative">
        <i class="absolute left-0 top-[10.5px] ml-3 text-center">
            <MagnifyingGlassIcon class="w-5 h-5 text-black opacity-90" />
        </i>

        <input type="text" placeholder="Search.." class="w-full h-8 py-3 px-7 border outline-none rounded-sm border-gray-100 
             text-black opacity-60 placeholder:text-black placeholder:opacity-60 focus:outline-none 
            focus:bg-white focus:ring focus:ring-indigo-100 duration-200 transition ease-out"
            :class="props.outline ? [] : ['bg-gray-100']"
            @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)">
    </div>
</template>