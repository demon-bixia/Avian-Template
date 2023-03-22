<script setup lang="ts">
import { inject } from "vue";
import type { IConversation } from "@src/types";

import { getConversationIndex } from "@src/utils";
import useStore from "@src/store/store";

import { XCircleIcon } from "@heroicons/vue/24/outline";
import IconButton from "@src/components/ui/inputs/IconButton.vue";
import SlideTransition from "@src/components/ui/transitions/SlideTransition.vue";
import MessagePreview from "@src/components/views/HomeView/Chat/MessagePreview.vue";

const store = useStore();

const activeConversation = <IConversation>inject("activeConversation");

const removeReplyMessage = () => {
  if (activeConversation) {
    // get the active conversation index in the state store
    let activeConversationIndex = getConversationIndex(activeConversation.id);

    if (
      store.conversations &&
      activeConversationIndex !== undefined &&
      activeConversationIndex !== null
    ) {
      // update the conversation in the state store
      store.conversations[activeConversationIndex].replyMessage = undefined;
    }
  }
};
</script>

<template>
  <SlideTransition animation="shelf-up">
    <div
      class="absolute bottom-0 w-full px-5 py-2 bg-white dark:bg-gray-800 flex items-center justify-between transition-all duration-200"
      v-if="activeConversation?.replyMessage"
    >
      <!--selected message overview-->
      <MessagePreview :message="activeConversation?.replyMessage" />

      <!--close selected Message-->
      <IconButton
        @click="removeReplyMessage"
        class="group w-7 h-7"
        title="remove reply"
        aria-label="remove reply"
      >
        <XCircleIcon
          class="w-[16px] h-[16px] text-gray-300 group-hover:text-red-300"
        />
      </IconButton>
    </div>
  </SlideTransition>
</template>
