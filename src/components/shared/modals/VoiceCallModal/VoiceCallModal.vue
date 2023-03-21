<script setup lang="ts">
import { computed, ref } from "vue";

import useStore from "@src/store/store";
import { getOtherMembers } from "@src/utils";

import Dialing from "@src/components/shared/modals/VoiceCallModal/Dialing.vue";
import Ongoing from "@src/components/shared/modals/VoiceCallModal/Ongoing.vue";
import FadeTransition from "@src/components/ui/transitions/FadeTransition.vue";
import Modal from "@src/components/ui/utils/Modal.vue";

const props = defineProps<{
  open: boolean;
  closeModal: (endCall: boolean) => void;
}>();

const store = useStore();

const members = computed(() => {
  if (store.activeCall) {
    return getOtherMembers(store.activeCall);
  }
});

// determine the modal width based on the active component
const modalSize = ref("290px");

// the active modal component
const ActiveComponent = computed(() => {
  if (store.activeCall) {
    if (store?.activeCall.status === "dialing") {
      modalSize.value = "290px";
      return Dialing;
    } else if (store?.activeCall.status === "ongoing") {
      modalSize.value = "400px";
      return Ongoing;
    }
  } else {
    return "div";
  }
});

const handleCallStatusChange = (status: string) => {
  if (store.activeCall) {
    store.activeCall.status = status;
  }
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
            :active-call="store.activeCall"
            :close-modal="() => props.closeModal(true)"
            :handle-call-status-change="handleCallStatusChange"
          />
        </FadeTransition>
      </div>
    </template>
  </Modal>
</template>
