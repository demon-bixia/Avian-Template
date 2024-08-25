<script setup lang="ts">
import type { IAttachment, IConversation, IRecording } from "@src/types";
import type { Ref } from "vue";
import { computed, ref } from "vue";

import useStore from "@src/store/store";
import {
  getActiveConversationId,
  getAvatar,
  getConversationIndex,
  getName,
  hasAttachments,
  shorten,
} from "@src/utils";
import router from "@src/router";

import {
  ArchiveBoxArrowDownIcon,
  InformationCircleIcon,
  MicrophoneIcon,
  TrashIcon,
} from "@heroicons/vue/24/outline";
import Dropdown from "@src/components/ui/navigation/Dropdown/Dropdown.vue";
import DropdownLink from "@src/components/ui/navigation/Dropdown/DropdownLink.vue";

const props = defineProps<{
  conversation: IConversation;
}>();

const store = useStore();

const showContextMenu = ref(false);

const contextMenuCoordinations: Ref<{ x: number; y: number } | undefined> =
  ref();

// open context menu.
const handleShowContextMenu = (event: any) => {
  showContextMenu.value = true;
  contextMenuCoordinations.value = {
    x:
      window.innerWidth - 205 <= event.pageX
        ? window.innerWidth - 220
        : event.pageX,
    y:
      window.innerHeight - 125 <= event.pageY
        ? window.innerHeight - 200
        : event.pageY,
  };
};

// (event) closes the context menu
const handleCloseContextMenu = () => {
  showContextMenu.value = false;
};

// (event) select this conversation.
const handleSelectConversation = () => {
  showContextMenu.value = false;
  router.push({ path: `/chat/${props.conversation.id}/` });
};

// last message in conversation to display
const lastMessage = computed(
  () => props.conversation.messages[props.conversation.messages.length - 1],
);

// (event) remove the unread indicator when opening the conversation
const handleRemoveUnread = () => {
  let index = getConversationIndex(props.conversation.id);
  if (index !== undefined) {
    store.conversations[index].unread = 0;
  }
};

// (computed property) determines if this conversation is active.
const isActive = computed(
  () => getActiveConversationId() === props.conversation.id,
);
</script>

<template>
  <div class="select-none">
    <button
      :aria-label="'conversation with' + getName(props.conversation)"
      tabindex="0"
      @contextmenu.prevent="handleShowContextMenu"
      @click="
        () => {
          handleRemoveUnread();
          handleSelectConversation();
        }
      "
      class="w-full h-[5.75rem] px-5 py-6 mb-3 flex rounded focus:bg-indigo-50 dark:active:bg-gray-600 dark:focus:bg-gray-600 dark:hover:bg-gray-600 hover:bg-indigo-50 active:bg-indigo-100 focus:outline-none transition duration-500 ease-out"
      :class="{
        'md:bg-indigo-50': isActive,
        'md:dark:bg-gray-600': isActive,
      }"
    >
      <!--profile image-->
      <div class="mr-4">
        <div
          :style="{ backgroundImage: `url(${getAvatar(props.conversation)})` }"
          class="w-7 h-7 rounded-full bg-cover bg-center"
        ></div>
      </div>

      <div class="w-full flex flex-col">
        <div class="w-full">
          <!--conversation name-->
          <div class="flex items-start">
            <div class="grow mb-4 text-start">
              <p class="heading-2 text-color">
                {{ getName(props.conversation) }}
              </p>
            </div>

            <!--last message date-->
            <p class="body-1 text-color">
              {{ lastMessage?.date }}
            </p>
          </div>
        </div>

        <div class="flex justify-between">
          <div>
            <!--draft Message-->
            <p
              v-if="
                props.conversation.draftMessage &&
                props.conversation.id !== getActiveConversationId()
              "
              class="body-2 flex justify-start items-center text-red-400"
            >
              draft: {{ shorten(props.conversation.draftMessage) }}
            </p>

            <!--recording name-->
            <p
              v-else-if="
                lastMessage.type === 'recording' && lastMessage.content
              "
              class="body-2 text-color flex justify-start items-center"
            >
              <MicrophoneIcon
                class="w-4 h-4 mr-2 text-black opacity-60 dark:text-white dark:opacity-70"
                :class="{ 'text-indigo-400': props.conversation.unread }"
              />
              <span :class="{ 'text-indigo-400': props.conversation.unread }">
                Recording
                {{ (lastMessage.content as IRecording).duration }}
              </span>
            </p>

            <!--attachments title-->
            <p
              v-else-if="hasAttachments(lastMessage)"
              class="body-2 text-color flex justify-start items-center"
              :class="{ 'text-indigo-400': props.conversation.unread }"
            >
              <span :class="{ 'text-indigo-400': props.conversation.unread }">
                {{ (lastMessage?.attachments as IAttachment[])[0].name }}
              </span>
            </p>

            <!--last message content -->
            <p
              v-else
              class="body-2 text-color flex justify-start items-center"
              :class="{ 'text-indigo-400': props.conversation.unread }"
            >
              <span :class="{ 'text-indigo-400': props.conversation.unread }">
                {{ shorten(lastMessage) }}
              </span>
            </p>
          </div>

          <div v-if="props.conversation.unread">
            <div
              class="w-[1.125rem] h-[1.125rem] flex justify-center items-center rounded-[50%] bg-indigo-300"
            >
              <p class="body-1 text-white">
                {{ props.conversation.unread }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </button>

    <!--custom context menu-->
    <Dropdown
      :close-dropdown="() => (showContextMenu = false)"
      :show="showContextMenu"
      :handle-close="handleCloseContextMenu"
      :handle-click-outside="handleCloseContextMenu"
      :coordinates="{
        left: contextMenuCoordinations?.x + 'px',
        top: contextMenuCoordinations?.y + 'px',
      }"
      :position="['top-0']"
    >
      <button
        class="dropdown-link dropdown-link-primary"
        aria-label="Show conversation information"
        role="menuitem"
        @click="handleCloseContextMenu"
      >
        <InformationCircleIcon class="h-5 w-5 mr-3" />
        Conversation info
      </button>

      <button
        class="dropdown-link dropdown-link-primary"
        aria-label="Add conversation to archive"
        role="menuitem"
        @click="handleCloseContextMenu"
      >
        <ArchiveBoxArrowDownIcon class="h-5 w-5 mr-3" />
        Archive conversation
      </button>

      <button
        class="dropdown-link dropdown-link-danger"
        aria-label="Delete the conversation"
        role="menuitem"
        @click="handleCloseContextMenu"
      >
        <TrashIcon class="h-5 w-5 mr-3" />
        Delete conversation
      </button>
    </Dropdown>
  </div>
</template>
