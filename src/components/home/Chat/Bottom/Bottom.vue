<script setup lang="ts">
import { CheckIcon, FaceSmileIcon, MicrophoneIcon, PaperAirplaneIcon, PaperClipIcon, XCircleIcon } from "@heroicons/vue/24/outline";
import type { Ref } from "vue";
import { ref } from "vue";
import EmojiPicker from 'vue3-emoji-picker';

import useChatStore, { Conversation, Message } from "../../../../stores/chat";

import IconButton from "../../../reusables/IconButton.vue";
import PrimaryButton from "../../../reusables/PrimaryButton.vue";
import ScaleTransition from "../../../reusables/transitions/ScaleTransition.vue";
import Typography from "../../../reusables/Typography.vue";
import AttachmentsModal from "../../modals/AttachmentsModal/AttachmentsModal.vue";
import SelectedReply from "./SelectedReply.vue";

import '../../../../../node_modules/vue3-emoji-picker/dist/style.css'

const props = defineProps<{
    activeConversation?: Conversation,
    selectedMessageToReplyTo?: Message,
    removeMessageToReplyTo: () => void
}>();

const chat = useChatStore();

// the content of the message
const content: Ref<string | null> = ref(null);

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

// close picker when you click outside.
const handleClickOutside = (event: Event) => {
    let target = (event.target as HTMLElement);
    let parent = (target.parentElement as HTMLElement);

    if ((target && !target.classList.contains('toggle-picker-button')) && (parent && !parent.classList.contains('toggle-picker-button'))) {
        showPicker.value = false;
    }
};
</script>

<template>
    <div>
        <!--selected reply display-->
        <div class="relative transition-all duration-200" :class="{'pt-[60px]': props.selectedMessageToReplyTo}">
            <SelectedReply :selected-message-to-reply-to="props.selectedMessageToReplyTo"
                :remove-message-to-reply-to="removeMessageToReplyTo" />
        </div>

        <div class="h-[80px] px-5 flex items-center" v-if="chat.status !== 'loading'"
            :class="recording ? ['justify-between'] : []">
            <!--select attachments button-->
            <IconButton @click="openAttachmentsModal = true" v-if="!recording" class="group w-7 h-7 mr-5 ">
                <PaperClipIcon class="w-[20px] h-[20px] text-gray-300 group-hover:text-indigo-300 " />
            </IconButton>

            <!--recording timer-->
            <Typography v-if="recording" variant="body-1" no-color class="text-indigo-300">00:11</Typography>

            <!--message textarea-->
            <div class="grow mr-5" v-if="!recording">
                <textarea cols="30" rows="1" placeholder="Write your message here" aria-label="Write your message here"
                    class="resize-none py-[30px] w-full mr-5 outline-none text-sm text-black opacity-60 
                    dark:text-white dark:opacity-70 font-normal leading-4 tracking-[0.16px] placeholder:text-black 
                    placeholder:opacity-50 dark:placeholder:text-white dark:placeholder:opacity-70 bg-transparent"
                    :class="chat.darkMode ? ['scrollbar-dark'] : ['scrollbar']"></textarea>
            </div>

            <!--cancel recording button-->
            <div v-if="recording" @click="handleCancelRecording">
                <PrimaryButton variant="gohst" color="danger">
                    Cancel
                </PrimaryButton>
            </div>

            <!--emojies-->
            <div class="relative" v-if="!recording">
                <!--emoji button-->
                <IconButton @click="showPicker = !showPicker" class="toggle-picker-button group w-7 h-7 mr-5"
                    aria-label="toggle emoji picker">
                    <XCircleIcon v-if="showPicker"
                        class=" w-[20px] h-[20px] text-gray-300 group-hover:text-indigo-300" />
                    <FaceSmileIcon v-else class="w-[20px] h-[20px] text-gray-300 group-hover:text-indigo-300" />
                </IconButton>

                <!--emoji picker-->
                <ScaleTransition>
                    <div v-click-outside="handleClickOutside" v-show="showPicker"
                        class="absolute z-10 bottom-[45px] right-0 mt-2">
                        <div role="none">
                            <EmojiPicker :native="true" hide-group-icons hide-group-names
                                class="dark:bg-gray-800 dark:text-white" />
                        </div>
                    </div>
                </ScaleTransition>
            </div>

            <!--send message button-->
            <button v-if="content && (content as string).length > 0"
                class="group w-7 h-7 flex justify-center items-center outline-none rounded-full focus:outline-none focus:bg-gray-50 hover:bg-gray-50 transition-all duration-200">
                <PaperAirplaneIcon class="w-[20px] h-[20px] text-gray-300 group-hover:text-indigo-300" />
            </button>

            <!--recording button-->
            <div v-else>
                <IconButton v-if="recording" @click="handleToggleRecording" aria-label="start recording"
                    class="relative group w-7 h-7 flex justify-center items-center outline-none rounded-full  bg-indigo-300 hover:bg-green-300 dark:hover:bg-green-400  dark:focus:bg-green-400  focus:outline-none transition-all duration-200">
                    <span
                        class="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-300 group-hover:bg-green-300 opacity-40">
                    </span>

                    <MicrophoneIcon class="w-[20px] h-[20px] text-white group-hover:hidden" />
                    <CheckIcon class="w-[20px] h-[20px] hidden text-white group-hover:block" />
                </IconButton>

                <IconButton v-else @click="handleToggleRecording" aria-label="finish recording" class="group w-7 h-7 ">
                    <MicrophoneIcon class="w-[20px] h-[20px] text-gray-300 group-hover:text-indigo-300" />
                </IconButton>
            </div>
        </div>

        <AttachmentsModal :open="openAttachmentsModal" :close-modal="() => openAttachmentsModal = false" />
    </div>
</template>


<style>
input[placeholder="Search emoji"] {
    background: rgba(0, 0, 0, 0.0);
}

.v3-emoji-picker .v3-header {
    border-bottom: 0;
}

.v3-emoji-picker .v3-footer {
    border-top: 0;
}
</style>