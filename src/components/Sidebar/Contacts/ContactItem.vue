<script setup lang="ts">
import { defineEmits, defineProps } from "vue";
import { Contact } from "../../../stores/chat";
import { getFullName } from "../../../utils";
import Typography from "../../utils/Typography.vue";

defineEmits(['contactSelected']);

const props = defineProps<{
    contact: Contact
}>();
</script>

<template>
    <div>
        <a @click="$emit('contactSelected', props.contact)" href="#"
            class="w-full p-5 flex hover:bg-indigo-50 active:bg-indigo-100 transition duration-200 ease-out">
            <!--profile image-->
            <div class="mr-4">
                <div :style=" { backgroundImage: `url(${props.contact.avatar})`}"
                    class="w-7 h-7 rounded-full bg-cover bg-center">
                </div>
            </div>

            <!--contact name-->
            <div class="flex flex-col items-start">
                <Typography variant="heading-2" class="mb-2" tabindex="0">
                    {{getFullName(props.contact)}}
                </Typography>

                <Typography variant="body-2">
                    Last seen 2:30 am
                </Typography>
            </div>
        </a>
    </div>
</template>