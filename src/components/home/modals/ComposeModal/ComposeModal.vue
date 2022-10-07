<script setup lang="ts">
import type { Ref } from "vue";
import { computed, ref } from "vue";

import FadeTransition from "../../../reusables/transitions/FadeTransition.vue";
import Typography from "../../../reusables/Typography.vue";
import Modal from "../Modal.vue";
import Contacts from "./Contacts.vue";
import Group from "./Group.vue";

const props = defineProps<{
    open: boolean,
    closeModal: () => void,
}>();

// the p element containing the modal title
const modalTitle: Ref<HTMLElement | null> = ref(null);

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
            <div class="w-[300px] bg-white dark:bg-gray-800 rounded pt-6">
                <!--header-->
                <div class="flex justify-between items-center mb-6 px-5">
                    <Typography id="modal-title" variant="heading-1" ref="modalTitle" class="outline-none" tabindex="0">
                        Compose
                    </Typography>

                    <button @click="props.closeModal"
                        class="group py-2 px-4 border rounded-sm border-gray-200  
                        dark:border-white dark:border-opacity-70  focus:outline-none focus:border-red-100 
                        focus:bg-red-100 hover:bg-red-100 hover:border-red-100 dark:hover:border-red-400 
                        dark:hover:bg-red-400 dark:focus:bg-red-400 dark:focus:border-red-400 transition-all duration-200 outline-none"
                        aria-label="close dialog">

                        <Typography variant="body-4"> esc </Typography>
                    </button>
                </div>

                <!--tabs-->
                <div class="px-5 pb-5">
                    <div class="flex items-center p-2 bg-gray-50 rounded-sm dark:bg-gray-700">
                        <button @click="switchTab('contacts')" class="basis-1/2 p-4 rounded-sm  text-md outline-none 
                            leading-4 tracking-[0.16px] transition-all duration-200 focus:outline-none mr-1"
                            :class="activeTabName === 'contacts' ? ['bg-indigo-400', 'text-white'] : ['text-black', 'opacity-60',  'dark:text-white', 'dark:opacity-70']">
                            Contact
                        </button>
                        <button @click="switchTab('group')" class="basis-1/2 p-4 rounded-sm text-md 
                            leading-4 tracking-[0.16px] transition-all duration-200 outline-none focus:outline-none"
                            :class="activeTabName === 'group' ? ['bg-indigo-400', 'text-white'] : ['text-black', 'opacity-60', 'dark:text-white', 'dark:opacity-70']">
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