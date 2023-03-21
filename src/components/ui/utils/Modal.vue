<script setup lang="ts">
import { useFocusTrap } from "@vueuse/integrations/useFocusTrap";
import type { Ref } from "vue";
import { onMounted, onUnmounted, ref, watch } from "vue";

import SlideTransition from "@src/components/ui/transitions/SlideTransition.vue";

const props = defineProps<{
  open: boolean;
  closeModal: () => void;
}>();

const modal: Ref<HTMLElement | undefined> = ref();

const { activate, deactivate } = useFocusTrap(modal);

// (event) close modal when clicking outside
const closeOnClick = (event: Event) => {
  if ((event.target as HTMLDivElement).id === "close-modal") {
    props.closeModal();
  }
};

// (event) close modal when typing esc button
const handleCloseOnEscape = (event: KeyboardEvent) => {
  if (["Escape", "Esc"].includes(event.key)) {
    props.closeModal();
  }
};

// set the handleCloseOnEscape when mounting the component
onMounted(() => {
  document.addEventListener("keydown", handleCloseOnEscape);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleCloseOnEscape);
  // remove the event when un-mounting the component
});

// toggle focus when the modal opens
watch(
  () => props.open,
  () => {
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
</script>

<template>
  <div
    role="dialog"
    class="relative z-20"
    :aria-hidden="!props.open"
    aria-labelledby="modal-title"
    aria-modal="true"
  >
    <!--overlay-->
    <Transition name="fade">
      <div
        v-show="props.open"
        class="fixed inset-0 bg-black bg-opacity-60 transition-opacity"
      ></div>
    </Transition>

    <!--modal-->
    <SlideTransition animation="slide-down">
      <div
        v-show="props.open"
        class="fixed inset-0 z-10 h-full overflow-y-auto"
      >
        <div
          ref="modal"
          @click="closeOnClick"
          id="close-modal"
          class="h-full flex items-center justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <!--content-->
          <slot name="content"></slot>
        </div>
      </div>
    </SlideTransition>
  </div>
</template>

<style scoped>
.fade-enter-active {
  transition: opacity 0.1s ease;
}

.fade-leave-active {
  transition: opacity 0.6s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
