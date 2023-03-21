<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import useStore from "@src/store/store";
import FadeTransition from "@src/components/ui/transitions/FadeTransition.vue";

// Fixes:
// todo messages in dev console.

// New Features and improvements:
// todo add loading states to components that require downloading files. (important)
// todo add a "clear text" button to search input (easy)
// todo add a new messages counter to conversation bubble. (easy)
// todo add tool tips. (easy)
// todo add drafts. (easy)
// todo add read receipt. (requires some thinking)
// todo add multi select. (requires some thinking)
// todo add voice video calling. (important)

// Refactoring code:
// todo refactor ui components to use component utilities.
// todo refactor remove getters from utils file and add them to store folder.

// Accessability:
// dropdown menus.
// modals.
// lists (conversations, contacts, calls).
// improve the way you view messages.
// video calling
// multi-select

// SEO.

// Performance:
// todo performance testing. (version 2.0 release).

const store = useStore();

// the app height
const height = ref(`${window.innerHeight}px`);

// change the app height to the window hight.
const resizeWindow = () => {
  height.value = `${window.innerHeight}px`;
};

// add the resize event when the component mounts.
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
