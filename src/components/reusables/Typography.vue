<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
    variant?: string,
    noColor?: boolean
}>();

const classes = computed(() => {
    // heading text
    if (props.variant === 'heading-1') {
        return ['outline-none text-black opacity-60 dark:text-white dark:opacity-70  text-xl leading-4 tracking-[0.16px]'];
    }

    else if (props.variant === 'heading-2' && !props.noColor) {
        return ['outline-none text-sm text-black opacity-60 dark:text-white dark:opacity-70 font-semibold leading-4 tracking-[0.16px]'];
    }

    else if (props.variant === 'heading-2' && props.noColor) {
        return ['outline-none text-sm font-semibold leading-4 tracking-[0.16px]'];
    }

    else if (props.variant === 'heading-3') {
        return ['outline-none text-xs text-black opacity-50 dark:text-white dark:opacity-70 font-semibold leading-4 tracking-[0.16px]'];
    }

    else if (props.variant === 'heading-4' && !props.noColor) {
        return ['outline-none text-3xl text-black opacity-50 dark:text-white dark:opacity-70 leading-9 tracking-[0.16px]'];
    }

    else if (props.variant === 'heading-4' && props.noColor) {
        return ['outline-none text-3xl leading-9 tracking-[0.16px]'];
    }

    // body text
    else if (props.variant === 'body-1' && !props.noColor) {
        return ['outline-none text-xs text-black opacity-60 dark:text-white dark:opacity-70 font-light leading-4 tracking-[0.16px]'];
    }

    else if (props.variant === 'body-1' && props.noColor) {
        return ['outline-none text-xs font-light leading-4 tracking-[0.16px]'];
    }

    else if (props.variant === 'body-2' && !props.noColor || !props.variant) {
        return ['outline-none text-sm text-black opacity-60 dark:text-white dark:opacity-70 font-normal leading-4 tracking-[0.16px]'];
    }

    else if (props.variant === 'body-2' && props.noColor || !props.variant) {
        return ['outline-none text-sm font-normal leading-4 tracking-[0.16px]'];
    }

    else if (props.variant === 'body-3' && !props.noColor || !props.variant) {
        return ['outline-none text-sm font-light text-black opacity-60 dark:text-white dark:opacity-70 leading-4 tracking-[0.16px]'];
    }

    else if (props.variant === 'body-3' && props.noColor || !props.variant) {
        return ['outline-none text-sm font-light leading-4 tracking-[0.16px]'];
    }

    else if (props.variant === 'body-4' && !props.noColor || !props.variant) {
        return ['outline-none text-xs font-light text-black opacity-60 dark:text-white dark:opacity-70 leading-4 tracking-[0.16px]'];
    }

    else if (props.variant === 'body-4' && props.noColor || !props.variant) {
        return ['outline-none text-xs font-light leading-4 tracking-[0.16px]'];
    }

    // display text
    else if (props.variant === 'display' && !props.noColor) {
        return ['outline-none font-display text-3xl text-black opacity-60 dark:text-white dark:opacity-70 leading-[64px] tracking-[0px]'];
    }

    else if (props.variant === 'display' && props.noColor) {
        return ['outline-none font-display text-3xl leading-[64px] tracking-[0px]'];
    }
});
</script>

<template>

    <p :class="classes">
        <slot></slot>
    </p>

</template>