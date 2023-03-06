<script setup lang="ts">
import { UserPlusIcon } from "@heroicons/vue/24/outline";
import type { Ref } from "vue";
import { ref, watch } from "vue";

import useChatStore, { Contact, ContactGroup } from "../../../../stores/chat";

import IconButton from "../../../reusables/IconButton.vue";
import Loading2 from "../../../reusables/loading/Loading2.vue";
import SearchInput from "../../../reusables/SearchInput.vue";
import AddContactModal from "../../modals/AddContactModal.vue";
import SidebarHeader from "../SidebarHeader.vue";
import ContactGroups from "./ContactGroups.vue";
import NoContacts from "../../../reusables/empty/NoContacts.vue";

const chat = useChatStore();

const searchText: Ref<string> = ref("");

const openModal = ref(false);

// html element containing the contact groups
const contactContainer: Ref<HTMLElement | null> = ref(null);

// contact groups filtered by search text
const filteredContactGroups: Ref<ContactGroup[] | undefined> = ref(
  chat.contactGroups
);

// update the filtered contact groups based on the search text
watch(searchText, () => {
  filteredContactGroups.value = chat.contactGroups
    ?.map((group) => {
      let newGroup = { ...group };

      newGroup.contacts = newGroup.contacts.filter((contact) => {
        if (
          contact.firstName
            .toLowerCase()
            .includes(searchText.value.toLowerCase())
        )
          return true;
        else if (
          contact.lastName
            .toLowerCase()
            .includes(searchText.value.toLowerCase())
        )
          return true;
      });

      return newGroup;
    })
    .filter((group) => group.contacts.length > 0);
});
</script>

<template>
  <div>
    <SidebarHeader>
      <!--title-->
      <template v-slot:title>Contacts</template>

      <!--side actions-->
      <template v-slot:actions>
        <IconButton
          @click="openModal = true"
          aria-label="add contacts"
          class="w-7 h-7"
        >
          <UserPlusIcon
            class="w-[20px] h-[20px] text-indigo-300 hover:text-indigo-400"
          />
        </IconButton>
      </template>
    </SidebarHeader>

    <!--search-->
    <div class="px-5 xs:pb-6 md:pb-5">
      <SearchInput v-model="searchText" />
    </div>

    <!--content-->
    <div
      ref="contactContainer"
      class="w-full h-full scroll-smooth scrollbar-hidden"
      style="overflow-x: visible; overflow-y: scroll"
    >
      <Loading2
        v-if="chat.status === 'loading' || chat.delayLoading"
        v-for="item in 5"
      />

      <ContactGroups
        v-else-if="chat.status === 'success' && !chat.delayLoading && (chat.contacts as Contact[])?.length > 0"
        :contactGroups="filteredContactGroups"
        :bottom-edge="(contactContainer as HTMLElement)?.getBoundingClientRect().bottom"
      />

      <NoContacts v-else />
    </div>

    <!--add contact modal-->
    <AddContactModal
      :open-modal="openModal"
      :close-modal="() => (openModal = false)"
    />
  </div>
</template>
