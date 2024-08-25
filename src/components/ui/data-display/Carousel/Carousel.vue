<script setup lang="ts">
import type { Ref } from "vue";
import type { IAttachment, IConversation } from "@src/types";

import { computed, inject, onMounted, onUnmounted, ref, watch } from "vue";

import { hasAttachments } from "@src/utils";
import { useFocusTrap } from "@vueuse/integrations/useFocusTrap";
import VideoPlayer from "@src/components/ui/data-display/VideoPlayer.vue";
import IconButton from "@src/components/ui/inputs/IconButton.vue";
import Toolbar from "@src/components/ui/data-display/Carousel/Toolbar.vue";
import ScaleTransition from "@src/components/ui/transitions/ScaleTransition.vue";
import FadeTransition from "@src/components/ui/transitions/FadeTransition.vue";
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

// the value of the css visibility property
const imageInvisibility = ref(true);

// (event) set moved to false and then close modal
const handleCloseCarousel = () => {
  moved.value = false;
  zoom.value = 1;
  props.closeCarousel();
};

// check if there is a next attachment.
const isThereANext = () => {
  let length = (attachments.value as IAttachment[])?.length;
  return length > 0 && !(currentIndex.value + 1 >= length);
};

// check if there is a previous attachment.
const isThereAPrevious = () => {
  let length = (attachments.value as IAttachment[])?.length;
  return length > 0 && !(currentIndex.value <= 0);
};

// (event) increase selectedIndex if there is a next attachment.
const handleMoveToNextItem = () => {
  if (isThereANext()) {
    zoom.value = 1;
    moved.value = true;
    (currentIndex.value as number)++;
    imageInvisibility.value = true;
  }
};

// (event) increase selectedIndex if there is a previous attachment.
const handleMoveToPreviousItem = () => {
  if (isThereAPrevious()) {
    zoom.value = 1;
    moved.value = true;
    (currentIndex.value as number)--;
    imageInvisibility.value = true;
  }
};

// when modal opens make the value of currentIndex equal to the starting index
watch(
  () => props.open,
  () => {
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
  },
);

// image element ref
const image = ref<HTMLImageElement | null>(null);

// the scale of the image
const zoom = ref(1);
// (event) increases the scale of the image
const handleIncreaseZoom = () => {
  if (zoom.value < 2) {
    zoom.value += 0.5;
  }
};
// (event) decreases the scale of the image
const handleDecreaseZoom = () => {
  if (zoom.value > 0.5) {
    zoom.value -= 0.5;
  }
};

const imageLeft = ref(0);
const imageTop = ref(0);
const startingPositionX = ref(0);
const startingPositionY = ref(0);
// (event) add the event listener that will move the image
const handleStartMovingImage = (event: any) => {
  event.preventDefault();
  startingPositionX.value = event.clientX;
  startingPositionY.value = event.clientY;
  document.addEventListener("mousemove", handleMovingImage);
  document.addEventListener("mouseup", () => {
    document.removeEventListener("mousemove", handleMovingImage);
  });
};
// (event) move then image when the cursor starts moving
const handleMovingImage = (event: any) => {
  if (image.value) {
    // calculate the new position
    const newPositionX = startingPositionX.value - event.clientX;
    const newPositionY = startingPositionY.value - event.clientY;
    // with each move we also want to update the start X and Y
    startingPositionX.value = event.clientX;
    startingPositionY.value = event.clientY;
    // set the element's new position:
    imageTop.value = image.value.offsetTop - newPositionY;
    imageLeft.value = image.value.offsetLeft - newPositionX;
  }
};

// (event) runs when a new image loads
const handleImageLoad = (event: any) => {
  if (event.target) {
    setTimeout(() => {
      // make the image visible
      imageInvisibility.value = false;
    }, 200);

    if (event.target.tagName === "IMG") {
      // set the default zoom and position
      imageLeft.value = window.innerWidth / 2 - event.target.offsetWidth / 2;
      imageTop.value = window.innerHeight / 2 - event.target.offsetHeight / 2;
    }
  }
};

// (event) closes carousel on escape and changes images when pressing the arrow keys
const handleKeyboardEvents = (event: KeyboardEvent) => {
  if (["Escape", "Esc"].includes(event.key)) {
    handleCloseCarousel();
  } else if (event.key === "ArrowLeft") {
    handleMoveToPreviousItem();
  } else if (event.key === "ArrowRight") {
    handleMoveToNextItem();
  } else if (event.key === "+") {
    handleIncreaseZoom();
  } else if (event.key === "-") {
    handleDecreaseZoom();
  }
};

// reset the currentIndex and listen to keyboard events
onMounted(() => {
  currentIndex.value = startingIndex.value as number;
  document.addEventListener("keydown", handleKeyboardEvents);
});

// stop listening to keyboard events
onUnmounted(() => {
  document.removeEventListener("keydown", handleKeyboardEvents);
});
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
      <div v-show="props.open" class="fixed inset-0 z-10">
        <div
          v-if="props.startingId"
          ref="carousel"
          class="h-full flex flex-col"
        >
          <!--toolbar-->
          <Toolbar
            class="absolute right-0 z-30 mr-5 mt-5"
            :is-image="Boolean(selectedAttachment.type === 'image')"
            :handle-close-carousel="handleCloseCarousel"
            :handle-increase-zoom="handleIncreaseZoom"
            :handle-decrease-zoom="handleDecreaseZoom"
          />

          <div
            class="relative w-full h-full flex items-center justify-center overflow-hidden"
          >
            <!--Left controls-->
            <IconButton
              title="previous"
              aria-label="previous item"
              @click="handleMoveToPreviousItem"
              :class="{ hidden: !isThereAPrevious() }"
              class="ic-btn-contained-glass absolute top-[50%] z-30 left-0 flex items-center justify-center mr-5 ml-5 p-4"
            >
              <ChevronLeftIcon class="w-6 h-6" />
            </IconButton>

            <!--Image-->
            <img
              class="absolute w-auto md:max-w-[43.75rem] xs:max-w-[21.25rem] cursor-grab transition-[transform,opacity] duration-200"
              :class="{ 'opacity-0': imageInvisibility }"
              :style="{
                transform: `scale(${zoom})`,
                top: `${imageTop}px`,
                left: `${imageLeft}px`,
              }"
              v-if="selectedAttachment.type === 'image'"
              :src="selectedAttachment?.url"
              :key="selectedAttachment.id"
              :alt="selectedAttachment.name"
              ref="image"
              @load="handleImageLoad"
              @mousedown="handleStartMovingImage"
            />

            <!--Video-->
            <VideoPlayer
              class="transition-[transform,opacity] duration-200"
              :class="{ 'opacity-0': imageInvisibility }"
              :id="'video-player-' + selectedAttachment.id"
              v-if="selectedAttachment.type === 'video'"
              :url="selectedAttachment.url"
              :name="selectedAttachment.name"
              :thumbnail="<string>selectedAttachment.thumbnail"
              :key="selectedAttachment.id"
              @videoLoad="handleImageLoad"
            />

            <!--right controls-->
            <IconButton
              title="next"
              aria-label="next item"
              @click="handleMoveToNextItem"
              :class="{ hidden: !isThereANext() }"
              class="ic-btn-contained-glass absolute top-[50%] z-30 right-0 flex items-center justify-center p-4 ml-5 mr-5"
            >
              <ChevronRightIcon class="w-6 h-6" />
            </IconButton>
          </div>
        </div>
      </div>
    </ScaleTransition>
  </div>
</template>
