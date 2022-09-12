<script setup lang="ts">
import { defineProps } from "vue";
import type { Component } from "vue";

const { icon, notifications } = defineProps<{
    icon: Component,
    title: string,
    notifications?: number,
}>();
</script>

<template>
    <div class="mb-6">
        <a href="#" class="relative" :title="title">
            <!--icon-->
            <component :is="icon"
                class="w-7 h-6 text-gray-300 hover:text-indigo-300 active:text-indigo-400  transition ease-out duration-300" />

            <!--pill-->
            <div v-if="notifications"
                class="border border-white text-white bg-indigo-300 rounded-full flex items-center justify-center text-xs w-5 h-5 absolute right-0 top-3">
                {{notifications}}
            </div>
        </a>
    </div>
</template>