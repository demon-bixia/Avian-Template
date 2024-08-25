<script setup lang="ts">
import type { IConversation } from "@src/types";
import type { Ref } from "vue";

import { ref } from "vue";

import useStore from "@src/store/store";

import { EllipsisVerticalIcon } from "@heroicons/vue/24/outline";
import { ArrowUturnLeftIcon } from "@heroicons/vue/24/solid";
import ContactItem from "@src/components/shared/blocks/ContactItem.vue";
import IconButton from "@src/components/ui/inputs/IconButton.vue";
import SearchInput from "@src/components/ui/inputs/SearchInput.vue";
import Dropdown from "@src/components/ui/navigation/Dropdown/Dropdown.vue";
import DropdownLink from "@src/components/ui/navigation/Dropdown/DropdownLink.vue";
import ScrollBox from "@src/components/ui/utils/ScrollBox.vue";

const props = defineProps<{
  closeModal: () => void;
  conversation: IConversation;
}>();

const store = useStore();

// html container of the contacts list
const contactContainer: Ref<HTMLElement | undefined> = ref();

// controls the states of contact dropdown menus
const dropdownMenuStates: Ref<boolean[] | undefined> = ref(
  props.conversation.contacts?.map(() => false),
);

// the position of the dropdown menu
const dropdownMenuPosition = ref(["top-6", "right-0"]);

// (event) close all dropdowns
const closeDropdowns = () => {
  dropdownMenuStates.value = props.conversation.contacts?.map(() => false);
};

// (event) open/close the dropdown menu
const handleToggleDropdown = (event: Event, contactIndex: number) => {
  if (contactContainer) {
    let buttonBottom = (
      event.currentTarget as HTMLElement
    ).getBoundingClientRect().bottom;
    let containerBottom = (
      contactContainer.value as HTMLElement
    ).getBoundingClientRect().bottom;

    if (buttonBottom >= containerBottom - 50) {
      dropdownMenuPosition.value = ["bottom-6", "right-0"];
    } else {
      dropdownMenuPosition.value = ["top-6", "right-0"];
    }
  }

  dropdownMenuStates.value = props.conversation.contacts?.map(
    (value, index) => {
      if (contactIndex === index) {
        return true;
      } else {
        return false;
      }
    },
  );
};

// (event) close doprdown menu when clicking outside
const handleClickOutside = (event: Event) => {
  let target = event.target as HTMLElement;

  if (
    target.parentElement &&
    !target.classList.contains("open-menu") &&
    !(target.parentElement as HTMLElement).classList.contains("open-menu")
  ) {
    closeDropdowns();
  }
};
</script>

<template>
  <div>
    <!--header-->
    <div class="flex justify-between items-center mb-6 px-5">
      <p id="modal-title" class="heading-1 text-color">Members</p>

      <!--return button-->
      <IconButton
        @click="
          $emit('active-page-change', {
            tabName: 'conversation-info',
            animationName: 'slide-right',
            removeContact: true,
          })
        "
        class="ic-btn-outlined-danger p-2"
      >
        <ArrowUturnLeftIcon class="w-5 h-5" />
      </IconButton>
    </div>

    <!--search-->
    <div class="mb-5 mx-5">
      <SearchInput />
    </div>

    <!--contacts-->
    <div ref="contactContainer">
      <ScrollBox class="max-h-[14.5rem] overflow-y-scroll">
        <ContactItem
          variant="card"
          @contact-selected="
            (contact) =>
              $emit('active-page-change', {
                tabName: 'conversation-info',
                animationName: 'slide-left',
                contact: contact,
              })
          "
          v-for="(contact, index) in props.conversation.contacts"
          :contact="contact"
          :key="index"
        >
          <template
            v-slot:tag
            v-if="(props.conversation.admins as number[]).includes(contact.id)"
          >
            <div class="ml-3">
              <p class="body-4 text-indigo-400">admin</p>
            </div>
          </template>

          <template
            v-slot:menu
            v-if="
              store.user &&
              (props.conversation.admins as number[]).includes(store.user.id) &&
              contact.id !== store.user.id
            "
          >
            <div>
              <!--dropdown menu button-->
              <IconButton
                title="menu"
                @click="(event) => handleToggleDropdown(event, index)"
                class="open-menu w-6 h-6"
              >
                <EllipsisVerticalIcon class="open-menu h-5 w-5" tabindex="0" />
              </IconButton>

              <!--dropdown menu-->
              <Dropdown
                :close-dropdown="closeDropdowns"
                :handle-click-outside="handleClickOutside"
                :show="(dropdownMenuStates as boolean[])[index]"
                :position="dropdownMenuPosition"
              >
                <button
                  class="dropdown-link dropdown-link-primary"
                  aria-label="give admin permissions"
                  role="menuitem"
                >
                  Promote to admin
                </button>
                <button
                  class="dropdown-link dropdown-link-primary"
                  aria-label="remove admin permissions"
                  role="menuitem"
                >
                  Demote to member
                </button>
                <button
                  class="dropdown-link dropdown-link-danger"
                  aria-label="remove contacts"
                  role="menuitem"
                >
                  Remove contact
                </button>
              </Dropdown>
            </div>
          </template>
        </ContactItem>
      </ScrollBox>
    </div>
  </div>
</template>
