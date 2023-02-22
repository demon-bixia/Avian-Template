<script setup lang="ts">
import useChatStore from './stores/chat';

import FadeTransition from './components/reusables/transitions/FadeTransition.vue';


const chat = useChatStore();

// todo fix clicking back on mobile to close the conversation. 
// todo fix make messages not highlight on mobile.

// todo fix refactor tailwind classes.
// todo fix make all imports absolute.
// todo fix reduce the amount of type casting.

// todo add sign up with google second step.
// todo add video calling.
</script>

<template>
    <div :class="{ 'dark': chat.settings[2].settings[0].value }">
        <div class="h-screen bg-white dark:bg-gray-800 transition-all duration-500">
            <router-view v-slot="{ Component }">
                <FadeTransition>
                    <component :is="Component" />
                </FadeTransition>
            </router-view>
        </div>
    </div>
</template>
