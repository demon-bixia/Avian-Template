<script setup lang="ts">
import type { IRecording } from "@custom_types/store";
import type { Ref } from "vue";

import { ref, onMounted, onUnmounted, computed } from "vue";

import { PauseIcon, PlayIcon } from "@heroicons/vue/24/outline";
import Typography from "@src/components/ui/data-display/Typography.vue";
import WaveSurfer from "wavesurfer.js";

const props = defineProps<{
  recording: IRecording;
  self?: boolean;
}>();

const wavesurfer: Ref<any> = ref(null);
const playing = ref(false);

const handleTogglePlay = () => {
  if (wavesurfer.value) {
    if (playing.value) {
      playing.value = false;
      wavesurfer.value.pause();
    } else {
      playing.value = true;
      wavesurfer.value.play();
    }
  }
};

// when mounted load the audio
onMounted(() => {
  wavesurfer.value = WaveSurfer.create({
    container: document.querySelector("#waveform-" + props.recording.id),
    waveColor: "rgb(209 213 219)",
    progressColor: "rgb(165 180 252)",
    cursorColor: "transparent",
    barWidth: 1,
    barRadius: 1,
    cursorWidth: 1,
    height: 30,
    barGap: 5,
  });

  // load the audio
  wavesurfer.value.load("../../../../../../src/assets/sounds/sound.mp3");
});

// when the component is unmounted stop thr audio
onUnmounted(() => {
  wavesurfer.value.pause();
});
</script>

<template>
  <div
    class="flex items-center outline-none"
    tabindex="0"
    aria-label="audio message"
  >
    <button
      @click="handleTogglePlay"
      class="p-4 mr-4 flex justify-center items-center rounded-[12px] outline-none transition-all duration-200 bg-indigo-300 active:bg-indigo-400"
      :aria-label="playing ? 'pause' : 'play'"
    >
      <PauseIcon v-if="playing" class="w-5 h-5 text-white" />
      <PlayIcon v-else class="w-5 h-5 text-white" />
    </button>

    <div :id="'waveform-' + props.recording.id" class="mr-4 w-[150px]"></div>

    <Typography
      variant="body-1"
      noColor
      class="text-black dark:text-white opacity-40 dark:opacity-70"
      tabindex="0"
      aria-label="11 seconds"
    >
      00:11
    </Typography>
  </div>
</template>
