<script setup lang="ts">
import { Conversation } from "../../../stores/chat";

import SearchInput from "../../reusables/SearchInput.vue";
import Typography from "../../reusables/Typography.vue";
import Button from "../../reusables/Button.vue";
import Message from "../Chat/Message.vue";
import Modal from "../../reusables/Modal.vue";

import NoMessage from "../../reusables/empty/NoMessage.vue";

const props = defineProps<{
  open: boolean;
  closeModal: () => void;
  conversation: Conversation;
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
        <div class="max-h-[230px] overflow-y-scroll scrollbar scrollbar-hidden">
          <Message
            v-if="(props.conversation as Conversation).messages.length > 0"
            v-for="(message, index) in (props.conversation as Conversation).messages"
            :message="message"
            :key="index"
          />

          <NoMessage vertical v-else />
        </div>
      </div>
    </template>
  </Modal>
</template>
