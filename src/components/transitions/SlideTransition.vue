<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
    animation: string
}>();
</script>

<template>
    <Transition :name="props.animation" mode="out-in">
        <slot></slot>
    </Transition>
</template>

<style scoped>
/* slide left */
.slide-left-enter-active {
    transition: all 0.2s;
}

.slide-left-leave-active {
    transition: all 0.2s;
}

.slide-left-enter-from {
    opacity: 0;
    transform: translateX(30px);
}

.slide-left-leave-to {
    opacity: 0;
    transform: translateX(-30px);
}

/* slide right */
.slide-right-enter-active {
    transition: all 0.2s;
}

.slide-right-leave-active {
    transition: all 0.2s;
}

.slide-right-enter-from {
    opacity: 0;
    transform: translateX(-30px);
}

.slide-right-leave-to {
    opacity: 0;
    transform: translateX(30px);
}

/* slide up */
.slide-up-enter-active {
    transition: all 0.2s;
}

.slide-up-leave-active {
    transition: all 0.2s;
}

.slide-up-enter-from {
    opacity: 0;
    transform: translateY(30px);
}

.slide-up-leave-to {
    opacity: 0;
    transform: translateY(30px);
}
</style>