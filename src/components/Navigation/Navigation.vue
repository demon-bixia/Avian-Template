<script setup lang="ts">
import { ArchiveBoxIcon, BellIcon, ChatBubbleOvalLeftIcon, Cog6ToothIcon, MoonIcon, UserIcon } from "@heroicons/vue/24/solid";
import { ForwardIcon, ArrowLeftOnRectangleIcon, ArrowPathIcon, InformationCircleIcon } from "@heroicons/vue/24/outline";
import { ref } from "vue";
import Logo from "../../assets/logo.svg";
import NavLink from "./NavLink.vue";
import useChatStore from "../../stores/chat";
import useAuthStore from "../../stores/auth";
import ScaleTransition from "../transitions/ScaleTransition.vue";

const auth = useAuthStore();
const chat = useChatStore();

const showDropdown = ref(false);

let LinkFocused = ref(false);

const handleLinkFocus = () => {
    LinkFocused.value = true;
};

const handleLinkBlur = () => {
    LinkFocused.value = false;
};

const handleActiveComponentChange = (value: string) => {
    chat.activeSidebarComponent = value;
};
</script>

<template>
    <aside class="w-11 h-full py-7 px-5 flex flex-col items-center">
        <!-- logo -->
        <div class="mb-7 h-7">
            <a href="#mainContent" title="Skip to main content" tabindex="0" @blur="handleLinkBlur"
                @focus="handleLinkFocus" :class="{absolute: !LinkFocused, 'right-[10000px]': !LinkFocused}">
                <ForwardIcon class="w-7 h-6 text-indigo-300" />
            </a>

            <a href="#" :class="{'hidden':LinkFocused}">
                <Logo class="w-8 h-7" />
            </a>
        </div>

        <!-- main navigation  -->
        <div class="grow">
            <nav aria-label="Main navigation">
                <ul>
                    <li>
                        <NavLink :icon="ChatBubbleOvalLeftIcon" title="Conversations"
                            @click="()=>handleActiveComponentChange('messages')"
                            :active="chat.activeSidebarComponent === 'messages'" />
                    </li>
                    <li>
                        <NavLink :icon="UserIcon" title="Contacts" @click="()=>handleActiveComponentChange('contacts')"
                            :active="chat.activeSidebarComponent === 'contacts'" />
                    </li>
                    <li>
                        <NavLink :icon="BellIcon" title="Notifications" :notifications="3"
                            @click="()=>handleActiveComponentChange('notifications')"
                            :active="chat.activeSidebarComponent === 'notifications'" />
                    </li>
                    <li>
                        <NavLink :icon="ArchiveBoxIcon" title="Archived messages"
                            @click="()=>handleActiveComponentChange('archive')"
                            :active="chat.activeSidebarComponent === 'archive'" />
                    </li>
                </ul>

            </nav>
        </div>

        <!-- secondary navigation  -->
        <div>
            <nav aria-label="Extra navigation">
                <ul>
                    <li>
                        <NavLink :icon="MoonIcon" title="Night mode" />
                    </li>
                    <li>
                        <NavLink :icon="Cog6ToothIcon" title="Settings"
                            @click="()=>handleActiveComponentChange('settings')"
                            :active="chat.activeSidebarComponent === 'settings'" />
                    </li>
                </ul>
            </nav>

            <hr class="mb-6 border-gray-100" />

            <div class="relative">
                <button @blur="showDropdown=false" @click="showDropdown = !showDropdown"
                    class="bg-white rounded-full active:scale-110 transition duration-200 ease-out focus:outline-none "
                    style="box-shadow:0 2px 5px rgba(193, 202, 255, 0.5),2px 0 5px rgba(193, 202, 255, 0.5),-2px 0 5px rgba(193, 202, 255, 0.5),0 -2px 5px rgba(193, 202, 255, 0.5);">
                    <div :style="{ backgroundImage: `url(${auth.user?.avatar})`}"
                        class="w-7 h-7  rounded-full bg-cover bg-center">
                    </div>
                </button>

                <!--dropdown menu-->
                <ScaleTransition>
                    <div v-show="showDropdown"
                        class="absolute bottom-0 left-[40px] z-10 mt-2 w-56  rounded-sm bg-white shadow-lg ring-1 ring-gray-100 focus:outline-none"
                        role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="0">
                        <div class="py-1" role="none">
                            <a href="#"
                                class=" border-b border-gray-200 text-black opacity-60 active:bg-gray-100 hover:bg-gray-50 duration-200 px-4 py-3 text-sm flex items-center"
                                role="menuitem" tabindex="-1" id="menu-item-0">
                                <InformationCircleIcon class="text-black opacity-60 h-5 w-5 mr-3" /> Profile Information
                            </a>
                            <a href="#"
                                class=" border-b border-gray-200 text-black opacity-60 active:bg-gray-100 hover:bg-gray-50 duration-200 px-4 py-3 text-sm flex items-center"
                                role="menuitem" tabindex="-1" id="menu-item-0">
                                <ArrowPathIcon class="text-black opacity-60 h-5 w-5 mr-3" /> Password Change
                            </a>
                            <a href="#"
                                class="  text-red-500  active:bg-red-100 hover:bg-red-50 duration-200 px-4 py-3 text-sm flex items-center"
                                role="menuitem" tabindex="-1" id="menu-item-0">
                                <ArrowLeftOnRectangleIcon class="text-red-500 h-5 w-5 mr-3" /> Logout
                            </a>
                        </div>
                    </div>
                </ScaleTransition>
            </div>
        </div>
    </aside>
</template>
