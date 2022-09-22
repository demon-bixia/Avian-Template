<script setup lang="ts">
import { PencilSquareIcon } from "@heroicons/vue/24/outline";
import type { Ref } from "vue";
import { ref, watch } from "vue";
import useChatStore, { Conversation as ConversationType } from "../../../stores/chat";
import ContactGroups from "../Contacts/ContactGroups.vue";
import Content from "../Content.vue";
import Conversation from "../Conversation.vue";
import Header from "../Header.vue";
import Loading1Vue from "../../loading/Loading1.vue";
import Modal from "../../modals/Modal.vue";
import Search from "../Search.vue";

const chat = useChatStore();

const filteredConversations: Ref<ConversationType[] | undefined> = ref(chat.conversations);

const searchText: Ref<string> = ref('');

const combineName = (conversation: ConversationType) => {
    return conversation.contact.firstName.toLowerCase() + ' ' + conversation.contact.lastName.toLowerCase();
};

watch(searchText, () => {
    filteredConversations.value = chat.conversations?.filter((conversation) => combineName(conversation).includes(searchText.value.toLowerCase()));
});

const open = ref(false);

const openModal = () => {
    open.value = true;
};

const closeModal = () => {
    open.value = false;
};

const handleConversationChange = (conversationId: number) => {
    chat.activeConversationId = conversationId;
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
                <Conversation :handle-conversation-change="handleConversationChange"
                    :active-id="(chat.activeConversationId as number)"
                    v-if="chat.status === 'success' && !chat.delayLoading" v-for="conversation in filteredConversations"
                    :conversation="conversation" :key="conversation.id" />

                <Loading1Vue v-if="chat.status === 'loading'  || chat.delayLoading" v-for="item in 6" />
            </template>
        </Content>

        <Modal :open="open" :close-modal="closeModal" :is-list="true">
            <template v-slot:header>
                Contacts
            </template>
            <template v-slot:middle>
                <div class="mb-2">
                    <Search />
                </div>
            </template>
            <template v-slot:content>
                <ContactGroups v-if="chat.status === 'success' && !chat.delayLoading"
                    :contact-groups="chat.contactGroups" :slim="true" />
                <Loading1Vue v-if="chat.status === 'loading'  || chat.delayLoading" v-for="item in 3" />
            </template>
        </Modal>
    </div>
</template>