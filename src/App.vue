<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

import useChatStore from "./stores/chat";

import FadeTransition from "./components/reusables/transitions/FadeTransition.vue";

const chat = useChatStore();

// the app height
const height = ref(`${window.innerHeight}px`);

// todo refactor make all imports absolute with @src/ paths.
// change component file names.
// todo refactor indentation.
// todo refactor folder structure.

// todo refactor reduce the amount of type casting.
// todo refactor restore outline.

// todo redesign scrollbars.
// todo redesign custom emoji component.
// todo redesign the attachment view component.
// todo redesign the recording player component.
// todo redesign login, register and password reset forms.
// todo redesign accessibility.

// todo add tool tips.
// todo add multi select.
// todo add read receipt.

// todo add video calling.
// todo add stories.
// todo add message reactions.

// todo performance testing. (version 2.0 release).

// change the app height whenever the window resizes.
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
  <div :class="{ dark: chat.settings['dark-mode'] }">
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
