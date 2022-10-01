<script setup lang="ts">
import { DocumentIcon, PhotoIcon, VideoCameraIcon } from "@heroicons/vue/24/outline";
import { defineProps } from "vue";

import { Attachment } from "../../../stores/chat";

const props = defineProps<{
    attachment: Attachment,
    date: string,
}>();
</script>

<template>
    <a href="#" class="p-5 flex hover:bg-indigo-50 active:bg-indigo-100 transition-all duration-300">
        <!--icon-->
        <div class="w-8 h-8 mr-4 flex justify-center items-center rounded-full bg-gray-50">
            <PhotoIcon class="h-5 w-5 text-gray-500" v-if="props.attachment.type === 'image'" />
            <DocumentIcon class="h-5 w-5  text-gray-500 " v-else-if="props.attachment.type === 'file'" />
            <VideoCameraIcon class="h-5 w-5  text-gray-500 " v-else-if="props.attachment.type === 'video'" />
        </div>

        <!--name, date and size-->
        <div class="grow">
            <div class="flex items-center justify-between mb-3">
                <p class="font-semibold text-sm text-black opacity-60 leading-4 tracking-[0.16px] ">
                    {{props.attachment.name}}
                </p>

                <p class="font-normal text-sm text-black opacity-60 leading-4 tracking-[0.16px]">
                    {{props.date}}
                </p>
            </div>

            <div class="flex justify-start">
                <p class="font-normal text-sm text-black opacity-60 leading-4 tracking-[0.16px]">
                    {{props.attachment.size}}
                </p>
            </div>
        </div>
    </a>
</template>