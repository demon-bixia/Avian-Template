<script setup lang="ts">
import { defineProps, ref } from 'vue'
import { VideoPlayer } from '@videojs-player/vue'

import 'video.js/dist/video-js.css'

import { PlayIcon, PauseIcon, SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/vue/24/solid";

const props = defineProps<{
    url: string,
    thumbnail: string
}>();
</script>

<template>
    <div class="basis-[90%] flex justify-center items-center">
        <!--player-->
        <VideoPlayer class="max-w-[90%] max-h-[90%] flex justify-center items-center" :src="props.url"
            :poster="props.thumbnail" fill responsive controls disablePictureInPicture>
        </VideoPlayer>
    </div>
</template>

<style>
.video-js .vjs-big-play-button {
    top: unset;
    left: unset;
}
</style>