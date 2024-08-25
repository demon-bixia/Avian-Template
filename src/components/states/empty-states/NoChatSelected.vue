<script setup lang="ts">
import { ChatBubbleOvalLeftIcon } from "@heroicons/vue/24/solid";
</script>

<template>
  <div class="h-full flex flex-col justify-center items-center">
    <div
      class="w-10 h-10 mr-4 mb-5 flex justify-center items-center rounded-full bg-gray-50 dark:bg-gray-700 transition duration-500"
    >
      <ChatBubbleOvalLeftIcon
        class="w-7 h-7 text-gray-400 dark:text-white dark:opacity-70"
      />
    </div>

    <p class="heading-2 text-color mb-3">No chat selected</p>

    <p class="body-2 text-color flex">
      Select a conversation from the conversation menu.
    </p>
  </div>
</template>
