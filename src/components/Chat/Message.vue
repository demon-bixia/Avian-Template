<script setup lang="ts">
import { defineProps } from "vue";
import { Message } from "../../stores/chat";

const props = defineProps<{
    message: Message
}>();
</script>

<template>
    <button class="w-full p-5 flex hover:bg-indigo-100 active:bg-indigo-200 duration-200">
        <!--profile image-->
        <div class="mr-4">
            <div :style="{ backgroundImage: `url(${props.message.sender.avatar})`}"
                class="w-7 h-7 rounded-full bg-cover bg-center">
            </div>
        </div>

        <!--name and message-->
        <div class="grow">
            <div class="flex flex-col items-start">
                <p class="mb-4 opacity-60 font-semibold text-sm leading-4 tracking-[0.16px]">
                    {{ props.message.sender.firstName + ' ' + props.message.sender.lastName }}
                </p>

                <p class="opacity-60 font-normal text-sm leading-4 tracking-[0.16px]">
                    Wow really cool
                </p>
            </div>
        </div>

        <!--message date-->
        <div>
            <p class="opacity-60 font-light text-xs leading-4 tracking-[0.16px]">
                1/5/2019
            </p>
        </div>
    </button>
</template>