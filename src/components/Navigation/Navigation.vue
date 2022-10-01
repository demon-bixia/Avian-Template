<script setup lang="ts">
import { ArrowLeftOnRectangleIcon, ArrowPathIcon, ForwardIcon, InformationCircleIcon } from "@heroicons/vue/24/outline";
import { ArchiveBoxIcon, BellIcon, ChatBubbleOvalLeftIcon, Cog6ToothIcon, MoonIcon, UserIcon } from "@heroicons/vue/24/solid";
import { ref } from "vue";

import useAuthStore from "../../stores/auth";
import useChatStore from "../../stores/chat";

import ScaleTransition from "../transitions/ScaleTransition.vue";
import Dropdown from "../utils/Dropdown.vue";
import DropdownLink from "../utils/DropdownLink.vue";
import NavLink from "./NavLink.vue";

import Logo from "../../assets/logo.svg";

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
    if ((event.target as HTMLButtonElement).id !== 'user-avatar') {
        showDropdown.value = false;
    }
}
</script>

<template>
    <aside class="w-11 h-full py-7 px-5 flex flex-col items-center">
        <!--logo-->
        <div class="mb-7 h-7">
            <a href="#mainContent" title="Skip to main content" tabindex="0" @blur="SkipLinkFocused = false"
                @focus="SkipLinkFocused = true"
                :class="{absolute: !SkipLinkFocused, 'right-[10000px]': !SkipLinkFocused}">
                <ForwardIcon class="w-7 h-6 text-indigo-300" />
            </a>
            <a href="#" :class="{'hidden':SkipLinkFocused}">
                <Logo class="w-8 h-7" />
            </a>
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
                        <NavLink :icon="MoonIcon" title="Night mode" />
                    </li>
                    <li>
                        <NavLink :icon="Cog6ToothIcon" title="Settings"
                            @click="()=>handleActiveSidebarComponentChange('settings')"
                            :active="chat.activeSidebarComponent === 'settings'" />
                    </li>
                </ul>
            </nav>

            <!--seperator-->
            <hr class="mb-6 border-gray-100" />

            <!--user avatar-->
            <div class="relative">
                <!--dropdown button-->
                <button @click="showDropdown = !showDropdown"
                    class="bg-white rounded-full active:scale-110 focus:outline-none transition duration-200 ease-out"
                    style="box-shadow:0 2px 5px rgba(193, 202, 255, 0.5),2px 0 5px rgba(193, 202, 255, 0.5),-2px 0 5px rgba(193, 202, 255, 0.5),0 -2px 5px rgba(193, 202, 255, 0.5);">
                    <div id="user-avatar" :style="{ backgroundImage: `url(${auth.user?.avatar})`}"
                        class="w-7 h-7 rounded-full bg-cover bg-center">
                    </div>
                </button>

                <!--dropdown menu-->
                <Dropdown :show="showDropdown" :position="['bottom-0', 'left-[40px]']"
                    :handle-click-outside="handleCloseOnClickOutside">
                    <DropdownLink :handle-click="() => showDropdown = false">
                        <InformationCircleIcon class="h-5 w-5 mr-3 text-black opacity-60 " />
                        Profile Information
                    </DropdownLink>

                    <DropdownLink :handle-click="() => showDropdown = false">
                        <ArrowPathIcon class="h-5 w-5 mr-3 text-black opacity-60" />
                        Password Change
                    </DropdownLink>

                    <DropdownLink :handle-click="() => showDropdown = false"
                        class="text-red-500 hover:bg-red-100 active:bg-red-100">
                        <ArrowLeftOnRectangleIcon class="h-5 w-5 mr-3 text-red-500" />
                        Logout
                    </DropdownLink>
                </Dropdown>
            </div>
        </div>
    </aside>
</template>
