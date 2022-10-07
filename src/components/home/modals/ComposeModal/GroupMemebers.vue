<script setup lang="ts">

import useChatStore from '../../../../stores/chat';

import Loading1 from '../../../reusables/loading/Loading1.vue';
import PrimaryButton from '../../../reusables/PrimaryButton.vue';
import SearchInput from '../../../reusables/SearchInput.vue';
import ContactItem from '../../Sidebar/Contacts/ContactItem.vue';

const chat = useChatStore();
</script>

<template>
    <div>
        <!--search-->
        <div class="mx-5 mt-3 mb-5">
            <SearchInput :outline="true" />
        </div>

        <!--contacts-->
        <div class="overflow-y-scroll scrollbar scrollbar-hidden max-h-64 mb-5">
            <ContactItem v-if="chat.status === 'success' && !chat.delayLoading"
                v-for="(contact, index) in chat.contacts" :key="index" :contact="contact" />

            <Loading1 v-if="chat.status === 'loading'  || chat.delayLoading" v-for="item in 3" />
        </div>

        <div class="flex px-5 mt-5 pb-6">
            <div class="grow"></div>
            <!--previous button-->
            <button @click="$emit('active-page-change', { tabName: 'group-info', animationName: 'slide-right' })" class="px-5 mr-4 text-black opacity-60 rounded-sm bg-white 
            hover:bg-indigo-50 active:bg-indigo-100 dark:bg-gray-800 
            dark:active:bg-gray-600 dark:focus:bg-gray-600 dark:text-white dark:opacity-70 
             duration-200 outline-none focus:outline-none">
                Previous
            </button>

            <!--next button-->
            <PrimaryButton class="px-5 bg-indigo-400 hover:bg-indigo-500 active:bg-indigo-500">
                Finish
            </PrimaryButton>
        </div>
    </div>
</template>