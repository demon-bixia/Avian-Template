<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
    handleClick?: () => void,
}>();
</script>

<template>
    <a href="#" @click.prevent="props.handleClick"
        class="border-b border-gray-200 text-black opacity-60 active:bg-gray-100 hover:bg-gray-50 duration-200 px-4 py-3 text-sm flex items-center"
        role="menuitem" tabindex="-1" id="menu-item-0">
        <slot></slot>
    </a>
</template>