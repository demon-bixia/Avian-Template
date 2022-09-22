<script setup lang="ts">
import { defineProps } from "vue";
import type { Component } from "vue";

const { icon, notifications } = defineProps<{
    icon: Component,
    title: string,
    notifications?: number,
    active?: boolean,
}>();
</script>

<template>
    <div class="mb-6">
        <a href="#" class="relative focus:outline-none group" :title="title">
            <!--icon-->
            <component :is="icon"
                class="w-7 h-6 text-gray-300 group-focus:text-indigo-400 hover:text-indigo-400 active:text-indigo-400 active:scale-110 transition ease-out duration-200"
                :class="{'text-indigo-400': (active as boolean)}" />

            <!--pill-->
            <div v-if="notifications"
                class="border border-white text-white bg-indigo-400 rounded-full flex items-center justify-center text-xs w-5 h-5 absolute right-0 top-3">
                {{notifications}}
            </div>
        </a>
    </div>
</template>