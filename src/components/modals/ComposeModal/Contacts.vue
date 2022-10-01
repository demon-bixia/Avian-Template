<script setup lang="ts">
import useChatStore from '../../../stores/chat';

import SearchInput from '../../utils/SearchInput.vue';
import ContactItem from '../../Sidebar/Contacts/ContactItem.vue';
import Loading1 from '../../loading/Loading1.vue';

const chat = useChatStore();
</script>

<template>
    <div>
        <!--search-->
        <div class="mx-5 mb-5">
            <SearchInput :outline="true" />
        </div>

        <!--contacts-->
        <div class="overflow-y-scroll scrollbar scrollbar-hidden h-64">
            <ContactItem v-if="chat.status === 'success' && !chat.delayLoading"
                v-for="(contact, index) in chat.contacts" :key="index" :contact="contact" />
            <Loading1 v-if="chat.status === 'loading'  || chat.delayLoading" v-for="item in 3" />
        </div>
    </div>
</template>