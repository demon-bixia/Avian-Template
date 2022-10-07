<script setup lang="ts">
import type { Ref } from "vue";
import { ref } from "vue";

import { Conversation as ConversationType, Message } from "../../../stores/chat";

import Bottom from "./Bottom/Bottom.vue";
import Middle from "./Middle/Middle.vue";
import Top from "./Top.vue";

const props = defineProps<{
    activeConversation: ConversationType
}>();

// the message you want to reply to
const selectedMessageToReplyTo: Ref<Message | undefined> = ref();

// set the selected message for a reply
const selectMessageToReplyTo = (message?: Message) => {
    selectedMessageToReplyTo.value = message;
};

// remove the selected message for reply
const removeMessageToReplyTo = () => {
    selectedMessageToReplyTo.value = undefined;
};
</script>

<template>
    <div class="h-full flex flex-col">
        <Top :active-conversation="props.activeConversation" />

        <Middle :active-conversation="props.activeConversation" :select-message-to-reply-to="selectMessageToReplyTo" />

        <Bottom :active-conversation="props.activeConversation" :selected-message-to-reply-to="selectedMessageToReplyTo"
            :remove-message-to-reply-to="removeMessageToReplyTo" />
    </div>
</template>