<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import { computed, inject, onMounted, onUnmounted, ref, watch } from "vue";
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';
import type { Ref } from "vue";

import { Attachment, Conversation } from "../../../stores/chat";
import { hasAttachments } from "../../../utils";

import VideoPlayer from "./VideoPlayer.vue";
import FadeTransition from "../../reusables/transitions/FadeTransition.vue";

const props = defineProps<{
    open: boolean,
    startingId?: number,
    closeCarousel: () => void,
}>();

const carousel: Ref<HTMLElement | undefined> = ref();

const { activate, deactivate } = useFocusTrap(carousel);

// the active conversation
const conversation: Conversation | undefined = inject('activeConversaion');

// index of the current open attachment in the 
const currentIndex = ref(0);

// boolean value used to tell whether we moved from the starting point or not
const moved = ref(false);

// all the attchment in the conversation or an empty array
const attachments = computed(() => {
    let attachments = [];

    if (conversation) {
        for (let message of (conversation as Conversation).messages) {
            if (message.attachments && hasAttachments(message)) {
                for (let attachment of message.attachments) {
                    if (['video', 'image'].includes(attachment.type)) {
                        attachments.push(attachment);
                    }
                }
            }
        }
    }

    return attachments;
});

// the index of the attachment we start from
const startingIndex = computed(() => {
    let startingIndex: number | undefined;

    attachments.value.forEach((value, index) => {
        if (value.id === props.startingId) {
            startingIndex = index;
        }
    });

    return startingIndex;
});

// the selected attachment
const selectedAttachment = computed(() => {
    return attachments.value[moved ? (currentIndex.value as number) : (startingIndex.value as number)];
});

// set moved to false and then close modal
const handleCloseCarousel = () => {
    moved.value = false;
    props.closeCarousel();
}

// check if there is a next attachment.
const thereIsNext = () => {
    let length = (attachments.value as Attachment[])?.length;

    return length > 0 && !(currentIndex.value + 1 >= length);
};

// check if there is a previous attachment.
const thereIsPrevious = () => {
    let length = (attachments.value as Attachment[])?.length;
    return length > 0 && !(currentIndex.value <= 0);
};

// (event) increase selectedIndex if there is a next attachment.
const handleNextItem = () => {
    if (thereIsNext()) {
        moved.value = true;
        (currentIndex.value as number)++;
    }
};

// (event) increase selectedIndex if there is a previous attachment.
const handlePreviousItem = () => {
    if (thereIsPrevious()) {
        moved.value = true;
        (currentIndex.value as number)--;
    }
};

// (event) close modal when typing esc button
const handleCloseOnEscape = (event: KeyboardEvent) => {
    if (['Escape', 'Esc'].includes(event.key)) {
        props.closeCarousel();
    }
};

watch(() => props.open, () => {
    //  when modal opens make the value of currentIndex equal to the starting index
    currentIndex.value = (startingIndex.value as number);

    // toggle focus when the modal opens
    if (props.open) {
        setTimeout(() => {
            activate();
        }, 500);
    } else {
        setTimeout(() => {
            deactivate();
        }, 200);
    }
});

onMounted(() => {
    // when first opened set currentIndex to startingIndex.
    currentIndex.value = (startingIndex.value as number);
    // set the handleCloseOnEscape when mounting the component
    document.addEventListener('keydown', handleCloseOnEscape);
});

// remove the event when un-mounting the component
onUnmounted(() => {
    document.removeEventListener('keydown', handleCloseOnEscape);
});
</script>

<template>
    <div class="relative z-10" aria-label="media carousel" role="dialog" aria-modal="true">
        <!--overlay-->
        <Transition name="fade">
            <div v-show="props.open" class="fixed inset-0 bg-black bg-opacity-60 transition-opacity">
            </div>
        </Transition>

        <Transition name="scale">
            <div v-show="props.open" class="fixed inset-0 z-10 overflow-y-auto">
                <div ref="carousel" v-if="props.startingId" class="h-full  flex flex-col p-5">
                    <!--close carousel button-->
                    <div class="w-full flex justify-end">
                        <button @click="handleCloseCarousel" aria-label="previous item"
                            class="rounded-full p-2 hover:bg-white hover:bg-opacity-10 active:bg-opacity-20 transition-all duration-200">
                            <XMarkIcon class="w-7 h-7 text-white stroke-1" />
                        </button>
                    </div>

                    <div class="h-full flex justify-between">
                        <!--left controls-->
                        <div class="flex items-center justify-end basis-[5%]">
                            <button v-show="thereIsPrevious()" @click="handlePreviousItem"
                                class="p-2 flex items-center justify-center rounded-full hover:bg-white hover:bg-opacity-10 active:bg-opacity-20 transition-all duration-200">
                                <ChevronLeftIcon class="w-7 h-7 text-white stroke-1" />
                            </button>
                        </div>

                        <FadeTransition>
                            <!--image-->
                            <div v-if="selectedAttachment.type === 'image'"
                                class="px-5 flex w-full h-full items-center basis[90%]" :key="selectedAttachment.id">
                                <div class="w-full h-full bg-no-repeat bg-center"
                                    :style="{ backgroundImage: `url(${selectedAttachment?.url})`}">
                                </div>
                            </div>

                            <!--video-->
                            <VideoPlayer v-if="selectedAttachment.type === 'video'" :url="selectedAttachment.url"
                                :thumbnail="(selectedAttachment.thumbnail as string)" :key="selectedAttachment.id" />
                        </FadeTransition>

                        <!--right controls-->
                        <div class="flex items-center justify-end basis-[5%]">
                            <button v-show="thereIsNext()" @click="handleNextItem" aria-label="next item"
                                class="p-2 flex items-center justify-center rounded-full hover:bg-white hover:bg-opacity-10 active:bg-opacity-20 transition-all duration-200 ">
                                <ChevronRightIcon class="w-7 h-7 text-white stroke-1" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<style scoped>
.scale-enter-active {
    transition: all 0.200s ease-out;
}

.scale-leave-active {
    transition: all 0.050s ease-in;

}

.scale-enter-from {
    opacity: 0;
    transform: scale(.75);
}

.scale-enter-to {
    opacity: 1;
    transform: scale(1);
}

.scale-leave-from {
    opacity: 1;
    transform: scale(1);
}

.scale-leave-to {
    opacity: 0;
    transform: scale(.85);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.100s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>