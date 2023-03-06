<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import type { Contact } from "../../../../stores/chat";

import useChatStore from "../../../../stores/chat";

import Loading1 from "../../../reusables/loading/Loading1.vue";
import SearchInput from "../../../reusables/SearchInput.vue";
import ContactItem from "../../Sidebar/Contacts/ContactItem.vue";
import Button from "../../../reusables/Button.vue";
import Typography from "../../../reusables/Typography.vue";
import Checkbox from "../../../reusables/Checkbox.vue";

const chat = useChatStore();

// a list of contacts selected to make a call
const selectedContacts: Ref<Contact[]> = ref([]);

// checks whether a contact is selected or not
const isContactSelected = (contact: Contact) => {
  if (contact) {
    return Boolean(
      selectedContacts.value.find((item) => item.id === contact.id)
    );
  } else {
    return false;
  }
};

// (event) change the value of selected contacts
const handleSelectedContactsChange = (contact: Contact) => {
  let contactIndex = selectedContacts.value.findIndex(
    (item) => item.id === contact.id
  );
  if (contactIndex !== -1) {
    selectedContacts.value.splice(contactIndex, 1);
  } else {
    selectedContacts.value.push(contact);
  }
};
</script>

<template>
  <div>
    <!--search-->
    <div class="mx-5 mt-3 mb-5">
      <SearchInput variant="outline" />
    </div>

    <!--contacts-->
    <div
      class="overflow-y-scroll scrollbar scrollbar-hidden max-h-[200px] mb-5"
    >
      <ContactItem
        v-if="chat.status === 'success' && !chat.delayLoading"
        v-for="(contact, index) in chat.contacts"
        :contact="contact"
        @click="handleSelectedContactsChange(contact)"
        :active="isContactSelected(contact)"
        :key="index"
      >
        <template v-slot:checkbox>
          <Checkbox :model-value="isContactSelected(contact)" />
        </template>
      </ContactItem>

      <Loading1
        v-if="chat.status === 'loading' || chat.delayLoading"
        v-for="item in 3"
      />
    </div>

    <div class="flex px-5 mt-5 pb-6">
      <div class="grow"></div>
      <!--previous button-->
      <Button
        @click="
          $emit('active-page-change', {
            tabName: 'group-info',
            animationName: 'slide-right',
          })
        "
        variant="ghost"
        class="px-5 mr-4"
      >
        <Typography variant="body-5" no-color> Previous </Typography>
      </Button>

      <!--next button-->
      <Button
        class="px-5 bg-indigo-400 hover:bg-indigo-500 active:bg-indigo-500"
      >
        Finish
      </Button>
    </div>
  </div>
</template>
