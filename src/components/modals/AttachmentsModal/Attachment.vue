<script setup lang="ts">
import { ArrowPathRoundedSquareIcon, DocumentIcon, PhotoIcon, TrashIcon } from "@heroicons/vue/24/outline";
import { defineProps } from "vue";
import { Attachment } from "../../../stores/chat";

const props = defineProps<{
    attachment: Attachment
}>();
</script>

<template>
    <div href="#" class="flex px-5 py-4 transition-all duration-300">
        <!--icon-->
        <div class="w-8 h-8 mr-4 rounded-full flex justify-center items-center bg-gray-100">
            <PhotoIcon class="stroke-1 h-5 w-5 text-black opacity-60" v-if="attachment.type === 'image'" />
            <DocumentIcon class="stroke-1 h-5 w-5 text-black opacity-60" v-else-if="attachment.type === 'file'" />
        </div>

        <!--name, date and size-->
        <div class="grow">
            <div class="flex items-center justify-between mb-3">
                <p class="font-semibold text-sm leading-4 tracking-[0.16px] text-black opacity-60">
                    {{attachment.name}}
                </p>
            </div>

            <div class="flex justify-start">
                <p class="font-normal text-sm leading-4 tracking-[0.16px] text-black opacity-60">
                    {{attachment.size}}
                </p>
            </div>
        </div>

        <!--action buttons-->
        <div class="flex">
            <button
                class="group rounded-full mr-1 w-7 h-7 flex justify-center items-center transition-all duration-200 outline-none focus:outline-none focus:bg-gray-50 hover:bg-gray-50">
                <ArrowPathRoundedSquareIcon class="w-[16px] h-[16px] text-gray-300 group-hover:text-indigo-300" />
            </button>
            <button
                class="group rounded-full w-7 h-7 flex justify-center items-center transition-all duration-200 outline-none focus:outline-none focus:bg-red-50 hover:bg-red-50">
                <TrashIcon class="w-[16px] h-[16px] text-gray-300 group-hover:text-red-300" />
            </button>
        </div>
    </div>
</template>