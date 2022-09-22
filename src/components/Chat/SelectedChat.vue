<script setup lang="ts">
import Top from "./Top.vue";
import Middle from "./Middle.vue";
import Bottom from "./Bottom.vue";
import { defineProps } from "vue";
import { Conversation as ConversationType } from "../../stores/chat";

const props = defineProps<{
    activeConversation: ConversationType
}>();
</script>

<template>
    <div class="flex flex-col h-full">
        <Top :active-conversation="props.activeConversation" />
        <Middle :active-conversation="props.activeConversation" />
        <Bottom :active-conversation="props.activeConversation" />
    </div>
</template>