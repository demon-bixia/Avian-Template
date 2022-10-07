<script setup lang="ts">
import useChatStore from "../../../../stores/chat";
import { Notification as NotificationType } from "../../../../stores/chat";

import Loading1 from "../../../reusables/loading/Loading1.vue";
import SidebarHeader from "../SidebarHeader.vue";
import Notification from "./Notification.vue";
import NoNotifications from "../../../reusables/emptyStates/NoNotifications.vue";

const chat = useChatStore();
</script>

<template>
    <div>
        <SidebarHeader>
            <template v-slot:title>Notifications</template>
        </SidebarHeader>

        <div class="w-full h-full scroll-smooth scrollbar-hidden" style="overflow-x:visible; overflow-y: scroll;">
            <Loading1
                v-if="chat.status === 'loading'  || chat.delayLoading && (chat.notifications as NotificationType[]).length > 0"
                v-for="item in 8" />

            <Notification v-else-if="chat.status === 'success' && !chat.delayLoading"
                v-for="(notification, index) in chat.notifications" :notification="notification" :key="index" />

            <NoNotifications v-else />
        </div>
    </div>
</template>