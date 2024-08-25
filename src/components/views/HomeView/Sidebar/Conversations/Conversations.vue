<script setup lang="ts">
import type { IConversation } from "@src/types";
import type { Ref } from "vue";

import { onMounted, ref, watch } from "vue";

import useStore from "@src/store/store";
import { getActiveConversationId, getName } from "@src/utils";

import { PencilSquareIcon } from "@heroicons/vue/24/outline";
import ComposeModal from "@src/components/shared/modals/ComposeModal/ComposeModal.vue";
import NoConversation from "@src/components/states/empty-states/NoConversation.vue";
import Circle2Lines from "@src/components/states/loading-states/Circle2Lines.vue";
import IconButton from "@src/components/ui/inputs/IconButton.vue";
import SearchInput from "@src/components/ui/inputs/SearchInput.vue";
import FadeTransition from "@src/components/ui/transitions/FadeTransition.vue";
import ArchivedButton from "@src/components/views/HomeView/Sidebar/Conversations/ArchivedButton.vue";
import ConversationsList from "@src/components/views/HomeView/Sidebar/Conversations/ConversationsList.vue";
import SidebarHeader from "@src/components/views/HomeView/Sidebar/SidebarHeader.vue";

const store = useStore();

const keyword: Ref<string> = ref("");

const composeOpen = ref(false);

// determines whether the archive is open or not
const openArchive = ref(false);

// the filtered list of conversations.
const filteredConversations: Ref<IConversation[]> = ref(store.conversations);

// filter the list of conversation based on search text.
watch([keyword, openArchive], () => {
  if (openArchive.value) {
    // search conversations
    filteredConversations.value =
      store.archivedConversations?.filter(
        (conversation) =>
          getName(conversation)
            ?.toLowerCase()
            .includes(keyword.value.toLowerCase()),
      ) || [];
  } else {
    // search archived conversations
    filteredConversations.value =
      store.conversations?.filter(
        (conversation) =>
          getName(conversation)
            ?.toLowerCase()
            .includes(keyword.value.toLowerCase()),
      ) || [];
  }
});

// (event) close the compose modal.
const closeComposeModal = () => {
  composeOpen.value = false;
};

// if the active conversation is in the archive
// then open the archive
onMounted(() => {
  let conversation = store.archivedConversations.find(
    (conversation) => conversation.id === getActiveConversationId(),
  );
  if (conversation) openArchive.value = true;
});
</script>

<template>
  <div>
    <SidebarHeader>
      <!--title-->
      <template v-slot:title>Messages</template>

      <!--side actions-->
      <template v-slot:actions>
        <IconButton
          class="ic-btn-ghost-primary w-7 h-7"
          @click="composeOpen = true"
          aria-label="compose conversation"
          title="compose conversation"
        >
          <PencilSquareIcon class="w-[1.25rem] h-[1.25rem]" />
        </IconButton>
      </template>
    </SidebarHeader>

    <!--search bar-->
    <div class="px-5 xs:pb-6 md:pb-5">
      <SearchInput
        @value-changed="
          (value) => {
            keyword = value;
          }
        "
        :value="keyword"
      />
    </div>

    <!--conversations-->
    <div
      role="list"
      aria-label="conversations"
      class="w-full h-full scroll-smooth scrollbar-hidden"
      style="overflow-x: visible; overflow-y: scroll"
    >
      <Circle2Lines
        v-if="store.status === 'loading' || store.delayLoading"
        v-for="item in 6"
      />

      <div v-else>
        <ArchivedButton
          v-if="store.archivedConversations.length > 0"
          :open="openArchive"
          @click="openArchive = !openArchive"
        />

        <div
          v-if="
            store.status === 'success' &&
            !store.delayLoading &&
            filteredConversations.length > 0
          "
        >
          <FadeTransition>
            <component
              :is="ConversationsList"
              :filtered-conversations="filteredConversations"
              :key="openArchive ? 'archive' : 'active'"
            />
          </FadeTransition>
        </div>

        <div v-else>
          <NoConversation v-if="store.archivedConversations.length === 0" />
        </div>
      </div>
    </div>

    <!--compose modal-->
    <ComposeModal :open="composeOpen" :close-modal="closeComposeModal" />
  </div>
</template>
