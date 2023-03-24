<script setup lang="ts">
import type { IConversation, IMessage } from "@src/types";
import { inject } from "vue";

import useStore from "@src/store/store";
import { getConversationIndex } from "@src/utils";

import {
  ArrowUturnLeftIcon,
  BookmarkIcon,
  BookmarkSquareIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/vue/24/outline";
import Dropdown from "@src/components/ui/navigation/Dropdown/Dropdown.vue";
import DropdownLink from "@src/components/ui/navigation/Dropdown/DropdownLink.vue";

const props = defineProps<{
  message: IMessage;
  show: boolean;
  left: number;
  top: number;
  selected: boolean;
  handleCloseContextMenu: () => void;
  handleSelectMessage: (messageId: number) => void;
  handleDeselectMessage: (messageId: number) => void;
}>();

const store = useStore();

const activeConversation = <IConversation>inject("activeConversation");

// (event) pin message to conversation
const handlePinMessage = () => {
  props.handleCloseContextMenu();

  if (activeConversation) {
    // get the active conversation index in the state store
    let activeConversationIndex = getConversationIndex(activeConversation.id);

    if (
      store.conversations &&
      activeConversationIndex !== undefined &&
      activeConversationIndex !== null
    ) {
      // update the conversation in the state store
      store.conversations[activeConversationIndex].pinnedMessage =
        props.message;
      store.conversations[activeConversationIndex].pinnedMessageHidden = false;
    }
  }
};

// (event) select the reply message.
const handleReplyToMessage = () => {
  props.handleCloseContextMenu();

  if (activeConversation) {
    // get the active conversation index in the state store
    let activeConversationIndex = getConversationIndex(activeConversation.id);

    if (
      store.conversations &&
      activeConversationIndex !== undefined &&
      activeConversationIndex !== null
    ) {
      // update the conversation in the state store
      store.conversations[activeConversationIndex].replyMessage = props.message;
    }
  }
};
</script>

<template>
  <!--custom context menu-->
  <Dropdown
    :close-dropdown="handleCloseContextMenu"
    :handle-click-outside="handleCloseContextMenu"
    :show="show"
    :coordinates="{
      left: props.left + 'px',
      top: props.top + 'px',
    }"
    :position="['top-0']"
  >
    <DropdownLink :handle-click="handleReplyToMessage">
      <ArrowUturnLeftIcon class="h-5 w-5 mr-3" />
      Reply
    </DropdownLink>

    <DropdownLink :handle-click="handleCloseContextMenu">
      <BookmarkIcon class="h-5 w-5 mr-3" />
      Copy
    </DropdownLink>

    <DropdownLink :handle-click="handlePinMessage">
      <BookmarkSquareIcon class="h-5 w-5 mr-3" />
      Pin
    </DropdownLink>

    <DropdownLink
      v-if="props.selected"
      :handle-click="
        () => {
          handleCloseContextMenu();
          props.handleDeselectMessage(props.message.id);
        }
      "
    >
      <XCircleIcon class="h-5 w-5 mr-3" />
      Deselect
    </DropdownLink>

    <DropdownLink
      v-else
      :handle-click="
        () => {
          handleCloseContextMenu();
          props.handleSelectMessage(props.message.id);
        }
      "
    >
      <CheckCircleIcon class="h-5 w-5 mr-3" />
      Select
    </DropdownLink>

    <DropdownLink :handle-click="handleCloseContextMenu" color="danger">
      <TrashIcon class="h-5 w-5 mr-3" />
      Delete Message
    </DropdownLink>
  </Dropdown>
</template>
