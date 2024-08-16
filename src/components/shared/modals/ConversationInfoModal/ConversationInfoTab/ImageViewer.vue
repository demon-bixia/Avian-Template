<script setup lang="ts">
import { XMarkIcon } from "@heroicons/vue/24/solid";

const props = defineProps<{
  open: boolean;
  imageUrl?: string;
  closeImage: () => void;
}>();
</script>

<template>
  <div
    class="relative z-10"
    aria-label="media carousel"
    role="dialog"
    aria-modal="true"
  >
    <!--overlay-->
    <Transition name="fade">
      <div
        v-show="props.open"
        class="fixed inset-0 bg-black bg-opacity-60 transition-opacity"
      ></div>
    </Transition>

    <Transition name="scale">
      <div v-show="props.open" class="fixed inset-0 z-10 overflow-y-auto">
        <div class="h-full flex flex-col p-5">
          <!--close viewer button-->
          <div class="w-full flex justify-end">
            <button
              @click="closeImage"
              class="rounded-full p-2 hover:bg-white hover:bg-opacity-10 active:bg-opacity-20 transition-all duration-200"
              aria-label="previous item"
            >
              <XMarkIcon class="w-7 h-7 text-white stroke-1" />
            </button>
          </div>

          <!--image-->
          <div class="h-full flex justify-between">
            <div
              class="w-full h-full px-5 flex items-center justify-center basis[90%]"
            >
              <img :src="(props.imageUrl as string)" alt="avatar" />
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.scale-enter-active {
  transition: all 0.2s ease-out;
}

.scale-leave-active {
  transition: all 0.1s ease-in;
}

.scale-enter-from {
  opacity: 0;
  transform: scale(0.75);
}

.scale-enter-to {
  opacity: 1;
  transform: scale(1);
}

.scale-leave-from {
  opacity: 1;
  transform: scale(1);
}

.scale-leave-to {
  opacity: 0;
  transform: scale(0.85);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
