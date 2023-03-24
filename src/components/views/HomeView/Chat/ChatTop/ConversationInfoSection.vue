<script setup lang="ts">
import type { IConversation } from "@src/types";

import { activeCall } from "@src/store/defaults";
import useStore from "@src/store/store";
import { getAvatar, getName } from "@src/utils";
import { inject, ref } from "vue";

import {
  ChevronLeftIcon,
  EllipsisVerticalIcon,
  InformationCircleIcon,
  MagnifyingGlassIcon,
  NoSymbolIcon,
  PhoneIcon,
  ShareIcon,
} from "@heroicons/vue/24/outline";
import Typography from "@src/components/ui/data-display/Typography.vue";
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

// (event) close the selected conversation
const handleCloseConversation = () => {
  store.conversationOpen = "close";
  store.activeConversationId = null;
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
        class="w-7 h-7"
        @click="handleCloseConversation"
        title="close conversation"
        aria-label=""
      >
        <ChevronLeftIcon
          aria-label="close conversation"
          class="w-[20px] h-[20px] text-gray-300 group-hover:text-indigo-300"
        />
      </IconButton>
    </div>

    <div v-if="store.status !== 'loading'" class="flex grow">
      <!--avatar-->
      <button
        class="mr-5 outline-none"
        @click="props.handleOpenSearch"
        aria-label="profile avatar"
      >
        <div
          :style="{
            backgroundImage: `url(${getAvatar(activeConversation)})`,
          }"
          class="w-[36px] h-[36px] rounded-full bg-cover bg-center"
        ></div>
      </button>

      <!--name and last seen-->
      <div class="flex flex-col">
        <Typography
          variant="heading-2"
          @click="props.handleOpenInfo"
          class="mb-2 default-outline cursor-pointer"
          tabindex="0"
        >
          {{ getName(activeConversation) }}
        </Typography>

        <Typography
          variant="body-2"
          class="font-extralight default-outline rounded-[4px]"
          tabindex="0"
          aria-label="Last seen december 16, 2019"
        >
          Last seen Dec 16, 2019
        </Typography>
      </div>
    </div>

    <div class="flex" :class="{ hidden: store.status === 'loading' }">
      <!--search button-->
      <IconButton
        title="search messages"
        aria-label="search messages"
        @click="props.handleOpenSearch"
        class="group w-7 h-7 mr-3"
      >
        <MagnifyingGlassIcon
          class="w-[20px] h-[20px] text-gray-400 group-hover:text-indigo-300"
        />
      </IconButton>

      <div class="relative">
        <!--dropdown menu button-->
        <IconButton
          id="open-conversation-menu"
          @click="showDropdown = !showDropdown"
          tabindex="0"
          class="open-top-menu group w-7 h-7"
          :aria-expanded="showDropdown"
          aria-controls="conversation-menu"
          title="toggle conversation menu"
          aria-label="toggle conversation menu"
        >
          <EllipsisVerticalIcon
            class="open-top-menu w-[20px] h-[20px] text-gray-400 group-hover:text-indigo-300"
          />
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
          <DropdownLink :handle-click="handleCloseDropdown">
            <InformationCircleIcon
              class="h-5 w-5 mr-3 text-black opacity-60 dark:text-white dark:opacity-70"
            />
            Profile Information
          </DropdownLink>

          <DropdownLink
            :handle-click="
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
          </DropdownLink>

          <DropdownLink :handle-click="handleCloseDropdown">
            <ShareIcon
              class="h-5 w-5 mr-3 text-black opacity-60 dark:text-white dark:opacity-70"
            />
            Shared media
          </DropdownLink>

          <DropdownLink :handle-click="handleCloseDropdown" color="danger">
            <NoSymbolIcon class="h-5 w-5 mr-3" />
            Block contact
          </DropdownLink>
        </Dropdown>
      </div>
    </div>
  </div>
</template>
