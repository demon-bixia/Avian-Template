<script setup lang="ts">
import { PlusCircleIcon } from "@heroicons/vue/24/outline";
import type { Ref } from "vue";
import { ref, watch } from "vue";
import useChatStore, { ContactGroup } from "../../../stores/chat";
import Content from "../Content.vue";
import Header from "../Header.vue";
import LoadingContactGroup from "../loadingComponents/LoadingContactGroup.vue";
import Modal from "../Modal.vue";
import Search from "../Search.vue";
import ContactGroups from "./ContactGroups.vue";
import TextInput from "../../utils/TextInput.vue";
import PrimaryButton from "../../utils/PrimaryButton.vue";

const chat = useChatStore();

const open = ref(false);

const filteredContactGroups: Ref<ContactGroup[] | undefined> = ref(chat.contactGroups);

const searchText: Ref<string> = ref('');

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

const openModal = () => {
    open.value = true;
};

const closeModal = () => {
    open.value = false;
};
</script>

<template>
    <div>
        <Header>
            <template v-slot:title>Contacts</template>
            <template v-slot:actions>
                <button @click="openModal" class="rounded-full w-7 h-7  flex justify-center items-center 
                     transition-all duration-200 outline-none
                     focus:outline-none focus:bg-gray-50 hover:bg-gray-50">
                    <PlusCircleIcon class="w-[20px] h-[20px] text-indigo-300 hover:text-indigo-400 " />
                </button>
            </template>
        </Header>

        <Search v-model="searchText" />

        <Content>
            <template v-slot:content>
                <ContactGroups v-if="chat.status === 'success' && !chat.delayLoading"
                    :contactGroups="filteredContactGroups" />
                <LoadingContactGroup v-if="chat.status === 'loading'  || chat.delayLoading" v-for="item in 5" />
            </template>
        </Content>

        <Modal :open="open" :closeModal="closeModal">
            <template v-slot:header>
                Add Contact
            </template>

            <template v-slot:content>
                <div class="px-5 py-5">
                    <TextInput type="text" placeholder="Email" />
                </div>

                <div class="px-5 py-1">
                    <PrimaryButton>
                        Add
                    </PrimaryButton>
                </div>
            </template>
        </Modal>
    </div>
</template>
