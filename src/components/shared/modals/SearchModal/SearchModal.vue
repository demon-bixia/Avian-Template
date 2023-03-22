<script setup lang="ts">
import type { IConversation } from "@src/types";

import NoMessage from "@src/components/states/empty-states/NoMessage.vue";
import Typography from "@src/components/ui/data-display/Typography.vue";
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
      <div class="w-[300px] py-6 bg-white dark:bg-gray-800 rounded">
        <!--header-->
        <div class="mb-6 px-5 flex justify-between items-center">
          <Typography id="modal-title" variant="heading-1" tabindex="0">
            Messages
          </Typography>

          <Button
            @click="props.closeModal"
            variant="outlined"
            color="danger"
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
        <ScrollBox class="max-h-[230px] overflow-y-scroll">
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
