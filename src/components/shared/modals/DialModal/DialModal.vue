<script setup lang="ts">
import type { IContact } from "@src/types";
import type { Ref } from "vue";

import { ref } from "vue";

import useStore from "@src/store/store";

import Button from "@src/components/ui/inputs/Button.vue";
import Checkbox from "@src/components/ui/inputs/Checkbox.vue";
import SearchInput from "@src/components/ui/inputs/SearchInput.vue";
import Modal from "@src/components/ui/utils/Modal.vue";
import ContactItem from "@src/components/shared/blocks/ContactItem.vue";
import ScrollBox from "@src/components/ui/utils/ScrollBox.vue";
import Circle2Lines from "@src/components/states/loading-states/Circle2Lines.vue";

const props = defineProps<{
  closeModal: () => void;
  open: boolean;
}>();

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
  <Modal :open="props.open" :closeModal="props.closeModal">
    <template v-slot:content>
      <div class="w-[18.75rem] py-6 bg-white dark:bg-gray-800 rounded">
        <!--modal header-->
        <div class="flex justify-between items-center mb-6 px-5">
          <p id="modal-title" class="heading-1 text-color" tabindex="0">
            Contacts
          </p>

          <!--close button-->
          <Button
            @click="props.closeModal"
            class="outlined-danger ghost-text py-2 px-4"
            typography="body-4"
          >
            esc
          </Button>
        </div>

        <!--search-->
        <div class="mb-5 mx-5">
          <SearchInput />
        </div>

        <!--contacts-->
        <ScrollBox
          ref="contactContainer"
          class="max-h-[13.5rem] mb-5 overflow-y-scroll"
        >
          <Circle2Lines
            v-if="store.status === 'loading' || store.delayLoading"
            v-for="item in 3"
          />

          <ContactItem
            v-else-if="store.user"
            v-for="(contact, index) in store.user.contacts"
            :contact="contact"
            @click="handleSelectedContactsChange(contact)"
            :active="isContactSelected(contact)"
            :key="index"
          >
            <template v-slot:checkbox>
              <Checkbox :value="isContactSelected(contact)" />
            </template>
          </ContactItem>
        </ScrollBox>

        <!--call button-->
        <div class="px-5">
          <Button class="contained-success contained-text w-full">
            Call
          </Button>
        </div>
      </div>
    </template>
  </Modal>
</template>
