<script setup lang="ts">
import { defineProps } from "vue";
import ScaleTransition from "../transitions/ScaleTransition.vue";

const props = defineProps<{
    show: boolean,
    handleClickOutside: any,
    preventClickOutside?: boolean
    cordinates?: { left?: string, right?: string, top?: string, bottom?: string },
    position: string[]
}>();

</script>

<template>
    <div>
        <div v-if="props.show" class="fixed left-0 top-0 z-[5] w-full h-full"> </div>

        <ScaleTransition>
            <div :class="props.position" :style="props.cordinates" v-show="props.show"
                v-click-outside="props.handleClickOutside"
                class="absolute z-[10] w-56 mt-2 rounded-sm bg-white shadow-lg ring-1 ring-gray-100 focus:outline-none"
                role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                <div role="none">
                    <slot></slot>
                </div>
            </div>
        </ScaleTransition>
    </div>
</template>