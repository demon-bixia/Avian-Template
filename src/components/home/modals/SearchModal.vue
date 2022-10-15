<script setup lang="ts">
import { Conversation } from "../../../stores/chat";

import SearchInput from "../../reusables/SearchInput.vue";
import Typography from "../../reusables/Typography.vue";
import Message from "../Chat/Message.vue";
import Modal from "../modals/Modal.vue";

import NoMessage from "../../reusables/emptyStates/NoMessage.vue";

const props = defineProps<{
    open: boolean,
    closeModal: () => void,
    conversation: Conversation,
}>();
</script>

<template>
    <Modal :open="props.open" :close-modal="props.closeModal">
        <template v-slot:content>
            <div class="w-[300px] py-6 bg-white dark:bg-gray-800 rounded">
                <!--header-->
                <div class="mb-6 px-5 flex justify-between items-center">
                    <Typography id="modal-title" variant="heading-1" tabindex="0">
                        Messages
                    </Typography>

                    <button @click="props.closeModal"
                        class="group py-2 px-4 border rounded-sm border-gray-200  
                        dark:border-white dark:border-opacity-70  focus:outline-none focus:border-red-100 
                        focus:bg-red-100 hover:bg-red-100 hover:border-red-100 dark:hover:border-red-400 
                        dark:hover:bg-red-400 dark:focus:bg-red-400 dark:focus:border-red-400 transition-all duration-200 outline-none">
                        <Typography>esc</Typography>
                    </button>
                </div>

                <!--search-->
                <div class="mx-5  mb-5">
                    <SearchInput />
                </div>

                <!--message-->
                <div class=" max-h-[230px] overflow-y-scroll scrollbar scrollbar-hidden">
                    <Message v-if="(props.conversation as Conversation).messages.length > 0"
                        v-for="(message, index) in (props.conversation as Conversation).messages" :message="message"
                        :key="index" />

                    <NoMessage vertical v-else />
                </div>
            </div>
        </template>
    </Modal>
</template>