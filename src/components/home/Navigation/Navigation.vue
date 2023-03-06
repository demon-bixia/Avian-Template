<script setup lang="ts">
import { ForwardIcon } from "@heroicons/vue/24/outline";
import {
  BellIcon,
  ChatBubbleOvalLeftIcon,
  Cog6ToothIcon,
  MoonIcon,
  PhoneIcon,
  SunIcon,
  UserIcon,
} from "@heroicons/vue/24/solid";
import { ref } from "vue";

import useAuthStore from "../../../stores/auth";
import useChatStore from "../../../stores/chat";

import NavLink from "./NavLink.vue";
import ProfileDropdown from "./ProfileDropdown.vue";
import Logo from "../Navigation/Logo.vue";

const auth = useAuthStore();
const chat = useChatStore();

const showDropdown = ref(false);

// (event) change the active sidebar component when clicking on a NavLink
const handleActiveSidebarComponentChange = (value: string) => {
  chat.activeSidebarComponent = value;
};
</script>

<template>
  <div
    class="xs:w-full md:w-11 md:h-full md:py-7 xs:py-5 px-5 flex xs:flex-row md:flex-col items-center transition-all duration-500"
  >
    <!--logo-->
    <Logo />

    <!--main navigation-->
    <div class="grow">
      <nav aria-label="Main navigation">
        <ul class="xs:flex md:block xs:justify-between xs:items-center">
          <!--message button-->
          <li>
            <NavLink
              :icon="ChatBubbleOvalLeftIcon"
              title="Conversations"
              @click="() => handleActiveSidebarComponentChange('messages')"
              :active="chat.activeSidebarComponent === 'messages'"
            />
          </li>

          <!--contacts list button-->
          <li>
            <NavLink
              :icon="UserIcon"
              title="Contacts"
              @click="() => handleActiveSidebarComponentChange('contacts')"
              :active="chat.activeSidebarComponent === 'contacts'"
            />
          </li>

          <!--dropdown button small screen-->
          <li>
            <ProfileDropdown
              id="small-profile-menu"
              class="xs:block md:hidden"
              aria-labelledby="small-profile-menu-button"
              :show-dropdown="showDropdown"
              :handle-show-dropdown="() => (showDropdown = true)"
              :handle-close-dropdown="() => (showDropdown = false)"
            />
          </li>

          <!--notifications button-->
          <li class="xs:hidden md:inline">
            <NavLink
              :icon="BellIcon"
              title="Notifications"
              :notifications="3"
              @click="() => handleActiveSidebarComponentChange('notifications')"
              :active="chat.activeSidebarComponent === 'notifications'"
            />
          </li>

          <!--voice call button-->
          <li>
            <NavLink
              :icon="PhoneIcon"
              title="Call log"
              @click="() => handleActiveSidebarComponentChange('phone')"
              :active="chat.activeSidebarComponent === 'phone'"
            />
          </li>

          <!--settings button small screen-->
          <li class="xs:inline md:hidden">
            <NavLink
              :icon="Cog6ToothIcon"
              title="Settings"
              @click="() => handleActiveSidebarComponentChange('settings')"
              :active="chat.activeSidebarComponent === 'settings'"
            />
          </li>
        </ul>
      </nav>
    </div>

    <!--secondary navigation-->
    <div>
      <nav aria-label="Extra navigation" class="xs:hidden md:block">
        <ul>
          <!--toggle dark mode button-->
          <li>
            <NavLink
              :icon="chat.settings['dark-mode'] ? SunIcon : MoonIcon"
              title="Night mode"
              @click="chat.settings['dark-mode'] = !chat.settings['dark-mode']"
            />
          </li>
          <!--settings button-->
          <li>
            <NavLink
              :icon="Cog6ToothIcon"
              title="Settings"
              @click="() => handleActiveSidebarComponentChange('settings')"
              :active="chat.activeSidebarComponent === 'settings'"
            />
          </li>
        </ul>
      </nav>

      <!--separator-->
      <hr
        class="xs:hidden md:block mb-6 border-gray-100 dark:border-gray-600"
      />

      <!--user avatar-->
      <ProfileDropdown
        id="profile-menu"
        class="xs:hidden md:block"
        aria-labelledby="profile-menu-button"
        :show-dropdown="showDropdown"
        :handle-show-dropdown="() => (showDropdown = true)"
        :handle-close-dropdown="() => (showDropdown = false)"
      />
    </div>
  </div>
</template>
