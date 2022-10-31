<script setup lang="ts">
import { computed } from "vue";

import useChatStore from './stores/chat';

import FadeTransition from './components/reusables/transitions/FadeTransition.vue'; const chat = useChatStore();

// fix height on mobile screens
// todo add video calling
// todo refactor tailwind classes


const vh = () => {
    return `${window.innerHeight}px`;
};
</script>

<template>
    <div :class="{ 'dark': chat.settings[2].settings[0].value }">
        <div class="bg-white dark:bg-gray-800 transition-all duration-500" :style="{ height: vh() }">
            <router-view v-slot="{ Component }">
                <FadeTransition>
                    <component :is="Component" />
                </FadeTransition>
            </router-view>
        </div>
    </div>
</template>
