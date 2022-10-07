<script setup lang="ts">
import FadeTransition from './components/reusables/transitions/FadeTransition.vue';

import useChatStore from './stores/chat';

const chat = useChatStore();
</script>

<template>
    <div :class="{'dark': chat.darkMode}">
        <div class="w-full h-screen dark:bg-gray-800">
            <router-view v-slot="{ Component }">
                <FadeTransition>
                    <component :is="Component" />
                </FadeTransition>
            </router-view>
        </div>
    </div>
</template>
