<script setup lang="ts">
import { computed, ref } from "vue";

import useChatStore, { Call } from "../../../../stores/chat";
import { getOtherMembers } from "../../../../utils";

import FadeTransition from "../../../reusables/transitions/FadeTransition.vue";
import Modal from "../../../reusables/Modal.vue";
import Dialing from "./Dialing.vue";
import Ongoing from "./Ongoing.vue";

const props = defineProps<{
  open: boolean;
  closeModal: (endCall: boolean) => void;
}>();

const chat = useChatStore();

const members = computed(() => {
  return getOtherMembers(chat.activeCall as Call);
});

// determine the modal width based on the active component
const modalSize = ref("290px");

// the active modal component
const ActiveComponent = computed(() => {
  if (chat.activeCall) {
    if (chat?.activeCall.status === "dialing") {
      modalSize.value = "290px";
      return Dialing;
    } else if (chat?.activeCall.status === "ongoing") {
      modalSize.value = "400px";
      return Ongoing;
    }
  } else {
    return "div";
  }
});

const handleCallStatusChange = (status: string) => {
  (chat.activeCall as Call).status = status;
};
</script>

<template>
  <Modal :open="props.open" :close-modal="() => props.closeModal(false)">
    <template v-slot:content>
      <div
        class="rounded bg-white dark:bg-gray-800 transition-all duration-300"
        :style="{ width: modalSize }"
      >
        <FadeTransition>
          <component
            :is="ActiveComponent"
            :members="members"
            :active-call="chat.activeCall"
            :close-modal="() => props.closeModal(true)"
            :handle-call-status-change="handleCallStatusChange"
          />
        </FadeTransition>
      </div>
    </template>
  </Modal>
</template>
