<script setup lang="ts">
import type { IConversation } from "@src/types";

import { inject, ref } from "vue";

import router from "@src/router";
import { activeCall } from "@src/store/defaults";
import useStore from "@src/store/store";
import { getAvatar, getName } from "@src/utils";

import {
  ChevronLeftIcon,
  EllipsisVerticalIcon,
  InformationCircleIcon,
  MagnifyingGlassIcon,
  NoSymbolIcon,
  PhoneIcon,
  ShareIcon,
} from "@heroicons/vue/24/outline";
import IconButton from "@src/components/ui/inputs/IconButton.vue";
import Dropdown from "@src/components/ui/navigation/Dropdown/Dropdown.vue";
import DropdownLink from "@src/components/ui/navigation/Dropdown/DropdownLink.vue";

const props = defineProps<{
  handleOpenInfo: () => void;
  handleOpenSearch: () => void;
}>();

const store = useStore();

const activeConversation = <IConversation>inject("activeConversation");

const showDropdown = ref(false);

// (event) close dropdown menu when click item
const handleCloseDropdown = () => {
  showDropdown.value = false;
};

// (event) close dropdown menu when clicking outside the menu.
const handleClickOutside = (event: Event) => {
  let target = event.target as HTMLElement;
  let parentElement = target.parentElement as HTMLElement;

  if (
    target &&
    !(target.classList as Element["classList"]).contains("open-top-menu") &&
    parentElement &&
    !(parentElement.classList as Element["classList"]).contains("open-top-menu")
  ) {
    handleCloseDropdown();
  }
};

// (event) navigate to the /chat/ url
const handleCloseConversation = () => {
  router.push({ path: "/chat/" });
};

// (event) open the voice call modal and expand call
const handleOpenVoiceCallModal = () => {
  store.activeCall = activeCall;
  store.callMinimized = false;

  // wait for the transition to ongoing status to end
  setTimeout(() => {
    store.openVoiceCall = true;
  }, 300);
};
</script>

<template>
  <!--conversation info-->
  <div class="w-full flex justify-center items-center">
    <div class="group mr-4 md:hidden">
      <IconButton
        class="ic-btn-ghost-primary w-7 h-7"
        @click="handleCloseConversation"
        title="close conversation"
        aria-label="close conversation"
      >
        <ChevronLeftIcon class="w-[1.25rem] h-[1.25rem]" />
      </IconButton>
    </div>

    <div v-if="store.status !== 'loading'" class="flex grow">
      <!--avatar-->
      <button
        class="mr-5 outline-none"
        @click="props.handleOpenInfo"
        aria-label="profile avatar"
      >
        <div
          :style="{
            backgroundImage: `url(${getAvatar(activeConversation)})`,
          }"
          class="w-[2.25rem] h-[2.25rem] rounded-full bg-cover bg-center"
        ></div>
      </button>

      <!--name and last seen-->
      <div class="flex flex-col">
        <p
          class="w-fit heading-2 text-color mb-2 cursor-pointer"
          @click="props.handleOpenInfo"
          tabindex="0"
        >
          {{ getName(activeConversation) }}
        </p>

        <p
          class="body-2 text-color font-extralight rounded-[.25rem]"
          tabindex="0"
          aria-label="Last seen december 16, 2019"
        >
          Last seen Dec 16, 2019
        </p>
      </div>
    </div>

    <div class="flex" :class="{ hidden: store.status === 'loading' }">
      <!--search button-->
      <IconButton
        title="search messages"
        aria-label="search messages"
        @click="props.handleOpenSearch"
        class="ic-btn-ghost-primary w-7 h-7 mr-3"
      >
        <MagnifyingGlassIcon
          class="w-[1.25rem] h-[1.25rem] text-gray-400 group-hover:text-indigo-300"
        />
      </IconButton>

      <div class="relative">
        <!--dropdown menu button-->
        <IconButton
          id="open-conversation-menu"
          class="ic-btn-ghost-primary open-top-menu group w-7 h-7"
          @click="showDropdown = !showDropdown"
          :aria-expanded="showDropdown"
          tabindex="0"
          aria-controls="conversation-menu"
          title="toggle conversation menu"
          aria-label="toggle conversation menu"
        >
          <EllipsisVerticalIcon class="open-top-menu w-[1.25rem] h-[1.25rem]" />
        </IconButton>

        <!--dropdown menu-->
        <Dropdown
          id="conversation-menu"
          :close-dropdown="() => (showDropdown = false)"
          :show="showDropdown"
          :position="['right-0']"
          :handle-click-outside="handleClickOutside"
          aria-labelledby="open-conversation-menu"
        >
          <button
            class="dropdown-link dropdown-link-primary"
            aria-label="Show profile information"
            role="menuitem"
            @click="
              () => {
                handleCloseDropdown();
                props.handleOpenInfo();
              }
            "
          >
            <InformationCircleIcon
              class="h-5 w-5 mr-3 text-black opacity-60 dark:text-white dark:opacity-70"
            />
            Profile Information
          </button>
          <button
            class="dropdown-link dropdown-link-primary"
            aria-label="start a voice call with this contact"
            role="menuitem"
            @click="
              () => {
                handleCloseDropdown();
                handleOpenVoiceCallModal();
              }
            "
          >
            <PhoneIcon
              class="h-5 w-5 mr-3 text-black opacity-60 dark:text-white dark:opacity-70"
            />
            Voice call
          </button>
          <button
            class="dropdown-link dropdown-link-primary"
            aria-label="share this contact"
            role="menuitem"
            @click="handleCloseDropdown"
          >
            <ShareIcon
              class="h-5 w-5 mr-3 text-black opacity-60 dark:text-white dark:opacity-70"
            />
            Shared media
          </button>
          <button
            class="dropdown-link dropdown-link-danger"
            aria-label="block this contact"
            role="menuitem"
            @click="handleCloseDropdown"
          >
            <NoSymbolIcon class="h-5 w-5 mr-3" />
            Block contact
          </button>
        </Dropdown>
      </div>
    </div>
  </div>
</template>
