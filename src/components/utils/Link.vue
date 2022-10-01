<script setup lang="ts">
import { defineProps } from "vue";
import Typography from "./Typography.vue";

const props = defineProps<{
    variant?: string,
    href: string,
}>();
</script>

<template>
    <a :href="props.href">
        <Typography :variant="props.variant">
            <slot></slot>
        </Typography>
    </a>
</template>