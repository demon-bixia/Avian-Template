<script setup lang="ts">
import { onMounted } from "vue";

import useChatStore from "../stores/chat";
import { fetchData } from "../stores/fakeData";

import Chat from "../components/home/Chat/Chat.vue";
import Navigation from "../components/home/Navigation/Navigation.vue";
import Sidebar from "../components/home/Sidebar/Sidebar.vue";

const chat = useChatStore();

chat.$subscribe((mutation, state) => {
    localStorage.setItem('chat', JSON.stringify(state));
});

// update home page state;
onMounted(async () => {
    chat.status = 'loading';

    setTimeout(() => {
        chat.delayLoading = false;
    });

    const request = await fetchData();

    chat.$patch({
        status: 'success',
        contacts: request.data.contacts,
        conversations: request.data.conversations,
        notifications: request.data.notifications,
        archivedConversations: request.data.archivedConversations,
    });
});
</script>

<template>
    <KeepAlive>
        <div class="xs:relative md:static h-screen w-screen flex xs:flex-col md:flex-row overflow-hidden">
            <Navigation class="xs:order-1 md:-order-none" />
            <Sidebar class="xs:grow-1 md:grow-0 xs:overflow-y-scroll md:overflow-visible scrollbar-hidden" />
            <Chat />
        </div>
    </KeepAlive>
</template>