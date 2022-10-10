<script setup lang="ts">
import { XCircleIcon } from "@heroicons/vue/24/outline";

import { Message } from "../../../../stores/chat";

import IconButton from "../../../reusables/IconButton.vue";
import SlideTransition from "../../../reusables/transitions/SlideTransition.vue";
import ReplyPreview from "../MessagePreview.vue";

const props = defineProps<{
    selectedMessageToReplyTo?: Message,
    removeMessageToReplyTo: () => void,
}>();
</script>

<template>
    <SlideTransition animation="shelf-up">
        <div class="absolute bottom-0 w-full px-5 py-2 bg-white dark:bg-gray-800 flex items-center justify-between transition-all duration-200"
            v-if="props.selectedMessageToReplyTo">
            <!--selected message overview-->
            <ReplyPreview :message="(props.selectedMessageToReplyTo as Message)" />

            <!--close selected Message-->
            <IconButton @click="removeMessageToReplyTo" class="group">
                <XCircleIcon class="w-[16px] h-[16px] text-gray-300 group-hover:text-red-300" />
            </IconButton>
        </div>
    </SlideTransition>
</template>