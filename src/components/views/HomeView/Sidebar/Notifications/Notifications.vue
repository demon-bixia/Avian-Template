<script setup lang="ts">
import type { INotification } from "@src/types";
import useStore from "@src/store/store";

import NoNotifications from "@src/components/states/empty-states/NoNotifications.vue";
import Loading1 from "@src/components/states/loading-states/Loading1.vue";
import Notification from "@src/components/views/HomeView/Sidebar/Notifications/Notification.vue";
import SidebarHeader from "@src/components/views/HomeView/Sidebar/SidebarHeader.vue";

const store = useStore();
</script>

<template>
  <div>
    <SidebarHeader>
      <template v-slot:title>Notifications</template>
    </SidebarHeader>

    <div
      class="w-full h-full scroll-smooth scrollbar-hidden"
      style="overflow-x: visible; overflow-y: scroll"
    >
      <Loading1
        v-if="store.status === 'loading'  || store.delayLoading && (store.notifications as INotification[]).length > 0"
        v-for="item in 6"
      />

      <Notification
        v-else-if="store.status === 'success' && !store.delayLoading"
        v-for="(notification, index) in store.notifications"
        :notification="notification"
        :key="index"
      />

      <NoNotifications v-else />
    </div>
  </div>
</template>
