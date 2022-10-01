<script setup lang="ts">
import { defineProps } from "vue";

import { Message, Attachment } from "../../stores/chat";
import { getFullName, shorten, hasAttachments } from "../../utils";

import Typography from "../utils/Typography.vue";

const props = defineProps<{
    message: Message,
    self?: boolean,
}>()
</script>

<template>
    <div class="border-l pl-3 cursor-pointer border-opacity-50 duration-200" :class="props.self ?
     ['border-white'] 
    : ['border-black']">
        <!--name-->
        <p class="mb-3 font-semibold text-xs leading-4 tracking-[0.16px]"
            :class="props.self ? ['text-white']:['text-black', 'opacity-50'] ">
            {{getFullName(props.message.sender)}}
        </p>

        <!--content-->
        <Typography v-if="props.message.content" variant="body-2" :no-color="true"
            :class="props.self ? ['text-white']:['text-black', 'opacity-50']">
            {{shorten(props.message, 60)}}
        </Typography>

        <!--attachments title-->
        <Typography v-else-if="hasAttachments(props.message)" variant="body-2"
            :class="props.self ? ['text-white']:['text-black', 'opacity-50']">
            {{(props.message?.attachments as Attachment[])[0].name}}
        </Typography>
    </div>
</template>