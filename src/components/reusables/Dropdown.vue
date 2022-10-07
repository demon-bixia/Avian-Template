<script setup lang="ts">
import { onMounted, onUnmounted, } from "vue";
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';

import ScaleTransition from "./transitions/ScaleTransition.vue";

const props = defineProps<{
    show: boolean,
    handleClickOutside: any,
    preventClickOutside?: boolean
    cordinates?: { left?: string, right?: string, top?: string, bottom?: string },
    position: string[],
    closeDropdown: () => void
}>();

// (event) close dropdown when typing esc button
const handleCloseOnEscape = (event: KeyboardEvent) => {
    if (['Escape', 'Esc'].includes(event.key)) {
        props.closeDropdown();
    }
};

// set the handleCloseOnEscape when mounting the component
onMounted(() => {
    document.addEventListener('keydown', handleCloseOnEscape);
});

onUnmounted(() => {
    document.removeEventListener('keydown', handleCloseOnEscape);
});

</script>

<template>
    <div>
        <div v-if="props.show" class="fixed left-0 top-0 z-[5] w-full h-full"> </div>

        <ScaleTransition>
            <div :class="props.position" :style="props.cordinates" v-show="props.show"
                v-click-outside="props.handleClickOutside" class="absolute z-[10] w-[200px] mt-2 rounded-sm bg-white dark:bg-gray-800 shadow-lg
                border border-gray-100 dark:border-gray-600 focus:outline-none" role="menu" aria-orientation="vertical"
                aria-labelledby="menu-button" tabindex="-1">
                <div role="none">
                    <slot></slot>
                </div>
            </div>
        </ScaleTransition>
    </div>
</template>