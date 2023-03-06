<script setup lang="ts">
import useChatStore from "../../../stores/chat";

import Typography from "../../reusables/Typography.vue";

const chat = useChatStore();
</script>

<template>
  <div
    class="flex flex-col"
    :class="
      chat.settings['dark-mode']
        ? ['bg-gray-900']
        : [
            'animate-gradient bg-[length:200%_200%] bg-gradient-to-b from-[#B0B7F9] to-[#162CD4]',
          ]
    "
  >
    <img
      src="../../../../public/vectors/logo-white.svg"
      class="w-[230px] h-[250px] opacity-70"
    />

    <Typography variant="display" :no-color="true" class="text-white opacity-70"
      >Avian Messaging</Typography
    >
  </div>
</template>
