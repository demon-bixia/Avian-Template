<script setup lang="ts">
import { computed } from "vue";

import useChatStore from "../../../stores/chat";

import loading3 from "../../reusables/loading/loading3.vue";
import FadeTransition from "../../reusables/transitions/FadeTransition.vue";
import NoChatSelected from "./NoChatSelected.vue";
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
    else if (!activeConversation)
        return NoChatSelected;
});
</script>

<template>
    <div id="mainContent" class="grow dark:bg-gray-800 transition duration-500" role="region">
        <FadeTransition>
            <component :is="activeChatComponent" :active-conversation="activeConversation"
                :key="activeConversation?.id" />
        </FadeTransition>
    </div>
</template>