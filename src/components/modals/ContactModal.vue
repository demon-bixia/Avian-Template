<script setup lang="ts">
import Modal from './Modal.vue';
import { defineProps } from "vue";
import { Conversation } from '../../stores/chat';
import { BellIcon, TrashIcon, NoSymbolIcon, AtSymbolIcon } from "@heroicons/vue/24/outline";
import SwitchInput from '../utils/SwitchInput.vue';

const props = defineProps<{
    open: boolean,
    conversation: Conversation,
    closeModal: () => void,
}>();
</script>

<template>
    <Modal :open="props.open" :close-modal="props.closeModal" :is-list="true">
        <template v-slot:header>
            Contact info
        </template>

        <template v-slot:content>
            <!--avatar and user name-->
            <div class="w-full p-5 pb-6">
                <div class="flex">
                    <div class="mr-5">
                        <div :style="{ backgroundImage: `url(${props.conversation?.contact.avatar})`}"
                            class="w-[38px] h-[38px] rounded-full bg-cover bg-center">
                        </div>
                    </div>

                    <div class="flex flex-col items-start">
                        <p href="#" class="mb-2 opacity-60 font-semibold text-sm leading-4 tracking-[0.16px]">
                            {{props.conversation?.contact.firstName + ' ' + props.conversation?.contact.lastName}}
                        </p>
                        <p class="opacity-50 font-extralight text-sm leading-4 tracking-[0.16px]">
                            Last seen Dec 16, 2019
                        </p>
                    </div>
                </div>
            </div>

            <!--secondary info-->
            <div class="w-full py-5 border-t border-gray-100">
                <div class="px-5 flex pb-5 items-center">
                    <AtSymbolIcon class="w-[20px] h-[20px] mr-6 text-gray-300 group-hover:text-indigo-300" />
                    <p class="opacity-60 font-normal text-sm leading-4 tracking-[0.16px]">
                        {{props.conversation.contact.email}}
                    </p>
                </div>

                <div class="px-5 flex items-center">
                    <BellIcon class="w-[20px] h-[20px] mr-6 text-gray-300 group-hover:text-indigo-300" />

                    <div class="grow flex justify-start items-start">
                        <p class="opacity-60 font-normal text-sm leading-4 tracking-[0.16px]">notifications</p>
                    </div>

                    <SwitchInput :value="true" :small="true" />
                </div>
            </div>

            <!--actions-->
            <div class="w-full pt-5 border-t border-gray-100">
                <a href="#" class="px-5 flex items-center pb-5 group">
                    <NoSymbolIcon class="w-[20px] h-[20px] mr-6 text-red-300 group-hover:text-red-400" />
                    <p class="font-normal text-sm leading-4 tracking-[0.16px] text-red-300 group-hover:text-red-400">
                        Block contact
                    </p>
                </a>

                <a href="#" class="px-5 flex items-center group">
                    <TrashIcon class="w-[20px] h-[20px] mr-6 text-red-300 group-hover:text-red-400" />
                    <p class="font-normal text-sm leading-4 tracking-[0.16px] text-red-300 group-hover:text-red-400">
                        Delete contact
                    </p>
                </a>
            </div>
        </template>
    </Modal>
</template>