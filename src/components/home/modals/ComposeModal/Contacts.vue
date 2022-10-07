<script setup lang="ts">
import useChatStore, { Contact } from '../../../../stores/chat';

import Loading1 from '../../../reusables/loading/Loading1.vue';
import SearchInput from '../../../reusables/SearchInput.vue';
import ContactItem from '../../Sidebar/Contacts/ContactItem.vue';
import NoContacts from "../../../reusables/emptyStates/NoContacts.vue";

const chat = useChatStore();
</script>

<template>
    <div class="pb-6">
        <!--search-->
        <div class="mx-5 mb-5">
            <SearchInput :outline="true" />
        </div>

        <!--contacts-->
        <div class="overflow-y-scroll scrollbar scrollbar-hidden max-h-64">
            <Loading1 v-if="chat.status === 'loading'  || chat.delayLoading" v-for="item in 3" />

            <ContactItem
                v-else-if="chat.status === 'success' && !chat.delayLoading && (chat.contacts as Contact[])?.length > 0"
                v-for="(contact, index) in chat.contacts" :key="index" :contact="contact" />

            <NoContacts vertical v-else />
        </div>
    </div>
</template>