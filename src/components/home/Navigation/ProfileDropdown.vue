<script setup lang="ts">
import useChatStore from "../../../stores/chat";
import useAuthStore from "../../../stores/auth";

import {
  ArrowLeftOnRectangleIcon,
  ArrowPathIcon,
  InformationCircleIcon,
} from "@heroicons/vue/24/outline";
import { RouterLink } from "vue-router";

import Dropdown from "../../reusables/Dropdown.vue";
import DropdownLink from "../../reusables/DropdownLink.vue";

const props = defineProps<{
  showDropdown: boolean;
  handleCloseDropdown: () => void;
  handleShowDropdown: () => void;
  id: string;
}>();

const chat = useChatStore();
const auth = useAuthStore();

// (event) close dropdown menu when clicking outside
const handleCloseOnClickOutside = (event: Event) => {
  if (
    !["user-avatar", "profile-menu-button"].includes(
      (event.target as HTMLButtonElement).id
    )
  ) {
    props.handleCloseDropdown();
  }
};
</script>

<template>
  <div class="relative">
    <!--toggle dropdown button-->
    <button
      :id="props.id + '-button'"
      @click="handleShowDropdown"
      class="bg-white rounded-full active:scale-110 focus:outline-none focus:scale-110 transition duration-200 ease-out"
      :style="{
        'box-shadow': !chat.settings['dark-mode']
          ? '0 2px 5px rgba(193, 202, 255, 0.5),2px 0 5px rgba(193, 202, 255, 0.5),-2px 0 5px rgba(193, 202, 255, 0.5),0 -2px 5px rgba(193, 202, 255, 0.5)'
          : '0 2px 5px rgba(0, 70, 128, 0.5),2px 0 5px rgba(0, 70, 128, 0.5),-2px 0 5px rgba(0, 70, 128, 0.5),0 -2px 5px rgba(0, 70, 128, 0.5)',
      }"
      :aria-expanded="showDropdown"
      aria-controls="profile-menu"
      aria-label="toggle profile menu"
    >
      <div
        id="user-avatar"
        :style="{ backgroundImage: `url(${auth.user?.avatar})` }"
        class="w-7 h-7 rounded-full bg-cover bg-center"
      ></div>
    </button>

    <!--dropdown menu-->
    <Dropdown
      :id="props.id + '-dropdown'"
      :aria-labelledby="props.id + '-button'"
      :show="props.showDropdown"
      :position="[
        'md:bottom-0',
        'md:left-[40px]',
        'md:top-[auto]',
        'bottom-[50px]',
        'left-[-77px]',
      ]"
      :handle-click-outside="handleCloseOnClickOutside"
      :close-dropdown="props.handleCloseDropdown"
    >
      <DropdownLink
        label="Profile Information"
        :handle-click="props.handleCloseDropdown"
        tabindex="0"
      >
        <InformationCircleIcon
          class="h-5 w-5 mr-3 text-black opacity-60 dark:text-white dark:opacity-70"
        />
        Profile Information
      </DropdownLink>

      <DropdownLink
        label="Password Change"
        :handle-click="props.handleCloseDropdown"
      >
        <RouterLink to="/reset/" class="w-full flex items-center justify-start">
          <ArrowPathIcon
            class="h-5 w-5 mr-3 text-black opacity-60 dark:text-white dark:opacity-70"
          />
          Password Change
        </RouterLink>
      </DropdownLink>

      <DropdownLink
        label="Logout"
        :handle-click="props.handleCloseDropdown"
        class="text-red-500 hover:bg-red-100 active:bg-red-100 dark:text-red-500"
      >
        <RouterLink
          to="/access/sign-in/"
          class="w-full flex items-center justify-start"
        >
          <ArrowLeftOnRectangleIcon class="h-5 w-5 mr-3 text-red-500" />
          Logout
        </RouterLink>
      </DropdownLink>
    </Dropdown>
  </div>
</template>
