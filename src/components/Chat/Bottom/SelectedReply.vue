<script setup lang="ts">
import { XCircleIcon } from "@heroicons/vue/24/outline";
import { defineProps } from "vue";

import { Message } from "../../../stores/chat";

import SlideTransition from "../../transitions/SlideTransition.vue";
import ReplyPreview from "../ReplyPreview.vue";

const props = defineProps<{
    selectedMessageToReplyTo?: Message,
    removeMessageToReplyTo: () => void,
}>();
</script>

<template>
    <SlideTransition animation="slide-up">
        <div class="absolute bottom-0 w-full p-5 bg-white flex items-center justify-between"
            v-if="props.selectedMessageToReplyTo">
            <!--selected message overview-->
            <ReplyPreview :message="(props.selectedMessageToReplyTo as Message)" />

            <!--close selected Message-->
            <button @click="removeMessageToReplyTo"
                class="group outline-none rounded-full w-7 h-7 mr-5 flex justify-center items-center transition-all duration-200 focus:outline-none focus:bg-gray-50 hover:bg-gray-50">
                <XCircleIcon class="w-[20px] h-[20px] text-gray-300 group-hover:text-red-300" />
            </button>
        </div>
    </SlideTransition>
</template>