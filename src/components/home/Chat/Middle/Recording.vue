<script setup lang="ts">
import { PauseIcon, PlayIcon } from "@heroicons/vue/24/solid";
import { ref } from "vue";

import { Recording } from "../../../../stores/chat";

import RangeSlider from "../../../reusables/RangeSlider.vue";
import Typography from "../../../reusables/Typography.vue";

const props = defineProps<{ recording: Recording; self?: boolean }>();

const playing = ref(false);

const handleTogglePlay = () => {
  playing.value = !playing.value;
};
</script>

<template>
  <div
    class="flex items-center outline-none"
    tabindex="0"
    aria-label="audio message"
  >
    <button
      @click="handleTogglePlay"
      class="p-4 mr-4 flex justify-center items-center rounded-full outline-none transition-all duration-200"
      :class="
        props.self
          ? ['bg-white', 'hover:bg-gray-100', 'active:bg-gray-200']
          : [
              'bg-indigo-100',
              'hover:bg-indigo-200',
              'active:bg-indigo-300',
              'dark:bg-gray-400',
              'dark:hover:bg-gray-300',
              'dark:focus:bg-gray-300',
              'dark:active:bg-gray-300',
            ]
      "
      :aria-label="playing ? 'pause' : 'play'"
    >
      <PauseIcon
        v-if="playing"
        class="w-5 h-5 stroke-1"
        :class="props.self ? ['text-gray-500'] : ['text-indigo-500']"
      />
      <PlayIcon
        v-else
        class="w-5 h-5 stroke-1"
        :class="
          props.self
            ? ['text-gray-500']
            : ['text-indigo-500', 'dark:text-gray-50']
        "
      />
    </button>

    <div class="w-12 mr-4">
      <RangeSlider :initial-value="0" :self="props.self" />
    </div>

    <Typography
      variant="body-1"
      noColor
      :class="props.self ? ['text-white'] : ['text-black', 'opacity-60']"
      tabindex="0"
      aria-label="11 seconds"
    >
      00:11
    </Typography>
  </div>
</template>
