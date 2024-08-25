<script setup lang="ts">
import { ref } from "vue";

import {
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
  PauseIcon,
  PlayIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/vue/24/solid";
import RangeSlider from "@src/components/ui/inputs/RangeSlider.vue";
import { VideoPlayer } from "@videojs-player/vue";

import "video.js/dist/video-js.css";

defineEmits(["videoLoad"]);

const props = defineProps<{
  id: string;
  url: string;
  name?: string;
  thumbnail: string;
}>();

// if the fullscreen is toggled or not
const fullScreen = ref(false);

// percentage of the video that played
const percentage = ref(0);

// value representing the volume
const volume = ref(0);

// controls showing the volume slider when hovering over mute/unmute buttons
const volumeSliderInvisible = ref(false);

// tells us if the video was started
const started = ref(false);

// (event) mute and unmute the audio of the video
const handleToggleMute = (player: any) => {
  player.muted(!player.muted());
};

// (event) increases and decreases volume based on the volume range slider location
const handleVolumeSliderChange = (value: any, player: any) => {
  player.volume(value / 100);
};

// (event) update the volume ref when the video volume changes
const handleVolumeChange = (event: any) => {
  volume.value = event.target.player.volume() * 100;
};

// (event) increase and decrease the percentage based on the video time
const handleTimeChange = (event: any) => {
  percentage.value =
    (event.target.player.cache_.currentTime /
      event.target.player.cache_.duration) *
    100;
};

// (event) change the current time of the video based on the slider's value
const handleTrackInput = (value: any, player: any, state: any) => {
  player.currentTime((value / 100) * state.duration);
};

// (event) pause and play the video
const handleToggleVideo = (state: any, player: any) => {
  if (!state.playing && !started.value) {
    started.value = true;
    volume.value = player.volume() * 100;
  }
  state.playing ? player.pause() : player.play();
};
</script>

<template>
  <VideoPlayer
    class="video-player"
    :src="props.url"
    :poster="props.thumbnail"
    @timeupdate="handleTimeChange"
    @volumechange="handleVolumeChange"
    @loadstart="(event) => $emit('videoLoad', event)"
  >
    <template v-slot="{ player, state }">
      <div class="overlay-container">
        <!--video title-->
        <div v-if="props.name" class="video-title">
          <p class="body-5">{{ props.name }}</p>
        </div>

        <!--pause and start buttons-->
        <div class="pause-start-container">
          <!--play button-->
          <button
            v-if="!state.playing"
            @click="() => handleToggleVideo(state, player)"
            class="control-button play-button"
          >
            <PlayIcon class="icon large" />
          </button>
          <!--pause button-->
          <button
            v-if="state.playing"
            @click="() => handleToggleVideo(state, player)"
            class="control-button pause-button"
            :class="{ 'opacity-0': state.playing }"
          >
            <PauseIcon class="icon large" />
          </button>
        </div>

        <!--controls-->
        <div v-if="started" class="controls-container">
          <!--audio controls-->
          <div
            class="audio-controls-container"
            @mouseenter="volumeSliderInvisible = false"
            @mouseleave="volumeSliderInvisible = true"
          >
            <!--unmute button-->
            <button
              v-if="state.muted"
              class="mute-unmute-buttons"
              @click="() => handleToggleMute(player)"
            >
              <SpeakerXMarkIcon class="icon small" />
            </button>

            <!--mute button-->
            <button
              v-else
              class="mute-unmute-buttons"
              @click="() => handleToggleMute(player)"
            >
              <SpeakerWaveIcon class="icon small" />
            </button>

            <!--audio slider-->
            <div
              class="volume-slider-container"
              :style="{ opacity: volumeSliderInvisible ? 0 : 1 }"
            >
              <RangeSlider
                @value-changed="
                  ($event) => handleVolumeSliderChange($event, player)
                "
                :percentage="volume"
                class="volume-slider"
                aria-label="volume change slider"
              />
            </div>
          </div>

          <!--pause button-->
          <button
            v-if="state.playing"
            class="pause-play-buttons"
            @click="() => handleToggleVideo(state, player)"
          >
            <PauseIcon class="icon small" />
          </button>

          <!--play button-->
          <button
            v-if="!state.playing"
            class="pause-play-buttons"
            @click="() => handleToggleVideo(state, player)"
          >
            <PlayIcon class="icon small" />
          </button>

          <!--track slider-->
          <RangeSlider
            class="track-slider"
            :percentage="percentage"
            aria-label="time track slider"
            @value-changed="($event) => handleTrackInput($event, player, state)"
          />

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
            <ArrowsPointingOutIcon class="icon small" />
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
            <ArrowsPointingInIcon class="icon small" />
          </button>
        </div>
      </div>
    </template>
  </VideoPlayer>
</template>

<style>
.video-player {
  border-radius: 12px;
  overflow: hidden;

  /** the video thumbnail */
  .vjs-poster {
    background-size: cover !important;
  }

  /* the overlay that contains the title and controls */
  .overlay-container {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background: rgba(0, 0, 0, 0);
    transition: all 200ms ease;

    &:hover {
      background: rgba(0, 0, 0, 0.3);
    }

    /** the icons in the overlay container */
    .icon {
      color: white;
      &.small {
        width: 16px;
        height: 16px;
      }
      &.large {
        width: 32px;
        height: 32px;
      }
    }

    /* video title container */
    .video-title {
      width: 100%;
      padding: 16px;
      background: rgba(255, 255, 255, 0.2);
      opacity: 0;
      transition: all 200ms ease;
    }

    /* pause and start container */
    .pause-start-container {
      position: absolute;
      top: calc(50% - 56px / 2);
      display: flex;
      justify-content: center;
      align-items: center;

      .control-button {
        padding: 12px;
        border-radius: 100%;
        background: rgba(255, 255, 255, 0.2);
        transition: all 200ms ease;
      }

      .pause-button {
        opacity: 0;
        &:hover {
          background: rgba(255, 255, 255, 0.5) !important;
        }
      }
    }

    /** contains the audio, play, time, and size controls */
    .controls-container {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      padding: 16px;
      background: rgba(255, 255, 255, 0.2);
      opacity: 0;
      transition: all 200ms ease;

      /** contains the mute audio buttons and range slider */
      .audio-controls-container {
        position: relative;

        /** contains the range slider */
        .volume-slider-container {
          position: absolute;
          bottom: 75px;
          right: -85%;
          transform: rotate(270deg);
          width: 100px;
          padding: 8px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.2);
        }

        /** the mute and unmute buttons */
        .mute-unmute-buttons {
          margin-right: 16px;
        }

        /* the slider that controls the video volume */
        .volume-slider {
          width: 100%;
          margin-right: 16px;
        }
      }

      /** the pause and play buttons */
      .pause-play-buttons {
        margin-right: 16px;
      }

      /** the slider that changes the video curren time */
      .track-slider {
        width: 100%;
        margin-right: 16px;
      }
    }
  }

  /* show the video title  */
  &:hover .overlay-container .video-title {
    opacity: 1;
  }

  /* show pause button when the user hovers over the video */
  &:hover .overlay-container .pause-start-container .control-button {
    opacity: 1;
  }

  /** show the controls on the bottom when the user hovers over the video */
  &:hover .overlay-container .controls-container {
    opacity: 1;
  }
}

/** tablets and above */
@media (min-width: 60.5rem) {
  .video-player {
    width: 546.39px;
    height: 301px;
  }
}

/** mobile */
@media (max-width: 60.4rem) {
  .video-player {
    width: 346px;
    height: 191px;

    .overlay-container
      .controls-container
      .audio-controls-container
      .volume-slider-container {
      bottom: 60px;
      right: -30%;
      width: 70px;
    }
  }
}
</style>
