<script setup lang="ts">
import useChatStore from "../../../stores/chat";

import Loading1 from "../../loading/Loading1.vue";
import SidebarHeader from "../SidebarHeader.vue";
import Notification from "./Notification.vue";

const chat = useChatStore();
</script>

<template>
    <div>
        <SidebarHeader>
            <template v-slot:title>Notifications</template>
        </SidebarHeader>

        <div class="w-full h-full scroll-smooth scrollbar-hidden" style="overflow-x:visible; overflow-y: scroll;">
            <Notification v-if="chat.status === 'success' && !chat.delayLoading"
                v-for="(notification, index) in chat.notifications" :notification="notification" :key="index" />

            <Loading1 v-if="chat.status === 'loading'  || chat.delayLoading" v-for="item in 8" />
        </div>
    </div>
</template>