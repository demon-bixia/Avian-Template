<script setup lang="ts">
import type { IContact, IConversation, IMessage } from "@src/types";
import { computed } from "vue";

import { hasAttachments } from "@src/utils";

import { ArrowUturnLeftIcon } from "@heroicons/vue/24/outline";
import MediaItem from "@src/components/shared/modals/ConversationInfoModal/MediaItem.vue";
import Typography from "@src/components/ui/data-display/Typography.vue";
import SearchInput from "@src/components/ui/inputs/SearchInput.vue";
import NoMedia from "@src/components/states/empty-states/NoMedia.vue";
import ScrollBox from "@src/components/ui/utils/ScrollBox.vue";

const props = defineProps<{
  closeModal: () => void;
  conversation: IConversation;
  contact?: IContact;
}>();

// extract messages that contain attachments.
const attachmentMessages = computed(() => {
  let media: IMessage[] = [];
  for (let message of props.conversation.messages) {
    if (hasAttachments(message)) {
      if (props.contact) {
        if (message.sender.id === props.contact.id) {
          media.push(message);
        }
      } else {
        media.push(message);
      }
    }
  }
  return media;
});
</script>

<template>
  <div>
    <!--header-->
    <div class="mb-6 px-5 flex justify-between items-center">
      <Typography
        id="modal-title"
        variant="heading-1"
        tabindex="0"
        class="default-outline"
      >
        Shared Media
      </Typography>

      <!--return button-->
      <button
        @click="
          $emit('active-page-change', {
            tabName: 'conversation-info',
            animationName: 'slide-right',
          })
        "
        class="group p-2 border rounded-full border-gray-200 dark:border-white dark:border-opacity-70 focus:outline-none focus:border-indigo-100 focus:bg-indigo-100 hover:bg-indigo-100 hover:border-indigo-100 dark:hover:border-indigo-400 dark:hover:bg-indigo-400 dark:focus:bg-reindigod-400 dark:focus:border-indigo-400 transition-all duration-200 outline-none"
      >
        <ArrowUturnLeftIcon
          class="w-5 h-5 text-black opacity-50 dark:text-white dark:opacity-70 group-hover:text-indigo-500 group-hover:opacity-100 dark:group-hover:text-white"
        />
      </button>
    </div>

    <!--search-->
    <div class="mb-5 mx-5">
      <SearchInput />
    </div>

    <!--media messages-->
    <ScrollBox class="overflow-y-scroll max-h-[222px]">
      <div
        v-if="attachmentMessages.length > 0"
        v-for="(message, index) in attachmentMessages"
        :key="index"
      >
        <MediaItem
          v-for="(attachment, index) in message.attachments"
          :attachment="attachment"
          :date="message.date"
          :key="index"
        />
      </div>

      <NoMedia v-else vertical />
    </ScrollBox>
  </div>
</template>
