<script setup lang="ts">
import { EllipsisVerticalIcon, InformationCircleIcon, MagnifyingGlassIcon, MusicalNoteIcon, NoSymbolIcon } from "@heroicons/vue/24/outline";
import { defineProps, ref } from "vue";
import useChatStore, { Conversation } from "../../stores/chat";
import Modal from "../modals/Modal.vue";
import Search from "../Sidebar/Search.vue";
import ScaleTransition from "../transitions/ScaleTransition.vue";
import Message from "./Message.vue";
import ContactModal from "../modals/ContactModal.vue";
import Loading1 from "../loading/Loading1.vue";

const props = defineProps<{
    activeConversation?: Conversation
}>();

const chat = useChatStore();

const showDropdown = ref(false);

const openSearch = ref(false);

const openInfo = ref(false);

const toggleDropdown = () => {
    showDropdown.value = !showDropdown.value;
};

const closeDropdown = () => {
    showDropdown.value = false;
};

const closeSearchModal = () => {
    openSearch.value = false;
};

const openSearchModal = () => {
    openSearch.value = true;
};

const closeInfoModal = () => {
    openInfo.value = false;
};

const openInfoModal = () => {
    openInfo.value = true;
};
</script>

<template>
    <div>
        <!--top section-->
        <div class="w-full px-5 py-6 flex justify-center items-center">
            <div v-if="chat.status !== 'loading'" class="flex grow">
                <a href="#" class="mr-5" @click="openInfoModal">
                    <div :style="{ backgroundImage: `url(${activeConversation?.contact.avatar})`}"
                        class="w-[36px] h-[36px] rounded-full bg-cover bg-center">
                    </div>
                </a>

                <div class="flex flex-col">
                    <a @click="openInfoModal" href="#"
                        class="mb-2 opacity-60 font-semibold text-sm leading-4 tracking-[0.16px]">
                        {{activeConversation?.contact.firstName + ' ' + activeConversation?.contact.lastName}}
                    </a>
                    <p class="opacity-50 font-extralight text-sm leading-4 tracking-[0.16px]">
                        Last seen Dec 16, 2019
                    </p>
                </div>
            </div>

            <div class="flex" :class="{'hidden': chat.status === 'loading'}">
                <button @click="openSearchModal"
                    class="rounded-full group w-7 h-7 mr-3 flex justify-center items-center transition-all duration-200 outline-none focus:outline-none focus:bg-gray-50 hover:bg-gray-50">
                    <MagnifyingGlassIcon class="w-[20px] h-[20px] text-gray-300 group-hover:text-indigo-300" />
                </button>

                <div class="relative">
                    <button @click="toggleDropdown" @blur="closeDropdown" tabindex="0"
                        class="rounded-full w-7 h-7 group  flex justify-center items-center transition-all duration-200 outline-none focus:outline-none focus:bg-gray-50 hover:bg-gray-50">
                        <EllipsisVerticalIcon class="w-[20px] h-[20px] text-gray-300 group-hover:text-indigo-300" />
                    </button>

                    <ScaleTransition>
                        <div v-show="showDropdown"
                            class="absolute right-0 z-10 mt-2 w-56  rounded-sm bg-white shadow-lg ring-1 ring-gray-100 focus:outline-none"
                            role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="0">
                            <div class="py-1" role="none">
                                <a href="#"
                                    class=" border-b border-gray-200 text-black opacity-60 active:bg-gray-100 hover:bg-gray-50 duration-200 px-4 py-3 text-sm flex items-center"
                                    role="menuitem" tabindex="-1" id="menu-item-0">
                                    <InformationCircleIcon class="text-black opacity-60 h-5 w-5 mr-3" /> Contact
                                    Information
                                </a>
                                <a href="#"
                                    class=" border-b border-gray-200 text-black opacity-60 active:bg-gray-100 hover:bg-gray-50 duration-200 px-4 py-3 text-sm flex items-center"
                                    role="menuitem" tabindex="-1" id="menu-item-0">
                                    <MusicalNoteIcon class="text-black opacity-60 h-5 w-5 mr-3" />
                                    View Media
                                </a>
                                <a href="#"
                                    class="  text-red-500  active:bg-red-100 hover:bg-red-50 duration-200 px-4 py-3 text-sm flex items-center"
                                    role="menuitem" tabindex="-1" id="menu-item-0">
                                    <NoSymbolIcon class="text-red-500 h-5 w-5 mr-3" />
                                    Block contact
                                </a>
                            </div>
                        </div>
                    </ScaleTransition>
                </div>
            </div>
        </div>

        <!--search modal-->
        <Modal :open="openSearch" :close-modal="closeSearchModal" :is-list="true">
            <template v-slot:header> Messages </template>

            <template v-slot:middle>
                <div class="mb-2">
                    <Search />
                </div>
            </template>

            <template v-slot:content>
                <Message v-for="(message, index) in (props.activeConversation as Conversation).messages"
                    :message="message" :key="index" />
            </template>
        </Modal>

        <!--contact info modal-->
        <ContactModal :open="openInfo" :closeModal="closeInfoModal"
            :conversation="(props.activeConversation as Conversation)" />
    </div>
</template>