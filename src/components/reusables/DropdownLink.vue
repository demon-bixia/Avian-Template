<script setup lang="ts">
const props = defineProps<{
    handleClick?: () => void,
    label?: string
}>();
</script>

<template>
    <button :aria-label="props.label" @click.prevent="props.handleClick" class="w-full px-4 py-3 flex items-center border-b outline-none
        text-sm text-black opacity-60 dark:text-white dark:opacity-70 hover:bg-gray-50  border-gray-200 dark:border-gray-600
          active:bg-gray-100 dark:hover:bg-gray-600 dark:focus:bg-gray-600 transition-all duration-200" role="menuitem"
        id="menu-item-0">
        <slot></slot>
    </button>
</template>