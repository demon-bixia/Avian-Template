<script setup lang="ts">
import { EyeSlashIcon } from "@heroicons/vue/24/outline";
import { computed } from "vue";

import useChatStore, { Conversation } from "../../../../stores/chat";
import { getConversationIndex } from "../../../../utils";

import IconButton from "../../../reusables/IconButton.vue";
import SlideTransition from "../../../reusables/transitions/SlideTransition.vue";
import MessagePreview from "../MessagePreview.vue";

const props = defineProps<{
    activeConversation?: Conversation,
}>();

const chat = useChatStore();


// extract the pinned message from the id
const pinnedMessage = computed(() => {
    return (props.activeConversation as Conversation).messages.find((message) => {
        return message.id === (props.activeConversation as Conversation).pinnedMessage;
    });
});

// (event) hide the pinned message
const hidePinnedMessage = () => {
    const activeConversationIndex = getConversationIndex((props.activeConversation as Conversation).id);

    if (activeConversationIndex !== undefined && activeConversationIndex !== null) {
        (chat.conversations as Conversation[])[activeConversationIndex].pinnedMessageHidden = true;
    }
};

// (event) remove the pinned message
const removePinnedMessage = () => {
    const activeConversationIndex = getConversationIndex((props.activeConversation as Conversation).id);

    if (activeConversationIndex !== undefined && activeConversationIndex !== null) {
        (chat.conversations as Conversation[])[activeConversationIndex].pinnedMessage = undefined;
    }
};
</script>

<template>
    <SlideTransition animation="shelf-down">
        <div class="absolute z-10 w-full px-5 py-2 bg-white dark:bg-gray-800 flex items-center justify-between transition-all duration-500"
            v-if="pinnedMessage && !(props.activeConversation as Conversation).pinnedMessageHidden">
            <!--pinned message preview-->
            <MessagePreview :message="pinnedMessage" />

            <div class=" flex ">
                <!--hide pinned Message-->
                <IconButton @click="hidePinnedMessage" class="group  text-gray-300 group-hover:text-red-300">
                    <EyeSlashIcon class="w-[16px] h-[16px]" />
                </IconButton>
            </div>
        </div>
    </SlideTransition>
</template>