<script setup lang="ts">
import { defineProps, ref } from "vue";
import type { Ref } from "vue";
import { Message } from "../../stores/chat";
import { TrashIcon, BookmarkIcon } from "@heroicons/vue/24/outline";

const props = defineProps<{
    message: Message,
    followUp: boolean,
    self: boolean,
    divider?: boolean,
}>();

const showContextMenu = ref(false);

const contextMenuCordinations: Ref<{ x: number, y: number } | undefined> = ref();

const handleShowContextMenu = (event: any) => {
    showContextMenu.value = true;
    contextMenuCordinations.value = {
        x: window.innerWidth - 195 <= event.pageX ? window.innerWidth - 250 : event.pageX,
        y: window.innerHeight - 125 <= event.pageY ? window.innerHeight - 200 : event.pageY
    };
};

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
        <div class="flex mb-5" :class="{'justify-end': props.self}">
            <!--avatar-->
            <div class="mr-4">
                <div :class="{'hidden': hideAvatar() }">
                    <div :style=" { backgroundImage: `url(${(props.message as Message).sender.avatar})`}"
                        class="w-[36px] h-[36px] rounded-full bg-cover bg-center">
                    </div>
                </div>
            </div>

            <!--content-->
            <div class="flex items-end" :class="{'ml-[36px]': props.followUp}">
                <div tabindex="0" @click="showContextMenu = false" @blur="showContextMenu = false"
                    @contextmenu.prevent="handleShowContextMenu"
                    class="bg-indigo-300 p-5 rounded-b hover:bg-indigo-400 duration-200"
                    :class="[props.self ? ['rounded-tl', 'ml-4', 'order-1'] : ['rounded-tr', 'mr-4',]]">
                    <p class="text-white font-normal text-sm leading-4 tracking-[0.16px]">
                        {{(props.message as Message).content}}
                    </p>
                </div>

                <div>
                    <p class="text-black opacity-60 font-normal text-xs leading-4 tracking-[0.16px]">
                        {{(props.message as Message).date}}
                    </p>
                </div>
            </div>
        </div>

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
                        <BookmarkIcon class="text-black opacity-60 h-5 w-5 mr-3" />
                        Copy
                    </a>

                    <a href="#"
                        class=" text-red-500  active:bg-red-100 hover:bg-red-50 duration-200 px-4 py-3 text-sm flex items-center"
                        role="menuitem" tabindex="-1" id="menu-item-1">
                        <TrashIcon class="text-red-500  h-5 w-5 mr-3" />
                        Delete Message
                    </a>
                </div>
            </div>
        </Transition>
    </div>
</template>