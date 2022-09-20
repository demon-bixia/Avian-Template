<script setup lang="ts">
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
import { defineProps } from "vue";

const props = defineProps<{
    modelValue?: string | null
}>();
</script>

<template>
    <div class="px-5 pb-5 w-full ">
        <div class="relative">
            <i class="absolute ml-3 text-center left-0 top-[10.5px]">
                <MagnifyingGlassIcon class="w-5 h-5 text-black opacity-90" />
            </i>

            <input type="text" placeholder="Search.." class="max-w-full w-full h-8 py-3 pr-3 pl-7 border border-gray-100 
            rounded-sm content-center text-black opacity-60 placeholder:text-black placeholder:opacity-60 bg-gray-100   focus:outline-none 
            focus:bg-white focus:ring focus:ring-indigo-100
                  duration-200 transition ease-out"
                @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)">
        </div>
    </div>
</template>