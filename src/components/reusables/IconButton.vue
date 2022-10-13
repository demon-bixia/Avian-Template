<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    variant?: string,
}>();

const classes = computed(() => {
    let classes = ['flex', 'justify-center', 'items-center',
        'outline-none', 'rounded-full', 'focus:outline-none', 'transition-all',
        'duration-200'];

    if (props.variant === 'gohst') {
        classes = [...classes];
    }

    else {
        classes = [...classes, 'p-2', 'focus:bg-gray-50', 'hover:bg-gray-50', 'dark:hover:bg-gray-700', 'dark:focus:bg-gray-600'];
    }

    return classes;
});
</script>

<template>
    <button :class="classes">
        <slot></slot>
    </button>
</template>