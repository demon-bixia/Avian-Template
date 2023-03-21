<script setup lang="ts">
import { ref } from "vue";
import { VideoPlayer } from "@videojs-player/vue";
import {
  PlayIcon,
  PauseIcon,
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
} from "@heroicons/vue/24/solid";
import RangeSlider from "@src/components/ui/inputs/RangeSlider.vue";

import "video.js/dist/video-js.css";

const props = defineProps<{
  id: string;
  url: string;
  thumbnail: string;
}>();

const percentage = ref(0);

const fullScreen = ref(false);

const handleTimeChange = (event: any) => {
  percentage.value = Math.floor(
    (event.target.player.cache_.currentTime /
      event.target.player.cache_.duration) *
      100
  );
};

const handleTrackInput = (value: any, player: any, state: any) => {
  player.currentTime((value / 100) * state.duration);
};
</script>

<template>
  <div class="flex justify-center items-center">
    <!--player-->
    <VideoPlayer
      @timeupdate="handleTimeChange"
      class="video-player xs:w-[340px] md:w-[700px] xs:h-[200px] md:h-[370px]"
      :src="props.url"
      :poster="props.thumbnail"
    >
      <template v-slot="{ player, state }">
        <div
          class="custom-player-controls absolute w-full h-full p-6 flex flex-col justify-center items-center bg-black bg-opacity-0 hover:bg-opacity-30 transition duration-200"
          :class="{ 'bg-opacity-30': !state.playing }"
        >
          <div class="basis-[85%] flex justify-center items-center">
            <!--play button-->
            <button
              v-if="!state.playing"
              @click="state.playing ? player.pause() : player.play()"
              class="control-button p-4 mt-7 rounded-full bg-white bg-opacity-20 transition-all duration-200"
            >
              <PlayIcon class="w-7 h-7 text-white" />
            </button>

            <!--pause button-->
            <button
              v-if="state.playing"
              @click="state.playing ? player.pause() : player.play()"
              class="control-button p-4 mt-7 rounded-full bg-white bg-opacity-20 transition-all duration-200"
              :class="{ invisible: state.playing }"
            >
              <PauseIcon class="w-7 h-7 text-white" />
            </button>
          </div>

          <!--controls-->
          <div
            class="controls basis-[15%] w-full h-full flex items-end invisible transition duration-200"
          >
            <div
              class="w-full flex p-5 justify-center items-center bg-white bg-opacity-20 rounded-[12px]"
            >
              <!--pause button-->
              <button v-if="state.playing" class="mr-5">
                <PauseIcon class="w-5 h-5 text-white" />
              </button>

              <!--play button-->
              <button v-if="!state.playing" class="mr-5">
                <PlayIcon class="w-5 h-5 text-white" />
              </button>

              <!--track slider-->
              <RangeSlider
                :id="props.id"
                :percentage="percentage"
                class="w-full mr-5 video-slider"
                @value-change="
                  ($event) => handleTrackInput($event, player, state)
                "
              />

              <!--size controls-->
              <div>
                <!--maximize button-->
                <button
                  v-if="!fullScreen"
                  @click="
                    () => {
                      fullScreen = !fullScreen;
                      player.enterFullWindow();
                    }
                  "
                >
                  <ArrowsPointingOutIcon class="w-5 h-5 text-white" />
                </button>
                <!--minimize button-->
                <button
                  v-if="fullScreen"
                  @click="
                    () => {
                      fullScreen = !fullScreen;
                      player.exitFullWindow();
                    }
                  "
                >
                  <ArrowsPointingInIcon class="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </template>
    </VideoPlayer>
  </div>
</template>

<style>
/* set the button background */
.video-player .control-button {
  background: rgba(255, 255, 255, 0.3) !important;
}

/* show pause button when the user hovers over the video */
.video-player:hover .custom-player-controls .control-button {
  visibility: visible !important;
}

.video-player:hover .custom-player-controls .controls {
  visibility: visible !important;
}

.video-player .control-button:hover {
  background: rgba(255, 255, 255, 0.5) !important;
}

.video-player .vjs-poster {
  background-size: cover !important;
}
</style>
