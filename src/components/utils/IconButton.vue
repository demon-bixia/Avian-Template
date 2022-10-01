<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
    variant?: string,
}>();
</script>

<template>
    <button v-if="props.variant === 'primary' || !props.variant"
        class="w-7 h-7  flex justify-center items-center outline-none rounded-full focus:outline-none focus:bg-gray-50 hover:bg-gray-50 transition-all duration-200">
        <slot></slot>
    </button>
</template>