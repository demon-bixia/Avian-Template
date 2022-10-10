<script setup lang="ts">
import { ArrowDownTrayIcon } from "@heroicons/vue/24/outline";
import { PlayIcon } from "@heroicons/vue/24/solid";
import type { Ref } from "vue";
import { computed, ref } from "vue";

import { Message } from "../../../../stores/chat";

import Typography from "../../../reusables/Typography.vue";
import MediaCarousel from "../MediaCarousel.vue";

const props = defineProps<{
    message: Message,
    self?: boolean,
}>();

const openCarousel: Ref<boolean> = ref(false);

const selectedAttachmentId: Ref<number | undefined> = ref();

// open the carousel with the selected index
const openCarouselWithAttachment = (attachmentId: number) => {
    selectedAttachmentId.value = attachmentId;
    openCarousel.value = true;
};

// close the carousel
const closeCarousel = () => {
    openCarousel.value = false;
};

// check if the message contians images or videos
const containsMedia = computed(() => {
    if (props.message.attachments) {
        for (let attachment of props.message.attachments) {
            if (['image', 'video'].includes(attachment.type))
                return true;
        }
    }
    return false;
});

// number of images attached to this message
const numberOfImages = computed(() => {
    let counter = 0;

    if (props.message.attachments) {
        for (let attachment of props.message.attachments) {
            if (attachment.type === 'image') {
                counter += 1;
            }
        }
    }

    return counter;
});

// number of videos attached to this message.
const numberOfVideos = computed(() => {
    let counter = 0;

    if (props.message.attachments) {
        for (let attachment of props.message.attachments) {
            if (attachment.type === 'video') {
                counter += 1;
            }
        }
    }

    return counter;
});
</script>

<template>
    <div>
        <div class="flex">
            <div v-for="(attachment, index) in message.attachments" :key="index" class="mr-2"
                :class="{'mt-4': containsMedia}">
                <!--image-->
                <button role="image" v-if="attachment.type === 'image' && !(index > 1)"
                    @click="openCarouselWithAttachment(attachment.id)" class="outline-none"
                    :aria-label="numberOfImages > 2 ? (props.message.attachments as []).length - 1  + ' more attachments' : attachment.name">
                    <div v-if="index < 2" :style="{ backgroundImage: `url(${attachment.url})`}"
                        class="rounded bg-cover bg-center"
                        :class="(numberOfImages === 1 && numberOfVideos === 0) ? ['w-[200px]', 'h-[200px]'] : ['md:w-[110px]', 'md:h-[100px]', 'xs:w-[100px]', 'xs:h-[95px]']">

                        <div v-if="index === 0 || (index === 1 && numberOfImages === 2)"
                            class="w-full h-full flex justify-center items-center rounded bg-black bg-opacity-20 hover:bg-opacity-10 transition duration-200">
                        </div>

                        <!--more images overlay-->
                        <div v-if="index === 1 && numberOfImages > 2"
                            class="w-full h-full  flex items-center justify-center rounded bg-black bg-opacity-40 text-white hover:bg-opacity-10 transition duration-200">
                            {{(props.message.attachments as []).length - 1}}+
                        </div>
                    </div>
                </button>

                <!--video-->
                <button v-if="attachment.type === 'video' && !(index > 1)"
                    @click="openCarouselWithAttachment(attachment.id)" class="overflow-hidden outline-none"
                    :aria-label="numberOfVideos > 2 ? (props.message.attachments as []).length - 1  + ' more attachments' : attachment.name">
                    <div v-if=" index < 2" :style="{ backgroundImage: `url(${attachment.thumbnail})`}"
                        class="rounded bg-cover bg-center"
                        :class="(numberOfVideos === 1 && numberOfImages  === 0) ? ['w-[200px]', 'h-[200px]',] : ['md:w-[110px]', 'md:h-[100px]',  'xs:w-[100px]', 'xs:h-[95px]']">

                        <div v-if="index === 0 || (index === 1 && numberOfVideos === 2)"
                            class="w-full h-full flex justify-center items-center rounded bg-black bg-opacity-20 hover:bg-opacity-10 transition duration-200">
                            <span class="p-3 rounded-full bg-white bg-opacity-40 transition-all duration-200">
                                <PlayIcon class="w-5 h-5 text-white" />
                            </span>
                        </div>

                        <!--more videos overlay-->
                        <div v-if="index === 1 && numberOfVideos > 2"
                            class="w-full h-full  flex items-center justify-center rounded bg-black bg-opacity-40 text-white hover:bg-opacity-10 transition duration-200">
                            {{(props.message.attachments as []).length - 1}}+
                        </div>
                    </div>
                </button>

                <!--file-->
                <div v-if="attachment.type === 'file' && !containsMedia">
                    <div class="flex">
                        <!--download button / icons-->
                        <button c
                            class="w-8 h-8 mr-4  flex justify-center rounded-full outline-none items-center duration-200"
                            :class="props.self ? ['bg-white', 'hover:bg-gray-100','active:bg-gray-200'] 
                            : ['bg-indigo-50', 'hover:bg-indigo-100', 'active:bg-indigo-200', 'dark:bg-gray-400', 'dark:hover:bg-gray-300', 'dark:focus:bg-gray-300', 'dark:active:bg-gray-200'] ">
                            <ArrowDownTrayIcon class="stroke-2 h-5 w-5 "
                                :class="props.self ? ['text-black', 'text-opacity-50'] : ['text-blue-500', 'dark:text-gray-50']" />
                        </button>

                        <div class="flex flex-col justify-center ">
                            <Typography variant="heading-2" :no-color="true" class="mb-3"
                                :class="props.self ? ['text-white'] : ['text-black', 'opacity-50', 'dark:text-white', 'dark:opacity-70']">
                                {{attachment.name}}</Typography>

                            <Typography variant="body-2" :no-color="true"
                                :class="props.self ? ['text-white'] : ['text-black', 'opacity-50', 'dark:text-white', 'dark:opacity-70']">
                                {{attachment.size}}
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>

            <!--carousel modal-->
            <MediaCarousel :open="openCarousel" :starting-id="(selectedAttachmentId as number)"
                :close-carousel="closeCarousel" />
        </div>
    </div>
</template>