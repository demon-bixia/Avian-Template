<script setup lang="ts">
import { EllipsisVerticalIcon, InformationCircleIcon, MagnifyingGlassIcon, MusicalNoteIcon, NoSymbolIcon } from "@heroicons/vue/24/outline";
import { defineProps, ref } from "vue";

import useChatStore, { Conversation } from "../../stores/chat";
import { getAvatar, getName } from "../../utils";

import ConversationInfoModal from "../modals/ConversationInfoModal/ConversationInfoModal.vue";
import SearchModal from "../modals/SearchModal.vue";
import ScaleTransition from "../transitions/ScaleTransition.vue";
import Dropdown from "../utils/Dropdown.vue";
import DropdownLink from "../utils/DropdownLink.vue";
import Link from "../utils/Link.vue";
import Typography from "../utils/Typography.vue";

const props = defineProps<{
    activeConversation?: Conversation
}>();

const chat = useChatStore();

const showDropdown = ref(false);

const openSearch = ref(false);

const openInfo = ref(false);

// (event) close dropdown menu when click item
const handleCloseDropdown = () => {
    showDropdown.value = false;
};

// (event) close dropdown menu when clicking outside the menu.
const handleClickOutside = (event: Event) => {
    let target = event.target as HTMLElement;
    if (!target.classList.contains('open-top-menu')
        && !(target.parentElement as HTMLElement).classList.contains('open-top-menu')) {
        handleCloseDropdown();
    }
};
</script>

<template>
    <div>
        <!--top section-->
        <div class="w-full px-5 py-6 flex justify-center items-center">
            <div v-if="chat.status !== 'loading'" class="flex grow">
                <!--avatar-->
                <a href="#" class="mr-5" @click="() => openInfo = true">
                    <div :style="{ backgroundImage: `url(${getAvatar(activeConversation)})`}"
                        class="w-[36px] h-[36px] rounded-full bg-cover bg-center">
                    </div>
                </a>

                <!--name and last seen-->
                <div class="flex flex-col">
                    <Link variant="heading-2" href="#" @click="() => openInfo = true" class="mb-2">
                    {{getName(activeConversation)}}
                    </Link>

                    <Typography variant="body-2" class="font-extralight">
                        Last seen Dec 16, 2019
                    </Typography>
                </div>
            </div>

            <div class="flex" :class="{'hidden': chat.status === 'loading'}">
                <!--search button-->
                <button @click="openSearch = true"
                    class="group w-7 h-7 mr-3 flex justify-center items-center rounded-full  outline-none focus:outline-none focus:bg-gray-50 hover:bg-gray-50 transition-all duration-200">
                    <MagnifyingGlassIcon class="w-[20px] h-[20px] text-gray-300 group-hover:text-indigo-300" />
                </button>

                <div class="relative">
                    <!--dropdown menu button-->
                    <button @click="showDropdown = !showDropdown" tabindex="0"
                        class="open-top-menu group w-7 h-7 flex justify-center items-center rounded-full transition-all duration-200 outline-none focus:outline-none focus:bg-gray-50 hover:bg-gray-50">
                        <EllipsisVerticalIcon
                            class="open-top-menu w-[20px] h-[20px] text-gray-300 group-hover:text-indigo-300" />
                    </button>

                    <!--dropdown menu-->
                    <Dropdown :show="showDropdown" :position="['right-0']" :handle-click-outside="handleClickOutside">
                        <DropdownLink :handle-click="handleCloseDropdown">
                            <InformationCircleIcon class="h-5 w-5 mr-3 text-black opacity-60 " />
                            Profile Information
                        </DropdownLink>

                        <DropdownLink :handle-click="handleCloseDropdown">
                            <MusicalNoteIcon class="h-5 w-5 mr-3 text-black opacity-60 " />
                            View Media
                        </DropdownLink>

                        <DropdownLink :handle-click="handleCloseDropdown"
                            class="text-red-500 hover:bg-red-100 active:bg-red-100">
                            <NoSymbolIcon class="h-5 w-5 mr-3 text-red-500 " />
                            Block contact
                        </DropdownLink>
                    </Dropdown>
                </div>
            </div>
        </div>

        <!--search modal-->
        <SearchModal :open="openSearch" :close-modal="() => openSearch = false"
            :conversation="(props.activeConversation as Conversation)" />

        <!--contact info modal-->
        <ConversationInfoModal :open="openInfo" :closeModal="() => openInfo = false"
            :conversation="(props.activeConversation as Conversation)" />
    </div>
</template>