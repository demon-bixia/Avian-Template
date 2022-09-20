<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
    loading?: boolean,
}>();
</script>

<template>
    <button @click="$emit('button-clicked', $event)" class="w-full p-3 rounded-sm bg-indigo-300 mt-2 hover:bg-indigo-400 active:ring 
                active:ring-indigo-200 transition duration-200 ease-out active:bg-indigo-400
                 focus:outline-none focus:ring focus:ring-indigo-100 flex  justify-center items-center" tabindex="0">

        <svg v-if="props.loading" :class="{'animate-spin': props.loading}" class=" -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
        </svg>

        <span v-if="props.loading" class="text-white">Processing</span>
        <span v-else class="text-white">
            <slot></slot>
        </span>
    </button>
</template>