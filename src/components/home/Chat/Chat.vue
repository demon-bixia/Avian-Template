<script setup lang="ts">
import { computed } from "vue";

import useChatStore from "../../../stores/chat";

import loading3 from "../../reusables/loading/loading3.vue";
import NoChatSelected from "../../reusables/emptyStates/NoChatSelected.vue";
import SelectedChat from "./SelectedChat.vue";


const chat = useChatStore();

// search the selected conversation using activeConversationId.
const activeConversation = computed(() => {
    let activeConversation = chat.conversations?.find(conversation => conversation.id === chat.activeConversationId);

    if (activeConversation)
        return activeConversation;
    else
        return chat.archivedConversations?.find(conversation => conversation.id === chat.activeConversationId);
});

// the active chat component or loading component.
const activeChatComponent = computed(() => {
    if (chat.status === 'loading' || chat.delayLoading)
        return loading3;
    else if (chat.activeConversationId)
        return SelectedChat;
    else
        return NoChatSelected;
});


</script>

<template>
    <div id="mainContent"
        class="xs:absolute xs:z-10 md:static grow h-full xs:w-full md:w-fit scrollbar-hidden bg-white dark:bg-gray-800 transition-all duration-500"
        :class="chat.conversationOpen === 'open' ? ['xs:left-[0px]','xs:static'] : ['xs:left-[1000px]']" role="region">
        <Transition name="fade" mode="out-in">
            <component :is="activeChatComponent" :active-conversation="activeConversation"
                :key="activeConversation?.id" />
        </Transition>
    </div>
</template>

<style scoped>
@media only screen and (min-width: 969px) {

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.2s ease-in;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
}
</style>