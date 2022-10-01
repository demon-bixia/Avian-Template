<script setup lang="ts">
import { PlayIcon, PauseIcon } from "@heroicons/vue/24/solid";
import { defineProps, ref } from "vue";

import { Recording } from "../../../stores/chat";

import RangeSlider from '../../utils/RangeSlider.vue';
import Typography from "../../utils/Typography.vue";

const props = defineProps<{ recording: Recording }>();

const playing = ref(false);

const handleTogglePlay = () => {
    playing.value = !playing.value;
};
</script>

<template>
    <div class="flex items-center">
        <button @click="handleTogglePlay"
            class="p-4 mr-4 flex justify-center items-center rounded-full bg-indigo-100 hover:bg-indigo-200 active:bg-indigo-300 transition-all duration-200">
            <PauseIcon v-if="playing" class="w-5 h-5 stroke-1 text-indigo-500" />
            <PlayIcon v-else class="w-5 h-5 stroke-1 text-indigo-500" />
        </button>

        <div class="w-12 mr-4">
            <RangeSlider :initial-value="0" />
        </div>

        <Typography variant="body-1">
            00:11
        </Typography>
    </div>
</template>