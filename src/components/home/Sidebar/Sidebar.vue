<script setup lang="ts">
import { computed } from "vue";

import useChatStore from "../../../stores/chat";

import FadeTransition from "../../reusables/transitions/FadeTransition.vue";
import Archive from "./Archive/Archive.vue";
import Contacts from "./Contacts/Contacts.vue";
import Conversations from "./Conversations/Conversations.vue";
import Notifications from "./Notifications/Notifications.vue";
import Settings from "./Settings/Settings.vue";

const chat = useChatStore();

// the selected sidebar component (e.g message/notifications/settings)
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
    <aside class="w-[290px] h-full flex flex-col overflow-visible dark:bg-gray-800 transition-all duration-500">
        <FadeTransition>
            <component :is="ActiveComponent" class="h-full flex flex-col" />
        </FadeTransition>
    </aside>
</template>
