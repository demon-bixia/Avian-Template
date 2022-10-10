<script setup lang="ts">
import { ArrowUturnLeftIcon, BookmarkIcon, BookmarkSquareIcon, TrashIcon } from "@heroicons/vue/24/outline";

import linkifyStr from 'linkify-string';
import type { Ref } from "vue";
import { ref } from "vue";

import { Message, PreviewData, Recording as RecordingType } from "../../../../stores/chat";

import { getFullName } from "../../../../utils";
import Dropdown from "../../../reusables/Dropdown.vue";
import DropdownLink from "../../../reusables/DropdownLink.vue";
import Typography from "../../../reusables/Typography.vue";
import ReplyPreview from "../MessagePreview.vue";
import Attachments from "./Attachments.vue";
import LinkPreview from "./LinkPreview.vue";
import Recording from "./Recording.vue";

const props = defineProps<{
    message: Message,
    followUp: boolean,
    self: boolean,
    divider?: boolean,
    replyToMessage?: Message,
    selectMessageToReplyTo: (message?: Message) => void,
    handlePinMessage: (messageId: number) => void,
}>();

const showContextMenu = ref(false);

const contextMenuCordinations: Ref<{ x: number, y: number } | undefined> = ref();

// open context menu.
const handleShowContextMenu = (event: any) => {
    showContextMenu.value = true;
    contextMenuCordinations.value = {
        x: window.innerWidth - 220 <= event.pageX ? window.innerWidth - 250 : event.pageX,
        y: window.innerHeight - 200 <= event.pageY ? window.innerHeight - 200 : event.pageY
    };
};

// closes the context menu
const handleCloseContextMenu = () => {
    showContextMenu.value = false;
};

// close context menu when opening a new one.
const contextConfig = {
    handler: handleCloseContextMenu,
    events: ['contextmenu'],
};

// decide whether to show or hide avatar next to the image.
const hideAvatar = () => {
    if (props.divider && !props.self) {
        return false;
    }
    else {
        if (props.followUp) {
            return true;
        }
        if (props.self) {
            return true;
        }
    }
};
</script>

<template>
    <div>
        <div class="xs:mb-6 md:mb-5 flex" :class="{'justify-end': props.self}">
            <!--avatar-->
            <div class="mr-4" :class="{'ml-[36px]': props.followUp && !divider}">
                <div v-if="!hideAvatar()" tabindex="0" :aria-label="getFullName((props.message as Message).sender)"
                    class="outline-none">
                    <div :style=" { backgroundImage: `url(${(props.message as Message).sender.avatar})`}"
                        class="w-[36px] h-[36px] bg-cover bg-center rounded-full">
                    </div>
                </div>
            </div>

            <div class="flex items-end">
                <!--bubble-->
                <div @click="handleCloseContextMenu" v-click-outside="contextConfig"
                    @contextmenu.prevent="handleShowContextMenu"
                    class="group max-w-[500px] p-5 rounded-b transition duration-500" :class="[props.self ? ['rounded-tl', 'ml-4', 'order-1', 'bg-indigo-300', 'dark:bg-indigo-400'] 
                    : ['rounded-tr', 'mr-4', 'bg-gray-50', 'dark:bg-gray-600']]">

                    <!--reply to-->
                    <ReplyPreview v-if="props.replyToMessage" :message="(props.replyToMessage as Message)"
                        :self="props.self" class="mb-5 px-3" />

                    <!--content-->
                    <Typography variant="body-2" noColor
                        v-if='(props.message as Message).content && (props.message as Message).type !== "recording"'
                        :class="props.self ? ['text-white'] : ['text-black', 'opacity-60', 'dark:text-white', 'dark:opacity-70']"
                        v-html="linkifyStr((props.message.content as string), {
                        className: props.self ? 'text-black opacity-50' : 'text-indigo-500 dark:text-indigo-300', 
                        format: {url:(value) => value.length > 50 ? value.slice(0, 50) + `…` : value}
                        })" tabindex="0">
                    </Typography>

                    <!--recording-->
                    <div
                        v-else-if='(props.message as Message).content && (props.message as Message).type === "recording"'>
                        <Recording :recording="(props.message.content as RecordingType)" :self="props.self" />
                    </div>

                    <!--attachments-->
                    <Attachments v-if="(props.message.attachments as [])?.length > 0" :message="props.message"
                        :self="props.self" />

                    <!--link preview-->
                    <LinkPreview v-if="props.message.previewData && !props.message.attachments" :self="props.self"
                        :preview-data="(props.message.previewData as PreviewData)" class="mt-5" />
                </div>

                <!--date-->
                <div>
                    <Typography variant="body-1" class="whitespace-pre">
                        {{(props.message as Message).date}}
                    </Typography>
                </div>
            </div>
        </div>

        <!--custom context menu-->
        <Dropdown :close-dropdown="() => showContextMenu=false" :show="showContextMenu"
            :handle-close="handleCloseContextMenu" :handle-click-outside="handleCloseContextMenu"
            :cordinates="{left: contextMenuCordinations?.x + 'px', top: contextMenuCordinations?.y + 'px'}"
            :position="['top-0']">
            <DropdownLink :handle-click="()=>{handleCloseContextMenu(); selectMessageToReplyTo(props.message)}">
                <ArrowUturnLeftIcon class="h-5 w-5 mr-3 text-black opacity-60 dark:text-white dark:opacity-70" />
                Reply
            </DropdownLink>

            <DropdownLink :handle-click="handleCloseContextMenu">
                <BookmarkIcon class="h-5 w-5 mr-3 text-black opacity-60 dark:text-white dark:opacity-70" />
                Copy
            </DropdownLink>

            <DropdownLink :handle-click="()=> {handleCloseContextMenu(); props.handlePinMessage(props.message.id)} ">
                <BookmarkSquareIcon class="h-5 w-5 mr-3 text-black opacity-60 dark:text-white dark:opacity-70" />
                Pin
            </DropdownLink>

            <DropdownLink :handle-click="handleCloseContextMenu"
                class="text-red-500 hover:bg-red-100 active:bg-red-100 dark:text-red-500">
                <TrashIcon class="h-5 w-5 mr-3 text-red-500" />
                Delete Message
            </DropdownLink>
        </Dropdown>
    </div>
</template>