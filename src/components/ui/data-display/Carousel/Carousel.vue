<script setup lang="ts">
import type { Ref } from "vue";
import { computed, inject, onMounted, onUnmounted, ref, watch } from "vue";

import type { IAttachment, IConversation } from "@src/types";
import { hasAttachments } from "@src/utils";
import { useFocusTrap } from "@vueuse/integrations/useFocusTrap";
import VideoPlayer from "@src/components/ui/data-display/VideoPlayer.vue";
import IconButton from "@src/components/ui/inputs/IconButton.vue";
import Toolbar from "@src/components/ui/data-display/Carousel/Toolbar.vue";
import ScaleTransition from "../../transitions/ScaleTransition.vue";
import FadeTransition from "../../transitions/FadeTransition.vue";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/solid";

const props = defineProps<{
  open: boolean;
  startingId?: number;
  closeCarousel: () => void;
}>();

const carousel: Ref<HTMLElement | undefined> = ref();

const { activate, deactivate } = useFocusTrap(carousel);

// the active conversation
const conversation = <IConversation>inject("activeConversation");

// index of the current open attachment in the
const currentIndex = ref(0);

// boolean value used to tell whether we moved from the starting point or not
const moved = ref(false);

// all the attachment in the conversation or an empty array
const attachments = computed(() => {
  let attachments = [];

  if (conversation) {
    for (let message of conversation.messages) {
      if (message.attachments && hasAttachments(message)) {
        for (let attachment of message.attachments) {
          if (["video", "image"].includes(attachment.type)) {
            attachments.push(attachment);
          }
        }
      }
    }
  }

  return attachments;
});

// the index of the attachment we start from
const startingIndex = computed(() => {
  let startingIndex: number | undefined;

  attachments.value.forEach((value, index) => {
    if (value.id === props.startingId) {
      startingIndex = index;
    }
  });

  return startingIndex;
});

// the selected attachment
const selectedAttachment = computed(() => {
  return attachments.value[
    moved ? (currentIndex.value as number) : (startingIndex.value as number)
  ];
});

// set moved to false and then close modal
const handleCloseCarousel = () => {
  moved.value = false;
  props.closeCarousel();
};

// check if there is a next attachment.
const thereIsNext = () => {
  let length = (attachments.value as IAttachment[])?.length;

  return length > 0 && !(currentIndex.value + 1 >= length);
};

// check if there is a previous attachment.
const thereIsPrevious = () => {
  let length = (attachments.value as IAttachment[])?.length;
  return length > 0 && !(currentIndex.value <= 0);
};

// (event) increase selectedIndex if there is a next attachment.
const handleNextItem = () => {
  if (thereIsNext()) {
    zoom.value = 1;
    moved.value = true;
    (currentIndex.value as number)++;
  }
};

// (event) increase selectedIndex if there is a previous attachment.
const handlePreviousItem = () => {
  if (thereIsPrevious()) {
    zoom.value = 1;
    moved.value = true;
    (currentIndex.value as number)--;
  }
};

// (event) close modal when typing esc button
const handleCloseOnEscape = (event: KeyboardEvent) => {
  if (["Escape", "Esc"].includes(event.key)) {
    props.closeCarousel();
  }
};

watch(
  () => props.open,
  () => {
    //  when modal opens make the value of currentIndex equal to the starting index
    currentIndex.value = startingIndex.value as number;

    // toggle focus when the modal opens
    if (props.open) {
      setTimeout(() => {
        activate();
      }, 500);
    } else {
      setTimeout(() => {
        deactivate();
      }, 200);
    }
  }
);

onMounted(() => {
  // when first opened set currentIndex to startingIndex.
  currentIndex.value = startingIndex.value as number;
  // set the handleCloseOnEscape when mounting the component
  document.addEventListener("keydown", handleCloseOnEscape);
});

// remove the event when un-mounting the component
onUnmounted(() => {
  document.removeEventListener("keydown", handleCloseOnEscape);
});

// the zoom of the image
const zoom = ref(1);

const handleIncreaseZoom = () => {
  if (zoom.value < 2) {
    zoom.value += 0.5;
  }
};

const handleDecreaseZoom = () => {
  if (zoom.value > 0.5) {
    zoom.value -= 0.5;
  }
};
</script>

<template>
  <div
    class="relative z-10"
    aria-label="media carousel"
    role="dialog"
    aria-modal="true"
  >
    <!--overlay-->
    <FadeTransition>
      <div
        v-show="props.open"
        class="fixed inset-0 bg-black bg-opacity-60 transition-opacity"
      ></div>
    </FadeTransition>

    <!--content-->
    <ScaleTransition>
      <div v-show="props.open" class="fixed inset-0 z-10 overflow-y-auto">
        <div
          v-if="props.startingId"
          ref="carousel"
          class="h-full flex flex-col p-5"
        >
          <!--toolbar-->
          <Toolbar
            :is-image="Boolean(selectedAttachment.type === 'image')"
            :handle-close-carousel="handleCloseCarousel"
            :handle-increase-zoom="handleIncreaseZoom"
            :handle-decrease-zoom="handleDecreaseZoom"
          />

          <div class="h-full flex justify-between">
            <!--Left controls-->
            <div class="flex items-center justify-end mr-5">
              <IconButton
                title="previous"
                @click="handlePreviousItem"
                aria-label="previous item"
                :class="{ invisible: !thereIsPrevious() }"
                variant="ghost"
              >
                <ChevronLeftIcon
                  class="md:w-8 md:h-8 xs:w-5 xs:h-5 text-white opacity-80 hover:opacity-100"
                />
              </IconButton>
            </div>

            <div
              class="w-full h-full px-5 flex items-center justify-center overflow-hidden"
            >
              <!--Image-->
              <img
                class="w-auto md:max-w-[700px] xs:max-w-[340px] transition-transform duration-300"
                :style="{ transform: `scale(${zoom})` }"
                v-if="selectedAttachment.type === 'image'"
                :src="selectedAttachment?.url"
                :key="selectedAttachment.id"
                :alt="selectedAttachment.name"
              />

              <!--Video-->
              <VideoPlayer
                :id="'video-player-' + selectedAttachment.id"
                v-if="selectedAttachment.type === 'video'"
                :url="selectedAttachment.url"
                :thumbnail="(selectedAttachment.thumbnail as string)"
                :key="selectedAttachment.id"
              />
            </div>

            <!--right controls-->
            <div class="flex items-center justify-end ml-5">
              <IconButton
                title="next"
                aria-label="next item"
                :class="{ invisible: !thereIsNext() }"
                @click="handleNextItem"
                variant="ghost"
              >
                <ChevronRightIcon
                  class="md:w-8 md:h-8 xs:w-5 xs:h-5 text-white opacity-80 hover:opacity-100"
                />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </ScaleTransition>
  </div>
</template>
