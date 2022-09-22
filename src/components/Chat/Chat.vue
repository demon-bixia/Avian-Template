<script setup lang="ts">
import { computed } from "vue";
import useChatStore from "../../stores/chat";
import NoChatSelected from "./NoChatSelected.vue";
import SelectedChat from "./SelectedChat.vue";
import FadeTransition from "../transitions/FadeTransition.vue";
import loading3 from "../loading/loading3.vue";

const chat = useChatStore();

const activeConversation = computed(() => chat.conversations?.find(conversation => conversation.id === chat.activeConversationId));

const getChat = () => {
    if (chat.status === 'loading' || chat.delayLoading) {
        return loading3;
    }
    else if (activeConversation) {
        return SelectedChat;
    } else {
        return NoChatSelected;
    }
};
</script>

<template>
    <div class="grow">
        <FadeTransition name="fade" mode="out-in">
            <component :active-conversation="activeConversation" :key="activeConversation?.id" :is="getChat()" />
        </FadeTransition>
    </div>
</template>