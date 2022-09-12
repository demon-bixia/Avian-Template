<script setup lang="ts">
import { ArchiveBoxIcon, BellIcon, ChatBubbleOvalLeftIcon, Cog6ToothIcon, MoonIcon, UserIcon } from "@heroicons/vue/24/solid";
import { ForwardIcon } from "@heroicons/vue/24/outline";
import { ref } from "vue";
import Logo from "../../assets/logo.svg";
import Person1 from '../../assets/people/person-1.jpg';
import NavLink from "./NavLink.vue";

let LinkFocused = ref(false);

const handleLinkFocus = () => {
    LinkFocused.value = true;
};

const handleLinkBlur = () => {
    LinkFocused.value = false;
};
</script>

<template>
    <aside class="w-11 h-full py-7 px-5 flex flex-col items-center">
        <!-- logo -->
        <div class="mb-7 h-7">
            <a href="#mainContent" title="Skip to main content" tabindex="0" @blur="handleLinkBlur"
                @focus="handleLinkFocus" :class="{absolute: !LinkFocused, 'left-full': !LinkFocused}">
                <ForwardIcon class="w-7 h-6 text-indigo-300" />
            </a>

            <a href="#" :class="{hidden:LinkFocused}">
                <Logo class="w-8 h-7" />
            </a>
        </div>

        <!-- main navigation  -->
        <div class="grow">
            <nav aria-label="Main navigation">
                <ul>
                    <li>
                        <NavLink :icon="ChatBubbleOvalLeftIcon" title="Conversations" />
                    </li>
                    <li>
                        <NavLink :icon="UserIcon" title="Contacts" />
                    </li>
                    <li>
                        <NavLink :icon="BellIcon" :notifications="3" title="Notifications" />
                    </li>
                    <li>
                        <NavLink :icon="ArchiveBoxIcon" title="Archived messages" />
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
                        <NavLink :icon="Cog6ToothIcon" title="Settings" />
                    </li>
                </ul>
            </nav>

            <hr class="mb-6 border-gray-100" />
            <button
                class="bg-white rounded-full shadow shadow-indigo-500 hover:shadow-md active:scale-110 transition duration-300 ease-out">
                <div :style="{ backgroundImage: `url(${Person1})`}" class="w-7 h-7  rounded-full bg-cover bg-center">
                </div>
            </button>
        </div>
    </aside>
</template>