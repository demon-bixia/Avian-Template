<script setup lang="ts">
import type { Ref } from "vue";
import { onMounted, provide, ref } from "vue";

import useAuthStore, { User } from "../../../../stores/auth";
import useChatStore, { Conversation, Message as MessageType } from "../../../../stores/chat";
import { getConversationIndex } from "../../../../utils";

import MessageBubble from "./MessageBubble.vue";
import TimelineDivider from "./TimelineDivider.vue";

const props = defineProps<{
    activeConversation?: Conversation,
    selectMessageToReplyTo: (message?: MessageType) => void
}>();

const auth = useAuthStore();

const chat = useChatStore()

const container: Ref<HTMLElement | null> = ref(null)

// checks whether the previous message was sent by the same user.
const isFollowUp = (index: number, previousIndex: number): boolean => {
    if (previousIndex < 0) {
        return false;
    } else {
        let previousSender = props.activeConversation?.messages[previousIndex].sender.id;
        let currentSender = props.activeConversation?.messages[index].sender.id;
        return previousSender === currentSender;
    }
};

// checks whether the message is sent by the authenticated user.
const isSelf = (message: MessageType): boolean => {
    return message.sender.id === (auth.user as User).id
};

// checks wether the new message has been sent in a new day or not.
const renderDivider = (index: number, previousIndex: number): boolean => {
    if (index === 3) {
        return true
    } else {
        return false
    }
};

// scroll messages to bottom.
onMounted(() => {
    (container.value as HTMLElement).scrollTop = (container.value as HTMLElement).scrollHeight;
});

// get message to reply to.
const getReplyToMessage = (message: MessageType) => {
    if (message.replyTo) {
        let replyToMessage = (props.activeConversation as Conversation).messages.find(item => item.id === message.replyTo);
        return replyToMessage;
    }
};

// (event) pin message to conversation
const handlePinMessage = (messageId: number) => {
    let activeConversationIndex = getConversationIndex((props.activeConversation as Conversation).id);

    if (activeConversationIndex !== undefined && activeConversationIndex !== null) {
        (chat.conversations as Conversation[])[activeConversationIndex].pinnedMessage = messageId;
        (chat.conversations as Conversation[])[activeConversationIndex].pinnedMessageHidden = false;
    }
};

// provide the active conversation to all children
provide('activeConversaion', props.activeConversation);
</script>

<template>
    <div ref="container" class="grow px-5 py-5 flex flex-col overflow-y-scroll scrollbar-hidden">
        <div v-if="chat.status !== 'loading'"
            v-for="(message, index) in (props.activeConversation as Conversation).messages" :key="index">
            <TimelineDivider v-if="renderDivider(index, index-1)" />

            <MessageBubble :message="message" :self="isSelf(message)" :follow-up="isFollowUp(index, index - 1)"
                :divider="renderDivider(index, index - 1)" :select-message-to-reply-to="props.selectMessageToReplyTo"
                :reply-to-message="getReplyToMessage(message)" :handle-pin-message="handlePinMessage" />
        </div>
    </div>
</template>
