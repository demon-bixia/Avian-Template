<script setup lang="ts">
import type {
  IConversation,
  IMessage,
  IPreviewData,
  IRecording,
} from "@src/types";
import type { Ref } from "vue";

import linkifyStr from "linkify-string";
import { inject, ref } from "vue";

import { getFullName, getMessageById } from "@src/utils";

import Typography from "@src/components/ui/data-display/Typography.vue";
import Attachments from "@src/components/views/HomeView/Chat/ChatMiddle/Message/Attachments.vue";
import LinkPreview from "@src/components/views/HomeView/Chat/ChatMiddle/Message/LinkPreview.vue";
import MessageContextMenu from "@src/components/views/HomeView/Chat/ChatMiddle/Message/MessageContextMenu.vue";
import Recording from "@src/components/views/HomeView/Chat/ChatMiddle/Message/Recording.vue";
import MessagePreview from "@src/components/views/HomeView/Chat/MessagePreview.vue";
import Receipt from "@src/components/views/HomeView/Chat/ChatMiddle/Message/Receipt.vue";

const props = defineProps<{
  message: IMessage;
  followUp: boolean;
  self: boolean;
  divider?: boolean;
  selected?: boolean;
  handleSelectMessage: (messageId: number) => void;
  handleDeselectMessage: (messageId: number) => void;
}>();

const activeConversation = <IConversation>inject("activeConversation");

const showContextMenu = ref(false);

const contextMenuCoordinations: Ref<{ x: number; y: number }> = ref({
  x: 0,
  y: 0,
});

// open context menu.
const handleShowContextMenu = (event: any) => {
  showContextMenu.value = true;
  contextMenuCoordinations.value = {
    x:
      window.innerWidth - 220 <= event.pageX
        ? window.innerWidth - 250
        : event.pageX,
    y:
      window.innerHeight - 300 <= event.pageY
        ? window.innerHeight - 250
        : event.pageY,
  };
};

// closes the context menu
const handleCloseContextMenu = () => {
  showContextMenu.value = false;
};

// close context menu when opening a new one.
const contextConfig = {
  handler: handleCloseContextMenu,
  events: ["contextmenu"],
};

// decide whether to show or hide avatar next to the image.
const hideAvatar = () => {
  if (props.divider && !props.self) {
    return false;
  } else {
    if (props.followUp) {
      return true;
    }
    if (props.self) {
      return true;
    }
  }
};

// Reply message
const replyMessage = getMessageById(activeConversation, props.message.replyTo);
</script>

<template>
  <div class="select-none">
    <div class="xs:mb-6 md:mb-5 flex" :class="{ 'justify-end': props.self }">
      <!--avatar-->
      <div class="mr-4" :class="{ 'ml-[36px]': props.followUp && !divider }">
        <div
          v-if="!hideAvatar()"
          :aria-label="getFullName(props.message.sender)"
          class="outline-none"
        >
          <div
            :style="{ backgroundImage: `url(${props.message.sender.avatar})` }"
            class="w-[36px] h-[36px] bg-cover bg-center rounded-full"
          ></div>
        </div>
      </div>

      <div class="flex items-end">
        <!--bubble-->
        <div
          @click="handleCloseContextMenu"
          v-click-outside="contextConfig"
          @contextmenu.prevent="handleShowContextMenu"
          class="group max-w-[500px] p-5 rounded-b transition duration-500"
          :class="{
            'rounded-tl ml-4 order-2 bg-indigo-50 dark:bg-gray-600':
              props.self && !props.selected,

            'rounded-tr mr-4 bg-gray-50 dark:bg-gray-600':
              !props.self && !props.selected,

            'rounded-tl ml-4 order-2 bg-indigo-200 dark:bg-indigo-500':
              props.self && props.selected,

            'rounded-tr mr-4 bg-indigo-200 dark:bg-indigo-500':
              !props.self && props.selected,
          }"
        >
          <!--reply to-->
          <MessagePreview
            v-if="replyMessage"
            :message="replyMessage"
            :self="props.self"
            class="mb-5 px-3"
          />

          <!--content-->
          <Typography
            variant="body-2"
            noColor
            v-if="props.message.content && props.message.type !== 'recording'"
            class="outline-none text-black opacity-60 dark:text-white dark:opacity-70"
            v-html="linkifyStr((props.message.content as string), {
                            className: props.self ? 'text-black opacity-50' : 'text-indigo-500 dark:text-indigo-300',
                            format: { url: (value) => value.length > 50 ? value.slice(0, 50) + `…` : value }
                        })"
            tabindex="0"
          >
          </Typography>

          <!--recording-->
          <div
            v-else-if="
              props.message.content && props.message.type === 'recording'
            "
          >
            <Recording
              :recording="(props.message.content as IRecording)"
              :self="props.self"
            />
          </div>

          <!--attachments-->
          <Attachments
            v-if="(props.message.attachments as [])?.length > 0"
            :message="props.message"
            :self="props.self"
          />

          <!--link preview-->
          <LinkPreview
            v-if="props.message.previewData && !props.message.attachments"
            :self="props.self"
            :preview-data="(props.message.previewData as IPreviewData)"
            class="mt-5"
          />
        </div>

        <!--date-->
        <div :class="props.self ? ['ml-4', 'order-1'] : ['mr-4']">
          <Typography variant="body-1" class="whitespace-pre">
            {{ props.message.date }}
          </Typography>
        </div>

        <!--read receipt-->
        <Receipt v-if="props.self" :state="props.message.state" />
      </div>
    </div>
    <MessageContextMenu
      :selected="props.selected"
      :message="props.message"
      :show="showContextMenu"
      :left="contextMenuCoordinations.x"
      :top="contextMenuCoordinations.y"
      :handle-close-context-menu="handleCloseContextMenu"
      :handle-select-message="handleSelectMessage"
      :handle-deselect-message="handleDeselectMessage"
    />
  </div>
</template>
