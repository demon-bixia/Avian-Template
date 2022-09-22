<script setup lang="ts">
import { computed } from "vue";
import useChatStore from "../../stores/chat";
import Archive from "./Archive/Archive.vue";
import Contacts from "./Contacts/Contacts.vue";
import Conversations from "./Conversations/Conversations.vue";
import Notifications from "./Notifications/Notifications.vue";
import Settings from "./Settings/Settings.vue";
import FadeTransition from "../transitions/FadeTransition.vue";

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
    <div class="w-[290px] h-full  flex flex-col overflow-visible">
        <FadeTransition>
            <component :is="ActiveComponent" class="h-full flex flex-col" />
        </FadeTransition>
    </div>
</template>
