<script setup lang="ts">
import { attachments } from "@src/store/defaults";

import Attachment from "@src/components/shared/modals/AttachmentsModal/Attachment.vue";
import Button from "@src/components/ui/inputs/Button.vue";
import TextInput from "@src/components/ui/inputs/TextInput.vue";
import Modal from "@src/components/ui/utils/Modal.vue";
import ScrollBox from "@src/components/ui/utils/ScrollBox.vue";

const props = defineProps<{
  open: boolean;
  closeModal: () => void;
}>();
</script>

<template>
  <Modal :open="props.open" :close-modal="props.closeModal">
    <template v-slot:content>
      <div class="w-[400px] bg-white dark:bg-gray-800 rounded py-6">
        <!--attachments list-->
        <ScrollBox class="max-h-[140px] overflow-y-scroll">
          <Attachment
            v-for="(attachment, index) in attachments"
            :attachment="attachment"
            :key="index"
          />
        </ScrollBox>

        <!--caption button-->
        <div class="px-5 py-6">
          <TextInput placeholder="Caption" type="text" />
        </div>

        <!--Action buttons-->
        <div class="flex w-full px-5">
          <div class="grow flex justify-start">
            <Button variant="ghost"> Add </Button>
          </div>

          <Button variant="ghost" @click="props.closeModal" class="mr-4">
            Cancel
          </Button>

          <Button> Send </Button>
        </div>
      </div>
    </template>
  </Modal>
</template>
