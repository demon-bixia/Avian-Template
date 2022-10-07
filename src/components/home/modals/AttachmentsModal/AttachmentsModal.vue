<script setup lang="ts">
import { ATTACHMENTS } from "../../../../stores/fakeData";
import useChatStore from "../../../../stores/chat";

import PrimaryButton from "../../../reusables/PrimaryButton.vue";
import TextInput from "../../../reusables/TextInput.vue";
import Modal from "../Modal.vue";
import Attachment from "./Attachment.vue";

const props = defineProps<{
    open: boolean,
    closeModal: () => void,
}>();

const chat = useChatStore();
</script>

<template>
    <Modal :open="props.open" :close-modal="props.closeModal">
        <template v-slot:content>
            <div class="w-[400px] bg-white dark:bg-gray-800 rounded py-6">
                <!--attachments list-->
                <div class="max-h-[140px] overflow-y-scroll "
                    :class="chat.darkMode ? ['scrollbar-dark'] : ['scrollbar']">
                    <Attachment v-for="(attachment, index) in ATTACHMENTS" :attachment="attachment" :key="index" />
                </div>

                <!--caption button-->
                <div class="px-5 py-6">
                    <TextInput placeholder="Caption" type="text" />
                </div>

                <!--Action buttons-->
                <div class="flex w-full px-5">
                    <div class="grow flex justify-start">
                        <PrimaryButton variant="gohst">
                            Add
                        </PrimaryButton>
                    </div>

                    <PrimaryButton variant="gohst" @click="props.closeModal" class="mr-4">
                        Cancel
                    </PrimaryButton>

                    <PrimaryButton>
                        Send
                    </PrimaryButton>
                </div>
            </div>
        </template>
    </Modal>
</template>