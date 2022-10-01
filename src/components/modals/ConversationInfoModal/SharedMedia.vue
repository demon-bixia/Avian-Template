<script setup lang="ts">
import { ArrowUturnLeftIcon } from "@heroicons/vue/24/outline";
import { computed, defineProps } from 'vue';

import { Conversation, Message } from '../../../stores/chat';
import { hasAttachments } from "../../../utils";

import SearchInput from '../../utils/SearchInput.vue';
import Typography from "../../utils/Typography.vue";
import MediaItem from "./MediaItem.vue";

const props = defineProps<{
    closeModal: () => void,
    conversation: Conversation,
}>();

// extract messages that contain attachments.
const attachmentMessages = computed(() => {
    let media: Message[] = [];

    for (let message of props.conversation.messages) {
        if (hasAttachments(message)) {
            media.push(message);
        }
    }
    return media;
})
</script>
    
<template>
    <div>
        <!--header-->
        <div class="mb-6 px-5 flex justify-between items-center">
            <Typography variant="heading-1">
                Shared Media
            </Typography>

            <button @click="$emit('active-page-change', {tabName: 'conversationInfo', animationName: 'slide-right'})"
                class="group p-2 border border-gray-200 text-black opacity-50 rounded-full text-sm  focus:outline-none focus:bg-indigo-100 hover:bg-indigo-100 hover:border-indigo-100 transition-all duration-200 outline-none">
                <ArrowUturnLeftIcon class="w-5 h-5 group-hover:text-indigo-500 stroke-1" />
            </button>
        </div>

        <!--search-->
        <div class="mb-5 mx-5">
            <SearchInput />
        </div>

        <!--media messages-->
        <div class="overflow-y-scroll scrollbar scrollbar-hidden h-[250px]">
            <div v-for="(message, index) in attachmentMessages" :key="index">
                <MediaItem v-for="(attachment, index) in message.attachments" :attachment="attachment"
                    :date="message.date" :key="index" />
            </div>
        </div>
    </div>
</template>