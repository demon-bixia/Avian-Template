<script setup lang="ts">
import type { IConversation } from "@src/types";
import Conversation from "./Conversation.vue";

const props = defineProps<{
  filteredConversations?: IConversation[];
  handleConversationChange: (conversationId: number) => void;
  activeId?: number;
}>();
</script>

<template>
  <div>
    <Conversation
      v-for="conversation in filteredConversations"
      :conversation="conversation"
      :key="conversation.id"
      role="listitem"
      :handle-conversation-change="props.handleConversationChange"
      :is-active="activeId === conversation.id"
    />
  </div>
</template>
