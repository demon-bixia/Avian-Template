<script setup lang="ts">
import { ArrowLeftOnRectangleIcon, ArrowPathIcon, ForwardIcon, InformationCircleIcon } from "@heroicons/vue/24/outline";
import { ArchiveBoxIcon, BellIcon, ChatBubbleOvalLeftIcon, Cog6ToothIcon, SunIcon, MoonIcon, UserIcon } from "@heroicons/vue/24/solid";
import { ref } from "vue";

import useAuthStore from "../../../stores/auth";
import useChatStore from "../../../stores/chat";

import Dropdown from "../../reusables/Dropdown.vue";
import DropdownLink from "../../reusables/DropdownLink.vue";
import NavLink from "./NavLink.vue";

import WhiteLogo from "../../../assets/logo-white.svg";
import Logo from "../../../assets/logo.svg";

const auth = useAuthStore();
const chat = useChatStore();

const showDropdown = ref(false);

let SkipLinkFocused = ref(false);

// (event) change the active sidebar component when clicking on a NavLink
const handleActiveSidebarComponentChange = (value: string) => {
    chat.activeSidebarComponent = value;
};

// (event) close dropdown menu when clicking outside
const handleCloseOnClickOutside = (event: Event) => {
    if (!['user-avatar', 'profile-menu-button'].includes((event.target as HTMLButtonElement).id)) {
        showDropdown.value = false;
    }
};
</script>

<template>
    <div class="w-11 h-full py-7 px-5 flex flex-col items-center dark:bg-gray-800 transition-all duration-500">
        <!--logo-->
        <div class="mb-7 h-7">
            <a href="#mainContent" title="Skip to main content" @blur="SkipLinkFocused = false"
                @focus="SkipLinkFocused = true" class="outline-none"
                :class="{absolute: !SkipLinkFocused, 'right-[10000px]': !SkipLinkFocused}">
                <ForwardIcon class="w-7 h-6 text-indigo-300" />
            </a>

            <button aria-label="avian logo" :class="{'hidden':SkipLinkFocused}" class="outline-none">
                <Logo class="w-8 h-7" v-if="!chat.darkMode" />
                <WhiteLogo class="w-8 h-7 opacity-40" v-else />
            </button>
        </div>

        <!--main navigation-->
        <div class="grow">
            <nav aria-label="Main navigation">
                <ul>
                    <li>
                        <NavLink :icon="ChatBubbleOvalLeftIcon" title="Conversations"
                            @click="() => handleActiveSidebarComponentChange('messages')"
                            :active="chat.activeSidebarComponent === 'messages'" />
                    </li>
                    <li>
                        <NavLink :icon="UserIcon" title="Contacts"
                            @click="()=>handleActiveSidebarComponentChange('contacts')"
                            :active="chat.activeSidebarComponent === 'contacts'" />
                    </li>
                    <li>
                        <NavLink :icon="BellIcon" title="Notifications" :notifications="3"
                            @click="()=>handleActiveSidebarComponentChange('notifications')"
                            :active="chat.activeSidebarComponent === 'notifications'" />
                    </li>
                    <li>
                        <NavLink :icon="ArchiveBoxIcon" title="Archived messages"
                            @click="()=>handleActiveSidebarComponentChange('archive')"
                            :active="chat.activeSidebarComponent === 'archive'" />
                    </li>
                </ul>
            </nav>
        </div>

        <!--secondary navigation-->
        <div>
            <nav aria-label="Extra navigation">
                <ul>
                    <li>
                        <NavLink :icon="chat.darkMode ? SunIcon : MoonIcon" title="Night mode"
                            @click="chat.darkMode = !chat.darkMode" />
                    </li>
                    <li>
                        <NavLink :icon="Cog6ToothIcon" title="Settings"
                            @click="()=>handleActiveSidebarComponentChange('settings')"
                            :active="chat.activeSidebarComponent === 'settings'" />
                    </li>
                </ul>
            </nav>

            <!--seperator-->
            <hr class="mb-6 border-gray-100 dark:border-gray-600" />

            <!--user avatar-->
            <div class="relative">
                <!--dropdown button-->
                <button id="profile-menu-button" @click="showDropdown = !showDropdown"
                    class="bg-white rounded-full active:scale-110 focus:outline-none focus:scale-110 transition duration-200 ease-out"
                    :style="{'box-shadow': !chat.darkMode ? '0 2px 5px rgba(193, 202, 255, 0.5),2px 0 5px rgba(193, 202, 255, 0.5),-2px 0 5px rgba(193, 202, 255, 0.5),0 -2px 5px rgba(193, 202, 255, 0.5)': 'none'}"
                    :aria-expanded="showDropdown" aria-controls="profile-menu" aria-label="toggle profile menu">
                    <div id="user-avatar" :style="{ backgroundImage: `url(${auth.user?.avatar})`}"
                        class="w-7 h-7 rounded-full bg-cover bg-center">
                    </div>
                </button>

                <!--dropdown menu-->
                <Dropdown id="profile-menu" :show="showDropdown" :position="['bottom-0', 'left-[40px]']"
                    :handle-click-outside="handleCloseOnClickOutside" aria-labelledby="profile-menu-button"
                    :close-dropdown="() => showDropdown = false">
                    <DropdownLink label="Profile Information" :handle-click="() => showDropdown = false" tabindex="0">
                        <InformationCircleIcon
                            class="h-5 w-5 mr-3 text-black opacity-60 dark:text-white dark:opacity-70" />
                        Profile Information
                    </DropdownLink>

                    <DropdownLink label="Password Change" :handle-click="() => showDropdown = false">
                        <ArrowPathIcon class="h-5 w-5 mr-3 text-black opacity-60 dark:text-white dark:opacity-70" />
                        Password Change
                    </DropdownLink>

                    <DropdownLink label="Logout" :handle-click="() => showDropdown = false"
                        class="text-red-500 hover:bg-red-100 active:bg-red-100 dark:text-red-500">
                        <ArrowLeftOnRectangleIcon class="h-5 w-5 mr-3 text-red-500  " />
                        Logout
                    </DropdownLink>
                </Dropdown>
            </div>
        </div>
    </div>
</template>
