<script setup lang="ts">
import { XCircleIcon } from "@heroicons/vue/24/outline";

import { Message } from "../../../../stores/chat";

import SlideTransition from "../../../reusables/transitions/SlideTransition.vue";
import ReplyPreview from "../ReplyPreview.vue";
import IconButton from "../../../reusables/IconButton.vue";

const props = defineProps<{
    selectedMessageToReplyTo?: Message,
    removeMessageToReplyTo: () => void,
}>();
</script>

<template>
    <SlideTransition animation="slide-up">
        <div class="absolute bottom-0 w-full p-5 bg-white dark:bg-gray-800 flex items-center justify-between"
            v-if="props.selectedMessageToReplyTo">
            <!--selected message overview-->
            <ReplyPreview :message="(props.selectedMessageToReplyTo as Message)" />

            <!--close selected Message-->
            <IconButton @click="removeMessageToReplyTo" class="group">
                <XCircleIcon class="w-[20px] h-[20px] text-gray-300 group-hover:text-red-300" />
            </IconButton>
        </div>
    </SlideTransition>
</template>