<script setup lang="ts">
import { ArchiveBoxArrowDownIcon, InformationCircleIcon, TrashIcon } from "@heroicons/vue/24/outline";
import type { Ref } from "vue";
import { defineProps, ref, watch } from "vue";
import { Conversation } from "../../stores/chat";

const props = defineProps<{
    conversation: Conversation,
    slim?: boolean,
    activeId?: number,
    handleConversationChange?: (conversationId: number) => void,
}>();

const showContextMenu = ref(false);

const contextMenuCordinations: Ref<{ x: number, y: number } | undefined> = ref();

const handleShowContextMenu = (event: any) => {
    showContextMenu.value = true;
    contextMenuCordinations.value = { x: event.pageX, y: window.innerHeight - 125 <= event.pageY ? window.innerHeight - 200 : event.pageY };
};

const handleSelectConversation = () => {
    showContextMenu.value = false;
    if (props.handleConversationChange)
        props.handleConversationChange(props.conversation.id);
};

const isActive: Ref<boolean> = ref(props.activeId === props.conversation.id);

const getActiveId = () => props.activeId;

watch(getActiveId, () => {
    isActive.value = props.activeId === props.conversation.id
});

</script>

<template>
    <div>
        <a tabindex="0" @blur="showContextMenu = false" @contextmenu.prevent="handleShowContextMenu"
            @click="handleSelectConversation" href="#"
            class="w-full flex px-5 py-6 mb-3 hover:bg-indigo-50 active:bg-indigo-100 duration-200 transition ease-out focus:outline-none focus:bg-indigo-50"
            :class="{'rounded': !slim, 'py-6': !slim, 'py-[16px]': slim, 'bg-indigo-50': isActive}">
            <!--profile image-->
            <div class="mr-4">
                <div :style="{ backgroundImage: `url(${props.conversation.contact.avatar})`}"
                    class="w-7 h-7 rounded-full bg-cover bg-center">
                </div>
            </div>

            <!--name and last message-->
            <div class="grow">
                <div class="flex flex-col items-start">
                    <p class="mb-4 opacity-60 font-semibold text-sm leading-4 tracking-[0.16px]">
                        {{props.conversation.contact.firstName + ' ' + props.conversation.contact.lastName}}
                    </p>

                    <p class="opacity-60 font-normal text-sm leading-4 tracking-[0.16px]">
                        {{props.conversation.messages[props.conversation.messages.length - 1].content}}
                    </p>
                </div>
            </div>

            <!--last message time and notification-->
            <div>
                <p class="opacity-60 font-light text-xs leading-4 tracking-[0.16px]">
                    {{props.conversation.messages[props.conversation.messages.length - 1].date}}</p>
            </div>
        </a>

        <!--context menu-->
        <Transition name="scale">
            <div v-show="showContextMenu"
                :style="{left: contextMenuCordinations?.x + 'px', top: contextMenuCordinations?.y + 'px'}"
                class="absolute z-10 mt-2 w-56 top-0 rounded-sm bg-white shadow-lg ring-1 ring-gray-100 focus:outline-none"
                role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                <div class="py-1" role="none">
                    <a href="#"
                        class=" border-b border-gray-200 text-black opacity-60 active:bg-gray-100 hover:bg-gray-50 duration-200 px-4 py-3 text-sm flex items-center"
                        role="menuitem" tabindex="-1" id="menu-item-0">
                        <InformationCircleIcon class="text-black opacity-60 h-5 w-5 mr-3" />
                        Conversation info
                    </a>

                    <a href="#"
                        class=" border-b border-gray-200 text-black opacity-60 active:bg-gray-100 hover:bg-gray-50 duration-200 px-4 py-3 text-sm flex items-center"
                        role="menuitem" tabindex="-1" id="menu-item-0">
                        <ArchiveBoxArrowDownIcon class="text-black opacity-60 h-5 w-5 mr-3" />
                        Archive conversation
                    </a>

                    <a href="#"
                        class=" text-red-500  active:bg-red-100 hover:bg-red-50 duration-200 px-4 py-3 text-sm flex items-center"
                        role="menuitem" tabindex="-1" id="menu-item-1">
                        <TrashIcon class="text-red-500  h-5 w-5 mr-3" />
                        Delete conversation
                    </a>
                </div>
            </div>
        </Transition>
    </div>
</template>

<style scoped>
.scale-enter-active {
    transition: all 0.100s ease-out;
}

.scale-leave-active {
    transition: all 0.075s ease-in;

}

.scale-enter-from {
    opacity: 0;
    transform: scale(.95);
}

.scale-enter-to {
    opacity: 1;
    transform: scale(1);
}

.scale-leave-from {
    opacity: 1;
    transform: scale(1);
}

.scale-leave-to {
    opacity: 0;
    transform: scale(.95);
}
</style>