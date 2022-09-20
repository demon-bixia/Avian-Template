<script setup lang="ts">
import { ArrowPathIcon, LockClosedIcon, PlusCircleIcon } from '@heroicons/vue/24/outline';
import { defineProps } from "vue";
import { Notification } from "../../../stores/chat"

const props = defineProps<{
    notification: Notification
}>();
</script>

<template>
    <div class="w-full flex px-5 py-5 mb-3 rounded">
        <!--notifications icon-->
        <div class="mr-4">
            <div class="w-7 h-7 rounded-full flex justify-center items-center" :class="{
                    'bg-blue-100': notification.flag === 'account-update',
                    'bg-yellow-100': notification.flag === 'security', 
                    'bg-green-100': notification.flag === 'added-to-group'
            }">
                <ArrowPathIcon v-if="notification.flag === 'account-update'" class="stroke-2 h-5 w-5 text-blue-500" />
                <LockClosedIcon v-else-if="notification.flag === 'security'" class="stroke-2 h-5 w-5 text-yellow-500" />
                <PlusCircleIcon v-else-if="notification.flag === 'added-to-group'"
                    class="stroke-2 h-5 w-5 text-green-500" />
            </div>
        </div>

        <!--notification content-->
        <div class="grow">
            <p class="mb-4 opacity-60 font-semibold text-sm leading-4 tracking-[0.16px]">
                {{props.notification.title}}
            </p>
            <p class="opacity-60 font-normal text-sm leading-4 tracking-[0.16px]">
                {{props.notification.message}}
            </p>
        </div>
    </div>
</template>