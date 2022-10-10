<script setup lang="ts">
import { ArrowUturnLeftIcon } from "@heroicons/vue/24/outline";
import { computed } from 'vue';

import { Conversation, Message } from '../../../../stores/chat';
import { hasAttachments } from "../../../../utils";

import NoMedia from "../../../reusables/emptyStates/NoMedia.vue";
import SearchInput from "../../../reusables/SearchInput.vue";
import Typography from "../../../reusables/Typography.vue";
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
            <Typography id="modal-title" variant="heading-1" tabindex="0">
                Shared Media
            </Typography>

            <button @click="$emit('active-page-change', {tabName: 'conversationInfo', animationName: 'slide-right'})"
                class="group p-2 border rounded-full border-gray-200  
                        dark:border-white dark:border-opacity-70  focus:outline-none focus:border-indigo-100 
                        focus:bg-indigo-100 hover:bg-indigo-100 hover:border-indigo-100 dark:hover:border-indigo-400 
                        dark:hover:bg-indigo-400 dark:focus:bg-reindigod-400 dark:focus:border-indigo-400 transition-all duration-200 outline-none">
                <ArrowUturnLeftIcon
                    class="w-5 h-5 text-black opacity-50 dark:text-white  dark:opacity-70 group-hover:text-indigo-500 group-hover:opacity-100 dark:group-hover:text-white" />
            </button>
        </div>

        <!--search-->
        <div class="mb-5 mx-5">
            <SearchInput />
        </div>

        <!--media messages-->
        <div class="overflow-y-scroll scrollbar scrollbar-hidden max-h-[222px]">
            <div v-if="(attachmentMessages as Message[]).length > 0" v-for="(message, index) in attachmentMessages"
                :key="index">
                <MediaItem v-for="(attachment, index) in message.attachments" :attachment="attachment"
                    :date="message.date" :key="index" />
            </div>

            <NoMedia v-else vertical />
        </div>
    </div>
</template>