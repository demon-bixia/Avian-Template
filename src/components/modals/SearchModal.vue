<script setup lang="ts">
import { XMarkIcon } from "@heroicons/vue/24/solid";
import { defineProps } from "vue";

import { Conversation } from "../../stores/chat";

import Modal from "../modals/Modal.vue";
import SearchInput from "../utils/SearchInput.vue";
import Message from "../Chat/Message.vue";
import Typography from "../utils/Typography.vue";

const props = defineProps<{
    open: boolean,
    closeModal: () => void,
    conversation: Conversation,
}>();
</script>

<template>
    <Modal :open="props.open" :close-modal="props.closeModal">
        <template v-slot:content>
            <div class="w-[300px] py-6 bg-white rounded">
                <!--header-->
                <div class="mb-6 px-5 flex justify-between items-center">
                    <Typography variant="heading-1">
                        Messages
                    </Typography>

                    <button @click="props.closeModal"
                        class="group p-2 border outline-none rounded-full border-gray-200 text-sm text-black opacity-50 focus:outline-none focus:bg-red-100 hover:bg-red-100 hover:border-red-100 transition-all duration-200 ">
                        <XMarkIcon class="w-5 h-5 group-hover:text-red-500" />
                    </button>
                </div>

                <!--search-->
                <div class="mx-5 mb-5">
                    <SearchInput />
                </div>

                <!--message-->
                <div class="h-64 overflow-y-scroll scrollbar scrollbar-hidden">
                    <Message v-for="(message, index) in (props.conversation as Conversation).messages"
                        :message="message" :key="index" />
                </div>
            </div>
        </template>
    </Modal>
</template>