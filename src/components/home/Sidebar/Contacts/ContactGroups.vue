<script setup lang="ts">
import { EllipsisVerticalIcon, InformationCircleIcon, TrashIcon } from "@heroicons/vue/24/outline";
import type { Ref } from "vue";
import { ref } from 'vue';

import { ContactGroup } from "../../../../stores/chat";
import { getFullName } from "../../../../utils";

import Dropdown from "../../../reusables/Dropdown.vue";
import DropdownLink from "../../../reusables/DropdownLink.vue";
import IconButton from "../../../reusables/IconButton.vue";
import Typography from "../../../reusables/Typography.vue";

const props = defineProps<{
    contactGroups?: ContactGroup[],
}>();

// controll the states of contact dropdown menus
const dropdownMenuStates: Ref<boolean[][] | undefined> = ref(props.contactGroups?.map((contactGroup) => {
    let group = contactGroup.contacts.map(() => false);
    return group;
}));

// close all contact dropdown menus
const handleCloseAllMenus = () => {
    dropdownMenuStates.value = props.contactGroups?.map((contactGroup) => {
        let group = contactGroup.contacts.map(() => false);
        return group;
    });
};

// (event) open/close the selected dropdown menu.
const handleToggleDropdown = (groupIndex: number, index: number) => {
    dropdownMenuStates.value = (dropdownMenuStates.value as boolean[][]).map((group) => {
        return group.map((value, idx) => {
            if (idx === index)
                return value;
            else
                return false
        });
    });

    (dropdownMenuStates.value)[groupIndex][index] = !(dropdownMenuStates.value as boolean[][])[groupIndex][index];
};

// (event) close doprdown menu when clicking outside 
const handleClickOutside = (event: Event) => {
    let target = event.target as HTMLElement;
    let parentElement = target.parentElement as HTMLElement;

    if ((target && !target.classList.contains('open-menu'))
        && !(parentElement && parentElement.classList.contains('open-menu'))) {
        handleCloseAllMenus();
    }
};
</script>

<template>
    <div v-for="(group, groupIndex) in props.contactGroups" :key="groupIndex">
        <!--group title-->
        <Typography variant="heading-3" class="w-full px-5 pb-3 pt-5">
            {{group.letter}}
        </Typography>

        <!--contacts-->
        <div v-for="(contact, index) in group.contacts" :key="index">
            <div class="w-full p-5 flex justify-between items-center">
                <button class="outline-none transition-all duration-200 ease-out" :aria-label="getFullName(contact)">
                    <div class="flex-row">
                        <!--contact name-->
                        <Typography variant="heading-2">
                            {{ getFullName(contact) }}
                        </Typography>
                    </div>
                </button>

                <!--dropdown menu-->
                <div class="relative">
                    <!--dropdown menu button-->
                    <IconButton :id="'open-contact-menu-' + index"
                        :aria-expanded="(dropdownMenuStates as boolean[][])[groupIndex][index]"
                        :aria-controls="'contact-menu-' + index" aria-label="toggle contact menu"
                        @click="() => handleToggleDropdown(groupIndex, index)" class="open-menu w-6 h-6">
                        <EllipsisVerticalIcon
                            class="open-menu h-5 w-5 text-black opacity-60 dark:text-white dark:opacity-70"
                            tabindex="0" />
                    </IconButton>

                    <Dropdown :id="'contact-menu-' + index" :close-dropdown="handleCloseAllMenus"
                        :handle-click-outside="handleClickOutside" :aria-labelledby="'open-contact-menu-' + index"
                        :show="(dropdownMenuStates as boolean[][])[groupIndex][index]" :position="['top-6', 'right-0']">
                        <DropdownLink>
                            <InformationCircleIcon
                                class="h-5 w-5 mr-3 text-black opacity-60 dark:text-white dark:opacity-70" />
                            Personal information
                        </DropdownLink>

                        <DropdownLink class="text-red-500 hover:bg-red-100 active:bg-red-100 dark:text-red-500">
                            <TrashIcon class="h-5 w-5 mr-3 text-red-500" />
                            Delete contact
                        </DropdownLink>
                    </Dropdown>
                </div>
            </div>
        </div>
    </div>
</template>
