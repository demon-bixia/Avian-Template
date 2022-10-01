<script setup lang="ts">
import { computed } from "vue";

import useChatStore from "../../stores/chat";

import loading3 from "../loading/loading3.vue";
import FadeTransition from "../transitions/FadeTransition.vue";
import SelectedChat from "./SelectedChat.vue";

const chat = useChatStore();

// search the selected conversation using activeConversationId.
const activeConversation = computed(() => chat.conversations?.find(conversation => conversation.id === chat.activeConversationId));

// the active chat component or loading component.
const activeChatComponent = computed(() => {
    if (chat.status === 'loading' || chat.delayLoading)
        return loading3;
    else if (activeConversation)
        return SelectedChat;
});
</script>

<template>
    <div class="grow">
        <FadeTransition>
            <component :is="activeChatComponent" :active-conversation="activeConversation"
                :key="activeConversation?.id" />
        </FadeTransition>
    </div>
</template>