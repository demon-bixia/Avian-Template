<script setup lang="ts">
import { UserPlusIcon } from "@heroicons/vue/24/outline";
import type { IContactGroup, IUser } from "@src/types";
import type { Ref } from "vue";
import { ref, watch } from "vue";

import useStore from "@src/store/store";

import AddContactModal from "@src/components/shared/modals/AddContactModal.vue";
import NoContacts from "@src/components/states/empty-states/NoContacts.vue";
import Loading2 from "@src/components/states/loading-states/Loading2.vue";
import IconButton from "@src/components/ui/inputs/IconButton.vue";
import SearchInput from "@src/components/ui/inputs/SearchInput.vue";
import SortedContacts from "@src/components/views/HomeView/Sidebar/Contacts/SortedContacts.vue";
import SidebarHeader from "@src/components/views/HomeView/Sidebar/SidebarHeader.vue";

const store = useStore();

const searchText: Ref<string> = ref("");

const openModal = ref(false);

// html element containing the contact groups
const contactContainer: Ref<HTMLElement | null> = ref(null);

// contact groups filtered by search text
const filteredContactGroups: Ref<IContactGroup[] | undefined> = ref(
  store.contactGroups
);

// update the filtered contact groups based on the search text
watch(searchText, () => {
  filteredContactGroups.value = store.contactGroups
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
          class="w-7 h-7"
          title="add contacts"
          aria-label="add contacts"
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
        v-if="store.status === 'loading' || store.delayLoading"
        v-for="item in 5"
      />

      <SortedContacts
        v-else-if="
          store.status === 'success' &&
          !store.delayLoading &&
          store.user &&
          store.user.contacts.length > 0
        "
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
