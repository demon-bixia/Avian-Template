<script setup lang="ts">
import type { IContactGroup } from "@src/types";
import type { Ref } from "vue";

import { ref } from "vue";

import { getFullName } from "@src/utils";

import {
  EllipsisVerticalIcon,
  InformationCircleIcon,
  TrashIcon,
} from "@heroicons/vue/24/outline";
import IconButton from "@src/components/ui/inputs/IconButton.vue";
import Dropdown from "@src/components/ui/navigation/Dropdown/Dropdown.vue";
import DropdownLink from "@src/components/ui/navigation/Dropdown/DropdownLink.vue";

const props = defineProps<{
  contactGroups?: IContactGroup[];
  bottomEdge?: number;
}>();

// the position of the dropdown menu.
const dropdownMenuPosition = ref(["top-6", "right-0"]);

// controls the states of contact dropdown menus
const dropdownMenuStates: Ref<boolean[][] | undefined> = ref(
  props.contactGroups?.map((contactGroup) => {
    let group = contactGroup.contacts.map(() => false);
    return group;
  }),
);

// close all contact dropdown menus
const handleCloseAllMenus = () => {
  dropdownMenuStates.value = props.contactGroups?.map((contactGroup) => {
    let group = contactGroup.contacts.map(() => false);
    return group;
  });
};

// (event) open/close the selected dropdown menu.
const handleToggleDropdown = (
  event: Event,
  groupIndex: number,
  index: number,
) => {
  if (props.bottomEdge) {
    let buttonBottom = (
      event.currentTarget as HTMLElement
    ).getBoundingClientRect().bottom;

    if (buttonBottom >= props.bottomEdge - 75) {
      dropdownMenuPosition.value = ["bottom-6", "right-0"];
    } else {
      dropdownMenuPosition.value = ["top-6", "right-0"];
    }
  }

  dropdownMenuStates.value = (dropdownMenuStates.value as boolean[][]).map(
    (group) => {
      return group.map((value, idx) => {
        if (idx === index) return value;
        else return false;
      });
    },
  );

  dropdownMenuStates.value[groupIndex][index] = !(
    dropdownMenuStates.value as boolean[][]
  )[groupIndex][index];
};

// (event) close dropdown menu when clicking outside
const handleClickOutside = (event: Event) => {
  let target = event.target as HTMLElement;
  let parentElement = target.parentElement as HTMLElement;

  if (
    target &&
    !target.classList.contains("open-menu") &&
    !(parentElement && parentElement.classList.contains("open-menu"))
  ) {
    handleCloseAllMenus();
  }
};
</script>

<template>
  <div v-for="(group, groupIndex) in props.contactGroups" :key="groupIndex">
    <!--group title-->
    <p class="heading-3 text-color w-full px-5 pb-3 pt-5">
      {{ group.letter }}
    </p>

    <!--contacts-->
    <div v-for="(contact, index) in group.contacts" :key="index">
      <div class="w-full p-5 flex justify-between items-center">
        <button
          class="transition-all duration-200 ease-out"
          :aria-label="getFullName(contact)"
        >
          <div class="flex-row">
            <!--contact name-->
            <p class="heading-2 text-color">
              {{ getFullName(contact) }}
            </p>
          </div>
        </button>

        <!--dropdown menu-->
        <div class="relative">
          <!--dropdown menu button-->
          <IconButton
            :id="'open-contact-menu-' + index"
            class="open-menu w-6 h-6"
            @click="(event) => handleToggleDropdown(event, groupIndex, index)"
            :aria-expanded="
              (dropdownMenuStates as boolean[][])[groupIndex][index]
            "
            :aria-controls="'contact-menu-' + index"
            title="toggle contact menu"
            aria-label="toggle contact menu"
          >
            <EllipsisVerticalIcon class="open-menu h-5 w-5" tabindex="0" />
          </IconButton>

          <Dropdown
            :id="'contact-menu-' + index"
            :close-dropdown="handleCloseAllMenus"
            :handle-click-outside="handleClickOutside"
            :aria-labelledby="'open-contact-menu-' + index"
            :show="(dropdownMenuStates as boolean[][])[groupIndex][index]"
            :position="dropdownMenuPosition"
          >
            <button
              class="dropdown-link dropdown-link-primary"
              aria-label="Show profile information"
              role="menuitem"
            >
              <InformationCircleIcon
                class="h-5 w-5 mr-3 text-black opacity-60 dark:text-white dark:opacity-70"
              />
              Personal information
            </button>

            <button
              class="dropdown-link dropdown-link-danger"
              aria-label="Delete contact"
              role="menuitem"
            >
              <TrashIcon class="h-5 w-5 mr-3" />
              Delete contact
            </button>
          </Dropdown>
        </div>
      </div>
    </div>
  </div>
</template>
