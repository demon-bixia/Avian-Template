<script setup lang="ts">
const props = defineProps<{
    variant?: string,
    noColor?: boolean
}>();
</script>

<template>
    <!--heading text-->
    <p v-if="props.variant === 'heading-1'"
        class="outline-none text-black opacity-60 dark:text-white dark:opacity-70  text-xl leading-4 tracking-[0.16px]">
        <slot></slot>
    </p>

    <p v-else-if="props.variant === 'heading-2' && !props.noColor"
        class="outline-none text-sm text-black opacity-60 dark:text-white dark:opacity-70 font-semibold leading-4 tracking-[0.16px]">
        <slot></slot>
    </p>

    <p v-else-if="props.variant === 'heading-2' && props.noColor"
        class="outline-none text-sm font-semibold leading-4 tracking-[0.16px]">
        <slot></slot>
    </p>

    <p v-else-if="props.variant === 'heading-3'"
        class="outline-none text-xs text-black opacity-50 dark:text-white dark:opacity-70 font-semibold leading-4 tracking-[0.16px]">
        <slot></slot>
    </p>

    <p v-else-if="props.variant === 'heading-4' && !props.noColor"
        class="outline-none text-3xl text-black opacity-50 dark:text-white dark:opacity-70 leading-9 tracking-[0.16px]">
        <slot></slot>
    </p>

    <p v-else-if="props.variant === 'heading-4' && props.noColor"
        class="outline-none text-3xl leading-9 tracking-[0.16px]">
        <slot></slot>
    </p>

    <!--body text-->
    <p v-else-if="props.variant === 'body-1' && !props.noColor"
        class="outline-none text-xs text-black opacity-60 dark:text-white dark:opacity-70 font-light leading-4 tracking-[0.16px]">
        <slot></slot>
    </p>

    <p v-else-if="props.variant === 'body-1' && props.noColor"
        class="outline-none text-xs font-light leading-4 tracking-[0.16px]">
        <slot></slot>
    </p>

    <p v-else-if="props.variant === 'body-2' && !props.noColor || !props.variant"
        class="outline-none text-sm text-black opacity-60 dark:text-white dark:opacity-70 font-normal leading-4 tracking-[0.16px]">
        <slot></slot>
    </p>

    <p v-else-if="props.variant === 'body-2' && props.noColor || !props.variant"
        class="outline-none text-sm font-normal leading-4 tracking-[0.16px]">
        <slot></slot>
    </p>

    <p v-else-if="props.variant === 'body-3' && !props.noColor || !props.variant"
        class="outline-none text-sm font-light text-black opacity-60 dark:text-white dark:opacity-70 leading-4 tracking-[0.16px]">
        <slot></slot>
    </p>

    <p v-else-if="props.variant === 'body-3' && props.noColor || !props.variant"
        class="outline-none text-sm font-light leading-4 tracking-[0.16px]">
        <slot></slot>
    </p>

    <p v-else-if="props.variant === 'body-4' && !props.noColor || !props.variant"
        class="outline-none text-xs font-light text-black opacity-60 dark:text-white dark:opacity-70 leading-4 tracking-[0.16px]">
        <slot></slot>
    </p>

    <p v-else-if="props.variant === 'body-4' && props.noColor || !props.variant"
        class="outline-none text-xs font-light leading-4 tracking-[0.16px]">
        <slot></slot>
    </p>


    <!--display text-->
    <p v-else-if="props.variant === 'display' && !props.noColor"
        class="outline-none font-display text-3xl text-black opacity-60 dark:text-white dark:opacity-70 leading-[64px] tracking-[0px]">
        <slot></slot>
    </p>

    <p v-else-if="props.variant === 'display' && props.noColor"
        class="outline-none font-display text-3xl leading-[64px] tracking-[0px]">
        <slot></slot>
    </p>

</template>