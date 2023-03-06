<script setup lang="ts">
import { ref } from "vue";
import useChatStore from "../../../stores/chat";

let SkipLinkFocused = ref(false);

const chat = useChatStore();
</script>

<template>
  <div class="mb-7 h-7 xs:hidden md:block">
    <a
      href="#mainContent"
      title="Skip to main content"
      @blur="SkipLinkFocused = false"
      @focus="SkipLinkFocused = true"
      class="outline-none"
      :class="{
        absolute: !SkipLinkFocused,
        'right-[10000px]': !SkipLinkFocused,
      }"
    >
      <ForwardIcon class="w-7 h-6 text-indigo-300" />
    </a>

    <button
      aria-label="avian logo"
      :class="{ hidden: SkipLinkFocused }"
      class="outline-none"
    >
      <img
        v-if="!chat.settings['dark-mode']"
        src="../../../../public/vectors/logo.svg"
        class="w-8 h-7"
      />
      <img
        v-else
        src="../../../../public/vectors/logo-white.svg"
        class="w-8 h-7 opacity-40"
      />
    </button>
  </div>
</template>
