<script setup lang="ts">
import type { IConversation, IUser } from "@src/types";
import { inject } from "vue";

import useStore from "@src/store/store";
import { getConversationIndex } from "@src/utils";

import { EyeSlashIcon, XCircleIcon } from "@heroicons/vue/24/outline";
import IconButton from "@src/components/ui/inputs/IconButton.vue";
import SlideTransition from "@src/components/ui/transitions/SlideTransition.vue";
import MessagePreview from "@src/components/views/HomeView/Chat/MessagePreview.vue";

const store = useStore();

const activeConversation = <IConversation>inject("activeConversation");
// (event) hide the pinned message
const handleHidePinnedMessage = () => {
  if (activeConversation) {
    // get the active conversation index in the state store
    let activeConversationIndex = getConversationIndex(activeConversation.id);

    if (
      store.conversations &&
      activeConversationIndex !== undefined &&
      activeConversationIndex !== null
    ) {
      // update the conversation in the state store
      store.conversations[activeConversationIndex].pinnedMessageHidden = true;
    }
  }
};

// (event) remove the pinned message
const handleRemovePinnedMessage = () => {
  if (activeConversation) {
    // get the active conversation index in the state store
    let activeConversationIndex = getConversationIndex(activeConversation.id);

    if (
      store.conversations &&
      activeConversationIndex !== undefined &&
      activeConversationIndex !== null
    ) {
      // update the conversation in the state store
      store.conversations[activeConversationIndex].pinnedMessage = undefined;

      // send socket message notifying other users that the message is removed
      // ...
    }
  }
};
</script>

<template>
  <SlideTransition animation="shelf-down">
    <div
      class="absolute z-10 w-full px-5 py-2 bg-white dark:bg-gray-800 flex items-center justify-between transition-all duration-500"
      v-if="
        activeConversation.pinnedMessage &&
        !activeConversation.pinnedMessageHidden
      "
    >
      <!--pinned message preview-->
      <MessagePreview :message="activeConversation?.pinnedMessage" />

      <div class="flex">
        <!--hide pinned Message-->
        <IconButton
          title="hide pinned message"
          aria-label="hide pinned message"
          @click="handleHidePinnedMessage"
          class="group w-7 h-7 text-gray-300"
          :class="{
            'mr-3':
              store.user && activeConversation?.admins?.includes(store.user.id),
          }"
        >
          <EyeSlashIcon class="w-[16px] h-[16px]" />
        </IconButton>

        <!--remove pinned Message-->
        <IconButton
          v-if="
            store.user && activeConversation?.admins?.includes(store.user.id)
          "
          @click="handleRemovePinnedMessage"
          class="group w-7 h-7"
          title="close pinned message"
          aria-label="close pinned message"
        >
          <XCircleIcon
            class="w-[16px] h-[16px] text-gray-300 group-hover:text-red-300"
          />
        </IconButton>
      </div>
    </div>
  </SlideTransition>
</template>
