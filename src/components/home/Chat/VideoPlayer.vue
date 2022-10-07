<script setup lang="ts">
import { VideoPlayer } from '@videojs-player/vue';

import 'video.js/dist/video-js.css';


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