<script setup lang="ts">
import type { Ref } from "vue";
import { ref, computed } from "vue";

import { Contact, Conversation } from "../../../../stores/chat";

import SlideTransition from "../../../reusables/transitions/SlideTransition.vue";
import Modal from "../Modal.vue";
import ConversationInfo from "./ConversationInfo.vue";
import EditGroupInfo from "./EditGroupInfo.vue";
import Members from "./Members.vue";
import SharedMedia from "./SharedMedia.vue";

defineEmits(['activePageChange']);

const props = defineProps<{
    open: boolean,
    conversation: Conversation,
    closeModal: () => void,
}>();

// selected group member
const selectedMember: Ref<Contact | undefined> = ref();

// used to determine whether to slide left or right
const animation = ref("slide-left");

// name of the active modal page
const activePageName = ref("conversation-info");

// the active modal page component
const ActivePage = computed(() => {
    if (activePageName.value === 'conversation-info')
        return ConversationInfo;
    else if (activePageName.value === 'members')
        return Members;
    else if (activePageName.value === 'group-member')
        return ConversationInfo;
    else if (activePageName.value === 'shared-media')
        return SharedMedia;
    else if (activePageName.value === 'edit-group')
        return EditGroupInfo;
});


// (event) move between modal pages
const changeActiveTab = (event: { tabName: string, animationName: string, contact?: Contact, removeContact?: boolean }) => {
    animation.value = event.animationName;
    activePageName.value = event.tabName;

    if (event.contact) {
        selectedMember.value = event.contact;
    }

    if (event.removeContact) {
        selectedMember.value = undefined;
    }
};
</script>
    
<template>
    <Modal :open="props.open" :close-modal="props.closeModal">
        <template v-slot:content>
            <div class="overflow-x-hidden">
                <div class="w-[300px] bg-white dark:bg-gray-800 rounded py-6">
                    <!--content-->
                    <SlideTransition :animation="animation">
                        <component @active-page-change="changeActiveTab" :is="ActivePage"
                            :conversation="props.conversation" :close-modal="props.closeModal" :key="activePageName"
                            :contact="selectedMember" />
                    </SlideTransition>
                </div>
            </div>
        </template>
    </Modal>
</template>