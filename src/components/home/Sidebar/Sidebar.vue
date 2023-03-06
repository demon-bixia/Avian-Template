<script setup lang="ts">
import { computed } from "vue";

import useChatStore from "../../../stores/chat";

import FadeTransition from "../../reusables/transitions/FadeTransition.vue";
import Contacts from "./Contacts/Contacts.vue";
import Conversations from "./Conversations/Conversations.vue";
import Notifications from "./Notifications/Notifications.vue";
import Calls from "./Calls/Calls.vue";
import Settings from "./Settings/Settings.vue";

const chat = useChatStore();

// the selected sidebar component (e.g message/notifications/settings)
const ActiveComponent = computed(() => {
  if (chat.activeSidebarComponent === "messages") {
    return Conversations;
  } else if (chat.activeSidebarComponent === "contacts") {
    return Contacts;
  } else if (chat.activeSidebarComponent === "notifications") {
    return Notifications;
  } else if (chat.activeSidebarComponent === "phone") {
    return Calls;
  } else if (chat.activeSidebarComponent === "settings") {
    return Settings;
  }
});
</script>

<template>
  <aside
    class="xs:w-full md:w-[290px] h-full xs:px-5 md:p-0 flex flex-col overflow-visible transition-all duration-500"
  >
    <FadeTransition>
      <component :is="ActiveComponent" class="h-full flex flex-col" />
    </FadeTransition>
  </aside>
</template>
