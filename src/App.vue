<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

import useChatStore from './stores/chat';

import FadeTransition from './components/reusables/transitions/FadeTransition.vue'; const chat = useChatStore();

// todo add video calling
// todo refactor tailwind classes

// the app height
const height = ref(`${window.innerHeight}px`);

// change the app height whenever the window resizes
const resizeWindow = () => {
    height.value = `${window.innerHeight}px`;
};

// add the resize event when the component mounts
onMounted(() => {
    window.addEventListener('resize', resizeWindow);
});

// remove the event when un-mounting the component
onUnmounted(() => {
    window.removeEventListener('resize', resizeWindow);
});
</script>

<template>
    <div :class="{ 'dark': chat.settings[2].settings[0].value }">
        <div class="bg-white dark:bg-gray-800 transition-all duration-500" :style="{ height: height }">
            <router-view v-slot="{ Component }">
                <FadeTransition>
                    <component :is="Component" />
                </FadeTransition>
            </router-view>
        </div>
    </div>
</template>
