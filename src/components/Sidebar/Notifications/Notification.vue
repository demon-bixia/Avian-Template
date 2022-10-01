<script setup lang="ts">
import { ArrowPathIcon, LockClosedIcon, PlusCircleIcon } from '@heroicons/vue/24/outline';
import { defineProps } from "vue";

import { Notification } from "../../../stores/chat"

import Typography from '../../utils/Typography.vue';

const props = defineProps<{
    notification: Notification
}>();
</script>

<template>
    <div class="w-full px-5 py-5 mb-3 flex rounded">
        <!--notifications icon-->
        <div class="mr-4">
            <div class="w-7 h-7  flex justify-center items-center rounded-full" :class="{
                    'bg-blue-100': notification.flag === 'account-update',
                    'bg-yellow-100': notification.flag === 'security', 
                    'bg-green-100': notification.flag === 'added-to-group'
            }">
                <ArrowPathIcon v-if="notification.flag === 'account-update'" class="w-5 h-5 stroke-1 text-blue-500" />
                <LockClosedIcon v-else-if="notification.flag === 'security'" class="w-5 h-5 stroke-1 text-yellow-500" />
                <PlusCircleIcon v-else-if="notification.flag === 'added-to-group'"
                    class="w-5 h-5 stroke-1 text-green-500" />
            </div>
        </div>

        <!--notification content-->
        <div class="grow">
            <Typography variant="heading-2" class="mb-4">
                {{props.notification.title}}
            </Typography>

            <Typography variant="body-2">
                {{props.notification.message}}
            </Typography>
        </div>
    </div>
</template>