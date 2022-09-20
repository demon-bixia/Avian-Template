<script setup lang="ts">
import Conversations from "./Conversations/Conversations.vue";
import Contacts from "./Contacts/Contacts.vue";
import Notifications from "./Notifications/Notifications.vue";
import Archive from "./Archive/Archive.vue";
import Settings from "./Settings/Settings.vue";
import useChatStore from "../../stores/chat";
import { computed } from "vue";

const chat = useChatStore();

const ActiveComponent = computed(() => {
    if (chat.activeSidebarComponent === 'messages') {
        return Conversations;
    } else if (chat.activeSidebarComponent === 'contacts') {
        return Contacts;
    } else if (chat.activeSidebarComponent === 'notifications') {
        return Notifications;
    } else if (chat.activeSidebarComponent === 'archive') {
        return Archive;
    } else if (chat.activeSidebarComponent === 'settings') {
        return Settings;
    }
});
</script>

<template>
    <div class="w-[290px] h-full flex flex-col overflow-visible">
        <Transition name="fade" mode="out-in">
            <component :is="ActiveComponent" class="h-full flex flex-col" />
        </Transition>
    </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease-in;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>