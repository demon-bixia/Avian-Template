<script setup lang="ts">
import { PencilSquareIcon } from "@heroicons/vue/24/outline";

import type { Ref } from "vue";
import { ref, watch } from "vue";

import useChatStore, { Conversation as ConversationType } from "../../../../stores/chat";
import { getName } from "../../../../utils";

import IconButton from "../../../reusables/IconButton.vue";
import Loading1 from "../../../reusables/loading/Loading1.vue";
import SearchInput from "../../../reusables/SearchInput.vue";
import ComposeModal from "../../modals/ComposeModal/ComposeModal.vue";
import SidebarHeader from "../SidebarHeader.vue";
import Conversation from "./Conversation.vue";
import Typography from "../../../reusables/Typography.vue";
import NoConversation from "../../../reusables/emptyStates/NoConversation.vue";

const chat = useChatStore();

const searchText: Ref<string> = ref('');

const composeOpen = ref(false);

// the filterd list of conversations.
const filteredConversations: Ref<ConversationType[] | undefined> = ref(chat.conversations);

// filter the list of conversation based on search text.
watch(searchText, () => {
    filteredConversations.value = chat.conversations?.filter((conversation) => getName(conversation)?.includes(searchText.value.toLowerCase()));
});

// (event) switch between the rendered conversations.
const handleConversationChange = (conversationId: number) => {
    chat.activeConversationId = conversationId;
};

// (event) close the compose modal.
const closeComposeModal = () => {
    composeOpen.value = false;
};
</script>

<template>
    <div>
        <SidebarHeader>
            <!--title-->
            <template v-slot:title>Messages</template>

            <!--side actions-->
            <template v-slot:actions>
                <IconButton @click="composeOpen = true" aria-label="compose conversation">
                    <PencilSquareIcon class="w-[20px] h-[20px] text-indigo-300 hover:text-indigo-400 " />
                </IconButton>
            </template>
        </SidebarHeader>

        <!--search bar-->
        <div class="px-5 pb-5">
            <SearchInput v-model="searchText" />
        </div>

        <!--conversations-->
        <div role="list" aria-label="conversations" class="w-full h-full scroll-smooth scrollbar-hidden"
            style="overflow-x:visible; overflow-y: scroll;">
            <Loading1 v-if="chat.status === 'loading'  || chat.delayLoading" v-for="item in 6" />

            <Conversation role="listitem" :handle-conversation-change="handleConversationChange"
                :active-id="(chat.activeConversationId as number)"
                v-else-if="chat.status === 'success' && !chat.delayLoading && (chat.conversations as ConversationType[]).length > 0"
                v-for="conversation in filteredConversations" :conversation="conversation" :key="conversation.id" />

            <NoConversation v-else />

        </div>

        <!--compose modal-->
        <ComposeModal :open="composeOpen" :close-modal="closeComposeModal" />
    </div>
</template>