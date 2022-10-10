<script setup lang="ts">
import { PencilSquareIcon } from "@heroicons/vue/24/outline";

import type { Ref } from "vue";
import { ref, watch, onMounted } from "vue";

import useChatStore, { Conversation as ConversationType } from "../../../../stores/chat";
import { getName } from "../../../../utils";

import NoConversation from "../../../reusables/emptyStates/NoConversation.vue";
import IconButton from "../../../reusables/IconButton.vue";
import Loading1 from "../../../reusables/loading/Loading1.vue";
import SearchInput from "../../../reusables/SearchInput.vue";
import ComposeModal from "../../modals/ComposeModal/ComposeModal.vue";
import SidebarHeader from "../SidebarHeader.vue";
import ArchivedButton from "./ArchivedButton.vue";
import ConversationsList from "./ConversationsList.vue";
import FadeTransition from "../../../reusables/transitions/FadeTransition.vue";


const chat = useChatStore();

const searchText: Ref<string> = ref('');

const composeOpen = ref(false);

// determines whether the archive is open or not
const openArchive = ref(false);

// the filterd list of conversations.
const filteredConversations: Ref<ConversationType[] | undefined> = ref(chat.conversations);

// filter the list of conversation based on search text.
watch([searchText, openArchive], () => {
    if (openArchive.value) {
        filteredConversations.value = chat.archivedConversations?.filter((conversation) => getName(conversation)?.toLowerCase().includes(searchText.value.toLowerCase()));
    } else {
        filteredConversations.value = chat.conversations?.filter((conversation) => getName(conversation)?.toLowerCase().includes(searchText.value.toLowerCase()));
    }
});

// (event) switch between the rendered conversations.
const handleConversationChange = (conversationId: number) => {
    chat.activeConversationId = conversationId;
    chat.conversationOpen = 'open';
};

// (event) close the compose modal.
const closeComposeModal = () => {
    composeOpen.value = false;
};

// if the acitveconversation is in the archive 
// then open the archive
onMounted(() => {
    let conversation = (chat.archivedConversations as ConversationType[]).find((conversation) => conversation.id === chat.activeConversationId);

    if (conversation)
        openArchive.value = true;
})
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
        <div class="px-5 xs:pb-6 md:pb-5">
            <SearchInput v-model="searchText" />
        </div>

        <!--conversations-->
        <div role="list" aria-label="conversations" class="w-full h-full scroll-smooth scrollbar-hidden"
            style="overflow-x:visible; overflow-y: scroll;">
            <Loading1 v-if="chat.status === 'loading'  || chat.delayLoading" v-for="item in 6" />

            <div v-else>
                <ArchivedButton v-if="(chat.archivedConversations as ConversationType[]).length > 0" :open="openArchive"
                    @click="openArchive = !openArchive" />

                <div
                    v-if="chat.status === 'success' && !chat.delayLoading && (filteredConversations as ConversationType[]).length > 0">

                    <FadeTransition>
                        <component :is="ConversationsList" :filtered-conversations="filteredConversations"
                            :active-id="(chat.activeConversationId as number)"
                            :handle-conversation-change="handleConversationChange"
                            :key="openArchive ? 'archive': 'active'" />
                    </FadeTransition>
                </div>

                <div v-else>
                    <NoConversation v-if="(chat.archivedConversations as ConversationType[]).length === 0" />
                </div>
            </div>
        </div>

        <!--compose modal-->
        <ComposeModal :open="composeOpen" :close-modal="closeComposeModal" />
    </div>
</template>
