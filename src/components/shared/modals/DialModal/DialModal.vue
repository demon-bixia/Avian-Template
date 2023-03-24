<script setup lang="ts">
import type { IContact, IUser } from "@src/types";
import type { Ref } from "vue";
import { ref } from "vue";

import useStore from "@src/store/store";

import Typography from "@src/components/ui/data-display/Typography.vue";
import Button from "@src/components/ui/inputs/Button.vue";
import Checkbox from "@src/components/ui/inputs/Checkbox.vue";
import SearchInput from "@src/components/ui/inputs/SearchInput.vue";
import Modal from "@src/components/ui/utils/Modal.vue";
import ContactItem from "@src/components/shared/blocks/ContactItem.vue";
import ScrollBox from "@src/components/ui/utils/ScrollBox.vue";
import Loading1 from "@src/components/states/loading-states/Loading1.vue";

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
      selectedContacts.value.find((item) => item.id === contact.id)
    );
  } else {
    return false;
  }
};

// (event) change the value of selected contacts
const handleSelectedContactsChange = (contact: IContact) => {
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
            class="default-outline"
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
        <ScrollBox
          ref="contactContainer"
          class="max-h-[216px] mb-5 overflow-y-scroll"
        >
          <Loading1
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
          <Button color="success" class="w-full py-4"> Call </Button>
        </div>
      </div>
    </template>
  </Modal>
</template>
