<script setup lang="ts">
import useChatStore from "../../../stores/chat";
import Content from "../Content.vue";
import Header from "../Header.vue";
import Notification from "./Notification.vue";
import Loading1Vue from "../../loading/Loading1.vue";

const chat = useChatStore();
</script>

<template>
    <div>
        <Header>
            <template v-slot:title>Notifications</template>
        </Header>

        <Content>
            <template v-slot:content>
                <Notification v-if="chat.status === 'success' && !chat.delayLoading"
                    v-for="(notification, index) in chat.notifications" :notification="notification" :key="index" />

                <Loading1Vue v-if="chat.status === 'loading'  || chat.delayLoading" v-for="item in 8" />
            </template>
        </Content>
    </div>
</template>