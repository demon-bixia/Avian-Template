<script setup lang="ts">
import { XMarkIcon } from "@heroicons/vue/24/solid";
import { defineProps } from "vue";

import PrimaryButton from "../utils/PrimaryButton.vue";
import TextInput from "../utils/TextInput.vue";
import Modal from "./Modal.vue";

const props = defineProps<{
    openModal: boolean,
    closeModal: () => void,
}>();
</script>

<template>
    <Modal :open="props.openModal" :closeModal="props.closeModal">
        <template v-slot:content>
            <div class="w-[300px] bg-white rounded py-6">
                <!--modal header-->
                <div class="flex justify-between items-center px-5">
                    <p class="text-black opacity-60 text-xl leading-4 tracking-[0.16px]">
                        Add Contact
                    </p>

                    <button @click="props.closeModal"
                        class="group p-2 border border-gray-200 text-black opacity-50 rounded-full text-sm  focus:outline-none focus:bg-red-100 hover:bg-red-100 hover:border-red-100 transition-all duration-200 outline-none">
                        <XMarkIcon class="w-5 h-5 group-hover:text-red-500" />
                    </button>
                </div>

                <!--text input-->
                <div class="px-5 pb-5 pt-6">
                    <TextInput type="text" placeholder="Email" />
                </div>

                <!--submit button-->
                <div class="px-5">
                    <PrimaryButton class="w-full py-4">
                        Add
                    </PrimaryButton>
                </div>
            </div>
        </template>
    </Modal>
</template>