<script setup lang="ts">
import { defineProps } from "vue";
import type { Component } from "vue";

const props = defineProps<{
    icon: Component,
    title: string,
    notifications?: number,
    active?: boolean,
}>();
</script>

<template>
    <div class="mb-6">
        <button class="group relative focus:outline-none" :title="props.title">
            <!--icon-->
            <component :is="props.icon"
                class="w-7 h-6 text-gray-300 group-focus:text-indigo-400 hover:text-indigo-400 active:text-indigo-400 active:scale-110 transition ease-out duration-200"
                :class="{'text-indigo-400': (props.active as boolean)}" />

            <!--notification pill-->
            <div v-if="props.notifications"
                class="absolute right-0 top-3 w-5 h-5 flex items-center justify-center bg-indigo-400 text-xs text-white border border-white rounded-full">
                {{props.notifications}}
            </div>
        </button>
    </div>
</template>