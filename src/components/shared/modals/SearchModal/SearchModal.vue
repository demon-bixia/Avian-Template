<script setup lang="ts">
import type { IConversation } from "@src/types";

import NoMessage from "@src/components/states/empty-states/NoMessage.vue";
import Button from "@src/components/ui/inputs/Button.vue";
import SearchInput from "@src/components/ui/inputs/SearchInput.vue";
import Modal from "@src/components/ui/utils/Modal.vue";
import MessageItem from "@src/components/shared/modals/SearchModal/MessageItem.vue";
import ScrollBox from "@src/components/ui/utils/ScrollBox.vue";

const props = defineProps<{
  open: boolean;
  closeModal: () => void;
  conversation: IConversation;
}>();
</script>

<template>
  <Modal :open="props.open" :close-modal="props.closeModal">
    <template v-slot:content>
      <div class="w-[18.75rem] py-6 bg-white dark:bg-gray-800 rounded">
        <!--header-->
        <div class="mb-6 px-5 flex justify-between items-center">
          <p id="modal-title" class="heading-1 text-color" tabindex="0">
            Messages
          </p>

          <Button
            @click="props.closeModal"
            class="outlined-danger ghost-text py-2 px-4"
            typography="body-4"
          >
            esc
          </Button>
        </div>

        <!--search-->
        <div class="mx-5 mb-5">
          <SearchInput />
        </div>

        <!--message-->
        <ScrollBox class="max-h-[14.375rem] overflow-y-scroll">
          <MessageItem
            v-if="props.conversation.messages.length > 0"
            v-for="(message, index) in props.conversation.messages"
            :message="message"
            :key="index"
          />

          <NoMessage vertical v-else />
        </ScrollBox>
      </div>
    </template>
  </Modal>
</template>
