<script setup lang="ts">
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { computed, defineProps, ref } from "vue";

import FadeTransition from "../../transitions/FadeTransition.vue";
import Modal from "../Modal.vue";
import Contacts from "./Contacts.vue";
import Group from "./Group.vue";


const props = defineProps<{
    open: boolean,
    closeModal: () => void,
}>();

// the name of the selected tab
const activeTabName = ref('contacts')

// switch between the contacts and group tabs
const switchTab = (tabName: string) => {
    activeTabName.value = tabName;
};

// the active tab contacts or group.
const activeTab = computed(() => {
    if (activeTabName.value === 'contacts') {
        return Contacts;
    } else {
        return Group;
    }
});
</script>
    
<template>
    <Modal :open="props.open" :close-modal="props.closeModal">
        <template v-slot:content>
            <div class="w-[300px] bg-white rounded pt-6">
                <!--header-->
                <div class="flex justify-between items-center mb-6 px-5">
                    <p class="text-black opacity-60 text-xl leading-4 tracking-[0.16px]">
                        Compose
                    </p>

                    <button @click="props.closeModal"
                        class="group p-2 border border-gray-200 text-black opacity-50 rounded-full text-sm  focus:outline-none focus:bg-red-100 hover:bg-red-100 hover:border-red-100 transition-all duration-200 outline-none">
                        <XMarkIcon class="w-5 h-5 group-hover:text-red-500" />
                    </button>
                </div>

                <!--tabs-->
                <div class="px-5 pb-5">
                    <div class="flex items-center p-2 bg-gray-50 rounded-sm">
                        <button @click="switchTab('contacts')" class="basis-1/2 p-4 rounded-sm  text-md outline-none 
                            leading-4 tracking-[0.16px] transition-all duration-200 focus:outline-none mr-1"
                            :class="activeTabName === 'contacts' ? ['bg-indigo-400', 'text-white'] : ['text-black', 'opacity-60']">
                            Contact
                        </button>

                        <button @click="switchTab('group')" class="basis-1/2 p-4 rounded-sm text-md 
                            leading-4 tracking-[0.16px] transition-all duration-200 outline-none focus:outline-none"
                            :class="activeTabName === 'group' ? ['bg-indigo-400', 'text-white'] : ['text-black', 'opacity-60']">
                            Group
                        </button>
                    </div>
                </div>

                <!--ActiveTab-->
                <FadeTransition>
                    <component :is="activeTab" />
                </FadeTransition>
            </div>
        </template>
    </Modal>
</template>