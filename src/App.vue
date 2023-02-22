<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

import useChatStore from './stores/chat';

import FadeTransition from './components/reusables/transitions/FadeTransition.vue'; const chat = useChatStore();


// the app height
const height = ref(`${window.innerHeight}px`);

// todo fix clicking back on mobile to close the conversation. 
// todo fix make messages not highlight on mobile screen

// todo fix refactor tailwind classes.
// todo fix make all imports absolute.
// todo fix reduce the amount of type casting.

// todo add sign up with google second step.
// todo add video calling.
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
