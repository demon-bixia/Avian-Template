<script setup lang="ts">
import { defineProps, computed } from "vue";
import { RouterLink } from 'vue-router';

const props = defineProps<{
    loading?: boolean,
    variant?: string,
    color?: string,
    link?: boolean,
}>();

const buttonClasses = computed(() => {
    let classes = ['group', 'p-3', 'flex', 'justify-center', 'items-center',
        'rounded-sm', 'transition-all', 'duration-200', 'ease-out', 'outline-none'];

    // structure
    if (props.variant === 'primary' || !props.variant)
        classes = [...classes, 'bg-green-300', 'dark:bg-green-400', 'active:ring'];

    // color
    if ((props.variant === 'gohst' && props.color === 'primary') || (props.variant === 'gohst' && !props.color))
        classes = [...classes, 'hover:bg-green-50', 'hover:text-green-400', 'active:bg-green-100', 'dark:hover:bg-gray-600'];

    else if (props.variant === 'gohst' && props.color === 'danger')
        classes = [...classes, 'hover:bg-red-50', 'active:bg-red-100', 'dark:hover:bg-red-500', 'dark:active:bg-red-400',];

    else if (props.variant === 'primary' && props.color === 'primary'
        || (!props.variant && props.color === 'primary')
        || (!props.variant && !props.color))
        classes = [...classes, 'active:ring-green-200',
            'focus:outline-none', 'focus:ring', 'focus:ring-green-100'];

    else if (props.variant === 'outlined' && (props.color === 'primary' || !props.color))
        classes = [...classes, 'bg-opacity-0', 'border', 'border-gray-100',
            'hover:border-green-300', 'hover:bg-green-300',
            'dark:hover:border-green-400', 'dark:hover:bg-green-400',
            'dark:focus:border-green-400', 'dark:focus:bg-green-400',

            'active:ring', 'active:ring-green-100',
            'focus:ring', 'focus:ring-green-100', 'focus:bg-green-300'];

    return classes;
});

const textClasses = computed(() => {
    let classes = ['text-sm', 'leading-4', 'tracking-[0.16px]'];

    if (props.variant === 'gohst' && !props.color)
        classes = [...classes, 'text-black', 'opacity-60', 'dark:text-white', 'dark:opacity-70'];

    else if (props.variant === 'gohst' && props.color === 'danger')
        classes = [...classes, 'text-red-400', 'dark:group-hover:text-white']

    else if (props.variant === 'outlined')
        classes = [...classes, 'font-semibold', 'opacity-60',
            'group-hover:text-white', 'group-hover:opacity-100',
            'group-focus:text-white', 'group-focus:opacity-100',
            'dark:text-white', 'dark:opacity-70']


    else if (props.variant === 'primary' || (!props.variant))
        classes = [...classes, 'font-semibold', 'text-white'];

    return classes;
});
</script>

<template>
    <component :is="link ? RouterLink : 'button'" @click="$emit('button-clicked', $event)" tabindex="0"
        :class="buttonClasses">
        <!--loading icon-->
        <svg v-if="props.loading" :class="{'animate-spin': props.loading}" class=" -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
        </svg>

        <!--text-->
        <span v-if="props.loading" :class="textClasses">
            Processing
        </span>

        <span v-else :class="textClasses">
            <slot></slot>
        </span>
    </component>
</template>