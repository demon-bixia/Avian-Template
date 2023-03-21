<script setup lang="ts">
import useStore from "@src/store/store";

const store = useStore();
</script>

<template>
  <div
    :class="{ dark: store.settings.darkMode }"
    class="scrollbox"
    tabindex="0"
  >
    <div class="scrollbox-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.scrollbox {
  overflow: auto;
  visibility: hidden;
}

.scrollbox-content,
.scrollbox:hover,
.scrollbox:focus {
  visibility: visible;
}

.scrollbox::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

.scrollbox::-webkit-scrollbar-track {
  border-radius: 100vh;
  background: rgba(0, 0, 0, 0);
}

.scrollbox:not(.dark)::-webkit-scrollbar-thumb {
  background: rgb(229, 231, 235);
  border-radius: 100vh;
  border: 0;
  cursor: default;
}

.scrollbox.dark::-webkit-scrollbar-thumb {
  background: #52565a;
  border-radius: 100vh;
  border: 0;
  cursor: default;
}
</style>
