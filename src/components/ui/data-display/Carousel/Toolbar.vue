<script setup lang="ts">
import {
  XMarkIcon,
  MagnifyingGlassPlusIcon,
  MagnifyingGlassMinusIcon,
  TrashIcon,
} from "@heroicons/vue/24/outline";
import IconButton from "@src/components/ui/inputs/IconButton.vue";

const props = defineProps<{
  handleCloseCarousel: () => void;
  handleIncreaseZoom: () => void;
  handleDecreaseZoom: () => void;
  isImage: boolean;
}>();
</script>

<template>
  <div class="w-full flex justify-end mb-5">
    <!--decrease zoom-->
    <IconButton
      title="decrease zoom"
      v-show="props.isImage"
      aria-label="decrease zoom"
      class="mr-5"
      variant="ghost"
      @click="props.handleDecreaseZoom()"
    >
      <MagnifyingGlassMinusIcon
        class="md:w-6 md:h-6 xs:w-5 xs:h-5 text-white opacity-80 hover:opacity-100"
      />
    </IconButton>

    <!--increase zoom-->
    <IconButton
      title="increase zoom"
      v-show="props.isImage"
      aria-label="increase zoom"
      class="mr-5"
      variant="ghost"
      @click="props.handleIncreaseZoom()"
    >
      <MagnifyingGlassPlusIcon
        class="md:w-6 md:h-6 xs:w-5 xs:h-5 text-white opacity-80 hover:opacity-100"
      />
    </IconButton>

    <!--delete media-->
    <IconButton
      aria-label="delete attachment"
      class="mr-5"
      variant="ghost"
      title="delete attachment"
    >
      <TrashIcon
        class="md:w-6 md:h-6 xs:w-5 xs:h-5 text-white opacity-80 hover:opacity-100"
      />
    </IconButton>

    <!--close carousel-->
    <IconButton
      title="close carousel"
      aria-label="close carousel"
      @click="props.handleCloseCarousel()"
      variant="ghost"
    >
      <XMarkIcon
        class="md:w-6 md:h-6 xs:w-5 xs:h-5 text-white opacity-80 hover:opacity-100"
      />
    </IconButton>
  </div>
</template>
