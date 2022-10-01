<script setup lang="ts">
import { PlusCircleIcon } from "@heroicons/vue/24/outline";
import type { Ref } from "vue";
import { ref, watch } from "vue";

import useChatStore, { ContactGroup } from "../../../stores/chat";

import Loading2 from "../../loading/Loading2.vue";
import SearchInput from "../../utils/SearchInput.vue";
import SidebarHeader from "../SidebarHeader.vue";
import ContactGroups from "./ContactGroups.vue";
import AddContactModal from "../../modals/AddContactModal.vue";
import IconButton from "../../utils/IconButton.vue"

const chat = useChatStore();

const searchText: Ref<string> = ref('');

const openModal = ref(false);

// contact groups filtered by search text
const filteredContactGroups: Ref<ContactGroup[] | undefined> = ref(chat.contactGroups);

// update the filtered contact groups based on the searchtext
watch(searchText, () => {
    filteredContactGroups.value = chat.contactGroups?.map((group) => {
        let newGroup = { ...group };

        newGroup.contacts = newGroup.contacts.filter((contact) => {
            if (contact.firstName.toLowerCase().includes(searchText.value.toLowerCase()))
                return true;
            else if (contact.lastName.toLowerCase().includes(searchText.value.toLowerCase()))
                return true;
        });

        return newGroup;
    }).filter((group) => group.contacts.length > 0);
});
</script>

<template>
    <div>
        <SidebarHeader>
            <!--title-->
            <template v-slot:title>Contacts</template>

            <!--side actions-->
            <template v-slot:actions>
                <IconButton @click="openModal = true">
                    <PlusCircleIcon class="w-[20px] h-[20px] text-indigo-300 hover:text-indigo-400 " />
                </IconButton>
            </template>
        </SidebarHeader>

        <!--search-->
        <div class="px-5 pb-5">
            <SearchInput v-model="searchText" />
        </div>

        <!--content-->
        <div class="w-full h-full scroll-smooth scrollbar-hidden" style="overflow-x:visible; overflow-y: scroll;">
            <ContactGroups v-if="chat.status === 'success' && !chat.delayLoading"
                :contactGroups="filteredContactGroups" />
            <Loading2 v-if="chat.status === 'loading'  || chat.delayLoading" v-for="item in 5" />
        </div>

        <!--add contact modal-->
        <AddContactModal :open-modal="openModal" :close-modal="() => openModal = false" />
    </div>
</template>
