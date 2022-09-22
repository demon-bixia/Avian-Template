<script setup lang="ts">
import useChatStore, { Conversation as ConversationType } from "../../../stores/chat";
import Content from "../Content.vue";
import Conversation from "../Conversation.vue";
import Header from "../Header.vue";
import Search from "../Search.vue";
import { watch, ref } from "vue";
import type { Ref } from "vue";
import Loading1Vue from "../../loading/Loading1.vue";

const chat = useChatStore();

const filteredConversations: Ref<ConversationType[] | undefined> = ref(chat.archivedConversations);

const searchText: Ref<string> = ref('');

watch(searchText, () => {
    filteredConversations.value = chat.archivedConversations?.filter((conversation) => conversation.name.toLowerCase().includes(searchText.value.toLowerCase()));
});
</script>
    
<template>
    <div>
        <Header>
            <template v-slot:title>Archived Messages</template>
        </Header>

        <Search v-model="searchText" />

        <Content>
            <template v-slot:content>
                <Conversation v-if="chat.status === 'success' && !chat.delayLoading"
                    v-for="conversation in filteredConversations" :conversation="conversation" :key="conversation.id" />

                <Loading1Vue v-if="chat.status === 'loading'  || chat.delayLoading" v-for="item in 6" />
            </template>
        </Content>
    </div>
</template>