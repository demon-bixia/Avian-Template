<script setup lang="ts">
import { PencilSquareIcon } from "@heroicons/vue/24/outline";

import type { Ref } from "vue";
import { ref, watch } from "vue";

import useChatStore, { Conversation as ConversationType } from "../../../stores/chat";
import { getName } from "../../../utils";

import Loading1 from "../../loading/Loading1.vue";
import ComposeModal from "../../modals/ComposeModal/ComposeModal.vue";
import IconButton from "../../utils/IconButton.vue";
import SearchInput from "../../utils/SearchInput.vue";
import Conversation from "./Conversation.vue";
import SidebarHeader from "../SidebarHeader.vue";

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
                <IconButton @click="composeOpen = true">
                    <PencilSquareIcon class="w-[20px] h-[20px] text-indigo-300 hover:text-indigo-400 " />
                </IconButton>
            </template>
        </SidebarHeader>

        <!--search bar-->
        <div class="px-5 pb-5">
            <SearchInput v-model="searchText" />
        </div>

        <!--conversations-->
        <div class="w-full h-full scroll-smooth scrollbar-hidden" style="overflow-x:visible; overflow-y: scroll;">
            <Conversation :handle-conversation-change="handleConversationChange"
                :active-id="(chat.activeConversationId as number)"
                v-if="chat.status === 'success' && !chat.delayLoading" v-for="conversation in filteredConversations"
                :conversation="conversation" :key="conversation.id" />
            <Loading1 v-if="chat.status === 'loading'  || chat.delayLoading" v-for="item in 6" />
        </div>

        <!--compose modal-->
        <ComposeModal :open="composeOpen" :close-modal="closeComposeModal" />
    </div>
</template>