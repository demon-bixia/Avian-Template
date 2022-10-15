<script setup lang="ts">
import { ArrowLeftOnRectangleIcon, ArrowPathIcon, InformationCircleIcon } from "@heroicons/vue/24/outline";
import Dropdown from "../../reusables/Dropdown.vue";
import DropdownLink from "../../reusables/DropdownLink.vue";
import { RouterLink } from 'vue-router';

const props = defineProps<{
    showDropdown: boolean,
    handleCloseDropdown: () => void
}>();

// (event) close dropdown menu when clicking outside
const handleCloseOnClickOutside = (event: Event) => {
    if (!['user-avatar', 'profile-menu-button'].includes((event.target as HTMLButtonElement).id)) {
        props.handleCloseDropdown();
    }
};
</script>


<template>
    <!--dropdown menu-->
    <Dropdown :show="props.showDropdown"
        :position="['md:bottom-0', 'md:left-[40px]','md:top-[auto]', 'bottom-[50px]',  'left-[-77px]']"
        :handle-click-outside="handleCloseOnClickOutside" :close-dropdown="props.handleCloseDropdown">

        <DropdownLink label="Profile Information" :handle-click="props.handleCloseDropdown" tabindex="0">
            <InformationCircleIcon class="h-5 w-5 mr-3 text-black opacity-60 dark:text-white dark:opacity-70" />
            Profile Information
        </DropdownLink>

        <DropdownLink label="Password Change" :handle-click="props.handleCloseDropdown">
            <RouterLink to="/reset/" class="w-full flex items-center justify-start">
                <ArrowPathIcon class="h-5 w-5 mr-3 text-black opacity-60 dark:text-white dark:opacity-70" />
                Password Change
            </RouterLink>

        </DropdownLink>

        <DropdownLink label="Logout" :handle-click="props.handleCloseDropdown"
            class="text-red-500 hover:bg-red-100 active:bg-red-100 dark:text-red-500">
            <RouterLink to="/access/sign-in/" class="w-full flex items-center justify-start">
                <ArrowLeftOnRectangleIcon class="h-5 w-5 mr-3 text-red-500" />
                Logout
            </RouterLink>
        </DropdownLink>
    </Dropdown>
</template>