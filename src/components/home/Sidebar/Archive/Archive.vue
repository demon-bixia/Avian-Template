<script setup lang="ts">
import type { Ref } from "vue";
import { ref, watch } from "vue";

import useChatStore, { Conversation as ConversationType } from "../../../../stores/chat";

import Loading1 from "../../../reusables/loading/Loading1.vue";
import SearchInput from "../../../reusables/SearchInput.vue";
import Conversation from "../Conversations/Conversation.vue";
import SidebarHeader from "../SidebarHeader.vue";
import NoArchive from "../../../reusables/emptyStates/NoArchive.vue";

const chat = useChatStore();

const filteredConversations: Ref<ConversationType[] | undefined> = ref(chat.archivedConversations);

const searchText: Ref<string> = ref('');

watch(searchText, () => {
    filteredConversations.value = chat.archivedConversations?.filter((conversation) => {
        return (conversation.name as string).toLowerCase().includes(searchText.value.toLowerCase())
    });
});
</script>
    
<template>
    <div>
        <SidebarHeader>
            <template v-slot:title>Archived Messages</template>
        </SidebarHeader>

        <div class="px-5 pb-5">
            <SearchInput v-model="searchText" />
        </div>

        <div class="w-full h-full scroll-smooth scrollbar-hidden" style="overflow-x:visible; overflow-y: scroll;">
            <Loading1 v-if="chat.status === 'loading'  || chat.delayLoading" v-for="item in 6" />

            <Conversation
                v-if="chat.status === 'success' && !chat.delayLoading && (filteredConversations as ConversationType[]).length > 0"
                v-for="conversation in filteredConversations" :conversation="conversation" :key="conversation.id" />

            <NoArchive v-else />
        </div>
    </div>
</template>