<script setup lang="ts">
import { PencilSquareIcon } from "@heroicons/vue/24/outline";
import type { Ref } from "vue";
import { ref, watch } from "vue";
import useChatStore, { Conversation as ConversationType } from "../../../stores/chat";
import Content from "../Content.vue";
import Conversation from "../Conversation.vue";
import Header from "../Header.vue";
import LoadingConversation from "../loadingComponents/LoadingConversation.vue";
import Search from "../Search.vue";
import Modal from "../Modal.vue";
import ContactGroups from "../Contacts/ContactGroups.vue";

const chat = useChatStore();

const filteredConversations: Ref<ConversationType[] | undefined> = ref(chat.conversations);

const searchText: Ref<string> = ref('');

watch(searchText, () => {
    filteredConversations.value = chat.conversations?.filter((conversation) => conversation.name.toLowerCase().includes(searchText.value.toLowerCase()));
});

const open = ref(false);

const openModal = () => {
    open.value = true;
};

const closeModal = () => {
    open.value = false;
};
</script>

<template>
    <div>
        <Header>
            <template v-slot:title>Messages</template>
            <template v-slot:actions>
                <button @click="openModal"
                    class="rounded-full w-7 h-7  flex justify-center items-center transition-all duration-200 outline-none focus:outline-none focus:bg-gray-50 hover:bg-gray-50">
                    <PencilSquareIcon class="w-[20px] h-[20px] text-indigo-300 hover:text-indigo-400 " />
                </button>
            </template>
        </Header>

        <Search v-model="searchText" />

        <Content>
            <template v-slot:content>
                <Conversation v-if="chat.status === 'success' && !chat.delayLoading"
                    v-for="conversation in filteredConversations" :conversation="conversation" :key="conversation.id" />

                <LoadingConversation v-if="chat.status === 'loading'  || chat.delayLoading" v-for="item in 6" />
            </template>
        </Content>

        <Modal :open="open" :closeModal="closeModal" :isList="true">
            <template v-slot:header>
                Contacts
            </template>
            <template v-slot:search>
                <div class="mb-2">
                    <Search />
                </div>
            </template>
            <template v-slot:content>
                <ContactGroups v-if="chat.status === 'success' && !chat.delayLoading"
                    :contactGroups="chat.contactGroups" :slim="true" />
                <LoadingConversation v-if="chat.status === 'loading'  || chat.delayLoading" v-for="item in 3" />
            </template>
        </Modal>
    </div>
</template>