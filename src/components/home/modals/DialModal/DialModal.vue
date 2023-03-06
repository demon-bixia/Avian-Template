<script setup lang="ts">
import type { Ref } from "vue";
import { ref } from "vue";
import useChatStore, { Contact } from "../../../../stores/chat";

import Checkbox from "../../../reusables/Checkbox.vue";
import SearchInput from "../../../reusables/SearchInput.vue";
import Button from "../../../reusables/Button.vue";
import Typography from "../../../reusables/Typography.vue";
import ContactItem from "../../Sidebar/Contacts/ContactItem.vue";
import Modal from "../../../reusables/Modal.vue";

const props = defineProps<{
  closeModal: () => void;
  open: boolean;
}>();

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
  <Modal :open="props.open" :closeModal="props.closeModal">
    <template v-slot:content>
      <div class="w-[300px] py-6 bg-white dark:bg-gray-800 rounded">
        <!--modal header-->
        <div class="flex justify-between items-center mb-6 px-5">
          <Typography
            id="modal-title"
            variant="heading-1"
            class="outline-none"
            tabindex="0"
          >
            Contacts
          </Typography>

          <!--close button-->
          <Button
            @click="props.closeModal"
            variant="outlined"
            color="danger"
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
        <div
          ref="contactContainer"
          class="max-h-[216px] mb-5 overflow-y-scroll scrollbar scrollbar-hidden"
        >
          <ContactItem
            v-for="(contact, index) in (chat.contacts as Contact[])"
            :contact="contact"
            @click="handleSelectedContactsChange(contact)"
            :active="isContactSelected(contact)"
            :key="index"
          >
            <template v-slot:checkbox>
              <Checkbox :model-value="isContactSelected(contact)" />
            </template>
          </ContactItem>
        </div>

        <!--call button-->
        <div class="px-5">
          <Button color="success" class="w-full py-4"> Call </Button>
        </div>
      </div>
    </template>
  </Modal>
</template>
