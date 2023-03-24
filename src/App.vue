<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

import useStore from "@src/store/store";
import { fetchData } from "@src/store/defaults";

import FadeTransition from "@src/components/ui/transitions/FadeTransition.vue";

// future features:
// todo add video calling

// Refactoring code:
// todo refactor ui components to use component utilities.
// todo refactor remove getters from utils file and add them to store folder.

// Accessability:
// todo make dropdown menus more accessible.
// todo make modals more accessible.
// todo make lists (i.e conversations, contacts, calls) more accessible.
// todo improve the way you view messages.
// todo make multi-select more accessible.

// SEO.
// todo improve seo.

// Performance:
// todo add dynamic imports.
// todo add chunking.

const store = useStore();

// update localStorage with state changes
store.$subscribe((_mutation, state) => {
  localStorage.setItem("chat", JSON.stringify(state));
});

// here we load the data from the server.
onMounted(async () => {
  store.status = "loading";

  // fake server call
  setTimeout(() => {
    store.delayLoading = false;
  });
  const request = await fetchData();

  store.$patch({
    status: "success",
    user: request.data.user,
    conversations: request.data.conversations,
    notifications: request.data.notifications,
    archivedConversations: request.data.archivedConversations,
  });
});

// the app height
const height = ref(`${window.innerHeight}px`);

// change the app height to the window hight.
const resizeWindow = () => {
  height.value = `${window.innerHeight}px`;
};

// and add the resize event when the component mounts.
onMounted(() => {
  window.addEventListener("resize", resizeWindow);
});

// remove the event when un-mounting the component.
onUnmounted(() => {
  window.removeEventListener("resize", resizeWindow);
});
</script>

<template>
  <div :class="{ dark: store.settings.darkMode }">
    <div
      class="bg-white dark:bg-gray-800 transition-colors duration-500"
      :style="{ height: height }"
    >
      <router-view v-slot="{ Component }">
        <FadeTransition>
          <component :is="Component" />
        </FadeTransition>
      </router-view>
    </div>
  </div>
</template>
