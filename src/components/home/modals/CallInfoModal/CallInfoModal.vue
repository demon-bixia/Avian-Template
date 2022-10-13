<script setup lang="ts">
import { computed, ref } from "vue";
import { ArrowUturnLeftIcon } from "@heroicons/vue/24/solid";

import { Call } from "../../../../stores/chat";

import SlideTransition from "../../../reusables/transitions/SlideTransition.vue";
import Typography from "../../../reusables/Typography.vue";
import Modal from "../Modal.vue";
import CallInfo from "./CallInfo.vue";
import CallMembers from "./CallMembers.vue";
import SuccessButton from "../../../reusables/SuccessButton.vue";

defineEmits(['activePageChange']);

const props = defineProps<{
    call: Call,
    open: boolean,
    closeModal: () => void,
}>();

const activePageName = ref('call-info');

const animation = ref('slide-left');

const ActivePage = computed(() => {
    if (activePageName.value === 'call-info') {
        return CallInfo;
    } else if (activePageName.value === 'call-members') {
        return CallMembers;
    }
});

// (event) move between modal pages
const changeActiveTab = (event: { tabName: string, animationName: string }) => {
    animation.value = event.animationName;
    activePageName.value = event.tabName;
};

// (event) handle going to the previous modal page
const handleGoBack = () => {
    if (activePageName.value === 'call-members') {
        changeActiveTab({ tabName: 'call-info', animationName: 'slide-right' });
    }
};
</script>

<template>
    <Modal :open="props.open" :closeModal="props.closeModal">
        <template v-slot:content>
            <div class="w-[300px] py-6 overflow-x-hidden rounded bg-white dark:bg-gray-800">
                <!--modal header-->
                <div class="px-5 flex justify-between items-center ">
                    <Typography id="modal-title" variant="heading-1" class="-none" tabindex="0">
                        Call Detail
                    </Typography>

                    <button v-if="activePageName === 'call-info'" @click="props.closeModal"
                        class="group py-2 px-4 border rounded-sm border-gray-200  
                        dark:border-white dark:border-opacity-70  focus:outline-none focus:border-red-100 
                        focus:bg-red-100 hover:bg-red-100 hover:border-red-100 dark:hover:border-red-400
                         dark:hover:bg-red-400 dark:focus:bg-red-400 dark:focus:border-red-400 transition-all duration-200 outline-none" aria-label="close dialog">

                        <Typography variant="body-4"> esc </Typography>
                    </button>

                    <!--return button-->
                    <button v-else @click="handleGoBack"
                        class="group p-2 border rounded-full border-gray-200  
                        dark:border-white dark:border-opacity-70  focus:outline-none focus:border-indigo-100 
                        focus:bg-indigo-100 hover:bg-indigo-100 hover:border-indigo-100 dark:hover:border-indigo-400 
                        dark:hover:bg-indigo-400 dark:focus:bg-reindigod-400 dark:focus:border-indigo-400 transition-all duration-200 outline-none">
                        <ArrowUturnLeftIcon
                            class="w-5 h-5 text-black opacity-50 dark:text-white  dark:opacity-70 group-hover:text-indigo-500 group-hover:opacity-100 dark:group-hover:text-white" />
                    </button>
                </div>

                <!--modal content-->
                <SlideTransition :animation="animation">
                    <component @active-page-change="changeActiveTab" :is="ActivePage" :call="props.call" />
                </SlideTransition>

                <!--Call agian button-->
                <div class="px-5">
                    <SuccessButton class="w-full py-4">
                        Call again
                    </SuccessButton>
                </div>
            </div>
        </template>
    </Modal>
</template>