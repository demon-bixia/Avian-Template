<script setup lang="ts">
import { ChevronRightIcon } from "@heroicons/vue/24/outline";
import type { Component } from "vue";

import SwitchInput from "./SwitchInput.vue";
import Typography from "./Typography.vue";

const props = defineProps<{
    link?: boolean,
    icon?: Component,
    title?: string,
    chevron?: boolean,
    switch?: boolean,
    danger?: boolean,
}>();
</script>

<template>
    <!--info button-->
    <button v-if="props.link" class="group w-full flex items-center outline-none"
        @click="$emit('active-page-change', {tabName: 'members', animationName: 'slide-left'})">
        <component :is="props.icon" class="w-[20px] h-[20px] mr-6 0 transition-all duration-200"
            :class="props.danger ? ['text-red-300', 'group-hover:text-red-400', 'dark:text-red-400', 'opacity-100']: ['text-gray-300', 'group-hover:text-indigo-300', 'group-active:text-indigo-40']" />

        <div class="grow flex justify-start items-start">
            <Typography variant="body-2" class="transition-all duration-200"
                :class="props.danger ? ['text-red-300' ,'group-hover:text-red-400',  'dark:text-red-400', 'opacity-100']: ['group-hover:text-indigo-300 ','group-hover:opacity-100' ,'group-active:text-indigo-400']">
                {{props.title}}
            </Typography>
        </div>

        <ChevronRightIcon v-if="props.chevron"
            class="w-[20px] h-[20px] text-gray-300 group-hover:text-indigo-300 group-active:text-indigo-400 duration-200" />
    </button>

    <!--info item-->
    <div v-else class="w-full  flex items-center">
        <component :is="props.icon" class="w-[20px] h-[20px] mr-6 text-gray-300 group-hover:text-indigo-300" />

        <div class="grow flex justify-start items-start">
            <Typography variant="body-2">
                {{props.title}}</Typography>
        </div>

        <SwitchInput v-if="props.switch" :value="true" :small="true" />
    </div>
</template>