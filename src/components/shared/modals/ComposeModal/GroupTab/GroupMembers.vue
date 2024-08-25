<script setup lang="ts">
import type { Ref } from "vue";
import type { IContact } from "@src/types";

import { ref } from "vue";

import useStore from "@src/store/store";

import Circle2Lines from "@src/components/states/loading-states/Circle2Lines.vue";
import SearchInput from "@src/components/ui/inputs/SearchInput.vue";
import ContactItem from "@src/components/shared/blocks/ContactItem.vue";
import Button from "@src/components/ui/inputs/Button.vue";
import Checkbox from "@src/components/ui/inputs/Checkbox.vue";
import ScrollBox from "@src/components/ui/utils/ScrollBox.vue";

const store = useStore();

// a list of contacts selected to make a call
const selectedContacts: Ref<IContact[]> = ref([]);

// checks whether a contact is selected or not
const isContactSelected = (contact: IContact) => {
  if (contact) {
    return Boolean(
      selectedContacts.value.find((item) => item.id === contact.id),
    );
  } else {
    return false;
  }
};

// (event) change the value of selected contacts
const handleSelectedContactsChange = (contact: IContact) => {
  let contactIndex = selectedContacts.value.findIndex(
    (item) => item.id === contact.id,
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
      <SearchInput />
    </div>

    <!--contacts-->
    <ScrollBox class="overflow-y-scroll max-h-[12.5rem] mb-5">
      <ContactItem
        v-if="store.status === 'success' && !store.delayLoading && store.user"
        v-for="(contact, index) in store.user.contacts"
        @click="handleSelectedContactsChange(contact)"
        :contact="contact"
        :active="isContactSelected(contact)"
        :key="index"
      >
        <template v-slot:checkbox>
          <Checkbox :value="isContactSelected(contact)" />
        </template>
      </ContactItem>

      <Circle2Lines
        v-if="store.status === 'loading' || store.delayLoading"
        v-for="item in 3"
      />
    </ScrollBox>

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
        class="ghost-primary ghost-text mr-4"
      >
        <p class="body-5">Previous</p>
      </Button>

      <!--next button-->
      <Button class="contained-primary contained-text"> Finish </Button>
    </div>
  </div>
</template>
