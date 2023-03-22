<script setup lang="ts">
import type { Ref } from "vue";
import { computed, ref } from "vue";

import type { IContact, IConversation } from "@src/types";

import ConversationInfo from "@src/components/shared/modals/ConversationInfoModal/ConversationInfo.vue";
import EditGroupInfo from "@src/components/shared/modals/ConversationInfoModal/EditGroupInfo.vue";
import Members from "@src/components/shared/modals/ConversationInfoModal/Members.vue";
import SharedMedia from "@src/components/shared/modals/ConversationInfoModal/SharedMedia.vue";
import Modal from "@src/components/ui/utils/Modal.vue";
import SlideTransition from "@src/components/ui/transitions/SlideTransition.vue";

defineEmits(["activePageChange"]);

const props = defineProps<{
  open: boolean;
  conversation: IConversation;
  closeModal: () => void;
}>();

// selected group member
const selectedMember: Ref<IContact | undefined> = ref();

// used to determine whether to slide left or right
const animation = ref("slide-left");

// name of the active modal page
const activePageName = ref("conversation-info");

// the active modal page component
const ActivePage = computed(() => {
  if (activePageName.value === "conversation-info") return ConversationInfo;
  else if (activePageName.value === "members") return Members;
  else if (activePageName.value === "group-member") return ConversationInfo;
  else if (activePageName.value === "shared-media") return SharedMedia;
  else if (activePageName.value === "edit-group") return EditGroupInfo;
});

// (event) move between modal pages
const changeActiveTab = (event: {
  tabName: string;
  animationName: string;
  contact?: IContact;
  removeContact?: boolean;
}) => {
  animation.value = event.animationName;
  activePageName.value = event.tabName;

  if (event.contact) {
    selectedMember.value = event.contact;
  }

  if (event.removeContact) {
    selectedMember.value = undefined;
  }
};
</script>

<template>
  <Modal :open="props.open" :close-modal="props.closeModal">
    <template v-slot:content>
      <div class="overflow-x-hidden">
        <div class="w-[300px] bg-white dark:bg-gray-800 rounded py-6">
          <!--content-->
          <SlideTransition :animation="animation">
            <component
              @active-page-change="changeActiveTab"
              :is="ActivePage"
              :conversation="props.conversation"
              :close-modal="props.closeModal"
              :key="activePageName"
              :contact="selectedMember"
            />
          </SlideTransition>
        </div>
      </div>
    </template>
  </Modal>
</template>
