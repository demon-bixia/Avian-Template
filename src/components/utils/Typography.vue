<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
    variant?: string,
    noColor?: boolean
}>();
</script>

<template>
    <!--heading text-->
    <p v-if="props.variant === 'heading-1'" class="text-black opacity-60 text-xl leading-4 tracking-[0.16px]">
        <slot></slot>
    </p>

    <p v-else-if="props.variant === 'heading-2' && !props.noColor"
        class="text-sm text-black opacity-60 font-semibold leading-4 tracking-[0.16px]">
        <slot></slot>
    </p>

    <p v-else-if="props.variant === 'heading-2' && props.noColor"
        class="text-sm  font-semibold leading-4 tracking-[0.16px]">
        <slot></slot>
    </p>

    <p v-else-if="props.variant === 'heading-3'"
        class="text-xs text-black opacity-50 font-semibold leading-4 tracking-[0.16px]">
        <slot></slot>
    </p>

    <!--body text-->
    <p v-else-if="props.variant === 'body-1' && !props.noColor"
        class="text-xs text-black opacity-60 font-light leading-4 tracking-[0.16px]">
        <slot></slot>
    </p>

    <p v-else-if="props.variant === 'body-1' && props.noColor" class="text-xs font-light leading-4 tracking-[0.16px]">
        <slot></slot>
    </p>

    <p v-else-if="props.variant === 'body-2' && !props.noColor || !props.variant"
        class="text-sm text-black opacity-60 font-normal leading-4 tracking-[0.16px]">
        <slot></slot>
    </p>

    <p v-else-if="props.variant === 'body-2' && props.noColor || !props.variant"
        class="text-sm font-normal leading-4 tracking-[0.16px]">
        <slot></slot>
    </p>
</template>