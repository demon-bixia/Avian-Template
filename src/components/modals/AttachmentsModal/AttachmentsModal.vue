<script setup lang="ts">
import { defineProps } from "vue";
import { ATTACHMENTS } from "../../../stores/fakeData";
import Modal from "../Modal.vue";
import Attachment from "./Attachment.vue";
import TextInput from "../../utils/TextInput.vue";

const props = defineProps<{
    open: boolean,
    closeModal: () => void,
}>();
</script>

<template>
    <Modal :open="props.open" :close-modal="props.closeModal">
        <template v-slot:content>
            <div class="w-[400px] bg-white rounded py-6">
                <!--attachments list-->
                <div class="h-[140px] overflow-y-scroll scrollbar">
                    <Attachment v-for="(attachment, index) in ATTACHMENTS" :attachment="attachment" :key="index" />
                </div>

                <!--caption button-->
                <div class="px-5 py-6">
                    <TextInput placeholder="Caption" type="text" />
                </div>

                <!--Action buttons-->
                <div class="flex w-full px-5">
                    <div class="grow flex justify-start">
                        <button
                            class="px-3 py-3 rounded-sm hover:bg-indigo-50 hover:text-indigo-400 active:bg-indigo-100 duration-200 font-normal text-sm leading-4 tracking-[0.16px] text-indigo-300">
                            Add
                        </button>
                    </div>

                    <div>
                        <button @click="props.closeModal"
                            class="px-3 py-3 rounded-sm hover:bg-indigo-50 hover:text-indigo-400 active:bg-indigo-100 duration-200 font-normal text-sm leading-4 tracking-[0.16px] text-indigo-300 mr-4">
                            Cancel
                        </button>

                        <button
                            class="px-3 py-3 rounded-sm hover:bg-indigo-50 hover:text-indigo-400 active:bg-indigo-100 duration-200 font-normal text-sm leading-4 tracking-[0.16px] text-indigo-300">
                            Send
                        </button>
                    </div>

                </div>
            </div>
        </template>
    </Modal>
</template>