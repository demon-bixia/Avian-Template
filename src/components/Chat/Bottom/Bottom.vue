<script setup lang="ts">
import { FaceSmileIcon, MicrophoneIcon, PaperAirplaneIcon, PaperClipIcon, XCircleIcon, CheckIcon } from "@heroicons/vue/24/outline";
import { defineProps, ref } from "vue";
import EmojiPicker from 'vue3-emoji-picker';

import useChatStore, { Conversation, Message } from "../../../stores/chat";

import AttachmentsModal from "../../modals/AttachmentsModal/AttachmentsModal.vue";
import ScaleTransition from "../../transitions/ScaleTransition.vue";
import SelectedReply from "./SelectedReply.vue";
import Typography from "../../utils/Typography.vue";
import PrimaryButton from "../../utils/PrimaryButton.vue";

import "../../../../node_modules/vue3-emoji-picker/dist/style.css";

const props = defineProps<{
    activeConversation?: Conversation,
    selectedMessageToReplyTo?: Message,
    removeMessageToReplyTo: () => void
}>();

const chat = useChatStore();

// the content of the message
const content = ref('');

// determines whether the app is recording or not
const recording = ref(false);

// open emoji picker.
const showPicker = ref(false);

// open modal used to send multiple attachments attachments.
const openAttachmentsModal = ref(false);

// start and stop recording
const handleToggleRecording = () => {
    recording.value = !recording.value;
};

// stop recording wothout sending
const handleCancelRecording = () => {
    recording.value = false;
};
</script>

<template>
    <div>
        <!--selected reply display-->
        <div class="relative transition-all duration-200" :class="{'pt-[80px]': props.selectedMessageToReplyTo}">
            <SelectedReply :selected-message-to-reply-to="props.selectedMessageToReplyTo"
                :remove-message-to-reply-to="removeMessageToReplyTo" />
        </div>

        <div class="h-[80px] px-5 flex items-center" v-if="chat.status !== 'loading'"
            :class="recording ? ['justify-between'] : []">
            <!--select attachments button-->
            <button @click="openAttachmentsModal = true" v-if="!recording"
                class="group w-7 h-7 mr-5 flex justify-center items-center outline-none rounded-full focus:outline-none focus:bg-gray-50 hover:bg-gray-50 transition-all duration-200">
                <PaperClipIcon class="w-[20px] h-[20px] text-gray-300 group-hover:text-indigo-300 " />
            </button>

            <!--recording timer-->
            <Typography v-if="recording" variant="body-1" no-color class="text-indigo-300">00:11</Typography>

            <!--message textarea-->
            <div class="grow mr-5" v-if="!recording">
                <textarea cols="30" rows="1" placeholder="Write your message here"
                    class="resize-none py-[30px] w-full mr-5 outline-none text-sm text-black opacity-60 font-normal leading-4 tracking-[0.16px] placeholder:text-black placeholder:opacity-50 scrollbar"></textarea>
            </div>

            <!--cancel recording button-->
            <div v-if="recording" @click="handleToggleRecording">
                <PrimaryButton variant="gohst" color="danger">
                    Cancel
                </PrimaryButton>
            </div>

            <!--emojies-->
            <div class="relative" v-if="!recording">
                <!--emoji button-->
                <button @click="showPicker = !showPicker"
                    class="group w-7 h-7 mr-5 flex justify-center items-center outline-none rounded-full focus:outline-none focus:bg-gray-50 hover:bg-gray-50 transition-all duration-200">
                    <XCircleIcon v-if="showPicker"
                        class="w-[20px] h-[20px] text-gray-300 group-hover:text-indigo-300" />
                    <FaceSmileIcon v-else class="w-[20px] h-[20px] text-gray-300 group-hover:text-indigo-300" />
                </button>

                <!--emoji picker-->
                <ScaleTransition>
                    <div v-show="showPicker" class="absolute z-10 bottom-[45px] right-0 mt-2">
                        <div role="none">
                            <EmojiPicker :native="true" @select="()=>{}" />
                        </div>
                    </div>
                </ScaleTransition>
            </div>

            <!--send message button-->
            <button v-if="content.length > 0"
                class="group w-7 h-7 flex justify-center items-center outline-none rounded-full focus:outline-none focus:bg-gray-50 hover:bg-gray-50 transition-all duration-200">
                <PaperAirplaneIcon class="w-[20px] h-[20px] text-gray-300 group-hover:text-indigo-300" />
            </button>

            <!--recording button-->
            <div v-else>
                <button v-if="recording" @click="handleToggleRecording"
                    class="relative group w-7 h-7 flex justify-center items-center outline-none rounded-full  bg-indigo-300 hover:bg-green-300  focus:outline-none transition-all duration-200">
                    <span
                        class="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-300 group-hover:bg-green-300 opacity-40">
                    </span>

                    <MicrophoneIcon class="w-[20px] h-[20px] text-white group-hover:hidden" />
                    <CheckIcon class="w-[20px] h-[20px] hidden text-white group-hover:block" />
                </button>

                <button v-else @click="handleToggleRecording"
                    class="group w-7 h-7 flex justify-center items-center outline-none rounded-full focus:outline-none focus:bg-gray-50 hover:bg-gray-50 transition-all duration-200">
                    <MicrophoneIcon class="w-[20px] h-[20px] text-gray-300 group-hover:text-indigo-300" />
                </button>
            </div>
        </div>

        <AttachmentsModal :open="openAttachmentsModal" :close-modal="() => openAttachmentsModal = false" />
    </div>
</template>