<script setup lang="ts">
import { ArrowUturnLeftIcon } from "@heroicons/vue/24/solid";
import { defineProps } from 'vue';

import { Conversation } from '../../../stores/chat';

import ContactItem from '../../Sidebar/Contacts/ContactItem.vue';
import SearchInput from '../../utils/SearchInput.vue';

const props = defineProps<{
    closeModal: () => void,
    conversation: Conversation,
}>();
</script>

<template>
    <div>
        <!--header-->
        <div class="flex justify-between items-center mb-6 px-5">
            <p class="text-black opacity-60 text-xl leading-4 tracking-[0.16px]">
                Memebers
            </p>

            <button @click="$emit('active-page-change', {tabName: 'conversationInfo', animationName: 'slide-right'})"
                class="group p-2 border outline-none rounded-full border-gray-200 text-sm text-black opacity-50  focus:outline-none focus:bg-indigo-100 hover:bg-indigo-100 hover:border-indigo-100 transition-all duration-200">
                <ArrowUturnLeftIcon class="w-5 h-5 group-hover:text-indigo-500" />
            </button>
        </div>

        <!--search-->
        <div class="mb-5 mx-5">
            <SearchInput />
        </div>

        <!--contacts-->
        <div class="overflow-y-scroll scrollbar scrollbar-hidden ">
            <ContactItem
                @contact-selected="contact => $emit('active-page-change', {tabName: 'conversationInfo', animationName: 'slide-left', contact: contact})"
                v-for="(contact, index) in props.conversation.contacts" :contact="contact" :key="index" />
        </div>
    </div>
</template>