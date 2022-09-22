<script setup lang="ts">
import { FaceSmileIcon, PaperAirplaneIcon, PaperClipIcon, XCircleIcon } from "@heroicons/vue/24/outline";
import { defineProps, ref } from "vue";
import EmojiPicker from 'vue3-emoji-picker';
import useChatStore, { Conversation } from "../../stores/chat";
import ScaleTransition from "../transitions/ScaleTransition.vue";
import "../../../node_modules/vue3-emoji-picker/dist/style.css";

const props = defineProps<{
    activeConversation?: Conversation
}>();

const chat = useChatStore();

const showPicker = ref(false);

const togglePicker = () => { showPicker.value = !showPicker.value };

const selectEmoji = () => { };
</script>

<template>

    <div class="h-[80px] flex items-center px-5" v-if="chat.status !== 'loading'">
        <button
            class="group rounded-full w-7 h-7 mr-5 flex justify-center items-center transition-all duration-200 outline-none focus:outline-none focus:bg-gray-50 hover:bg-gray-50">
            <PaperClipIcon class="w-[20px] h-[20px] text-gray-300 group-hover:text-indigo-300" />
        </button>

        <div class="grow mr-5">
            <textarea cols="30" rows="1" placeholder="Write your message here"
                class="resize-none  py-[30px] scrollbar w-full mr-5 opacity-60 font-normal text-sm leading-4 tracking-[0.16px] outline-none placeholder:text-black placeholder:opacity-50"></textarea>
        </div>

        <div class="relative">
            <button @click="togglePicker"
                class="rounded-full group w-7 h-7 mr-5 flex justify-center items-center transition-all duration-200 outline-none focus:outline-none focus:bg-gray-50 hover:bg-gray-50">
                <XCircleIcon v-if="showPicker" class="w-[20px] h-[20px] text-gray-300 group-hover:text-indigo-300" />
                <FaceSmileIcon v-else class="w-[20px] h-[20px] text-gray-300 group-hover:text-indigo-300" />
            </button>

            <!--emoji picker-->
            <ScaleTransition>
                <div v-show="showPicker" class="absolute z-10 mt-2 bottom-[45px] right-0">
                    <div role="none">
                        <EmojiPicker :native="true" @select="selectEmoji" />
                    </div>
                </div>
            </ScaleTransition>
        </div>

        <button
            class="rounded-full w-7 h-7 group  flex justify-center items-center transition-all duration-200 outline-none focus:outline-none focus:bg-gray-50 hover:bg-gray-50">
            <PaperAirplaneIcon class="w-[20px] h-[20px] text-gray-300 group-hover:text-indigo-300" />
        </button>
    </div>
</template>
