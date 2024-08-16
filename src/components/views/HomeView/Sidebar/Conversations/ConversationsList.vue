<script setup lang="ts">
import type { IConversation } from "@src/types";
import Conversation from "./Conversation.vue";

const props = defineProps<{
  filteredConversations?: IConversation[];
}>();
</script>

<template>
  <div>
    <Conversation
      v-for="conversation in props.filteredConversations"
      :conversation="conversation"
      :key="conversation.id"
      role="listitem"
    />
  </div>
</template>
