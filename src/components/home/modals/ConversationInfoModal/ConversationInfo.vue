<script setup lang="ts">
import { ArrowLeftOnRectangleIcon, AtSymbolIcon, BellIcon, NoSymbolIcon, ShareIcon, TrashIcon, UserIcon } from "@heroicons/vue/24/outline";
import { ArrowUturnLeftIcon } from "@heroicons/vue/24/solid";

import { Contact, Conversation } from "../../../../stores/chat";
import { getAvatar, getFullName, getName, getOddContact } from "../../../../utils";

import Typography from "../../../reusables/Typography.vue";
import InfoItem from "./InfoItem.vue";

const props = defineProps<{
    conversation?: Conversation,
    contact?: Contact,
    closeModal: () => void
}>();
</script>

<template>
    <div>
        <div class="mb-6 px-5 flex justify-between items-center">
            <!--title-->
            <Typography variant="heading-1" id="modal-title" class="outline-none" tabindex="0">
                <span v-if="(props.conversation as Conversation).type === 'couple' || props.contact">Contact</span>
                <span v-else-if="(props.conversation as Conversation).type === 'group'">Group</span>
                <span v-else-if="(props.conversation as Conversation).type === 'boradcast'">Broadcast</span>
                Info
            </Typography>

            <!--close button-->
            <button v-if="!props.contact" @click="props.closeModal"
                class="group py-2 px-4 border rounded-sm border-gray-200  
                        dark:border-white dark:border-opacity-70  focus:outline-none focus:border-red-100 
                        focus:bg-red-100 hover:bg-red-100 hover:border-red-100 dark:hover:border-red-400 
                        dark:hover:bg-red-400 dark:focus:bg-red-400 dark:focus:border-red-400 transition-all duration-200 outline-none">
                <Typography variant="body-4">
                    esc
                </Typography>
            </button>

            <!--return button-->
            <button v-else @click="$emit('active-page-change', {tabName: 'members', animationName: 'slide-right'})"
                class="group p-2 border rounded-full border-gray-200  
                        dark:border-white dark:border-opacity-70  focus:outline-none focus:border-indigo-100 
                        focus:bg-indigo-100 hover:bg-indigo-100 hover:border-indigo-100 dark:hover:border-indigo-400 
                        dark:hover:bg-indigo-400 dark:focus:bg-reindigod-400 dark:focus:border-indigo-400 transition-all duration-200 outline-none">
                <ArrowUturnLeftIcon
                    class="w-5 h-5 text-black opacity-100 dark:text-white dark:opacity-70 group-hover:text-indigo-500 group-hover:opacity-100 dark:group-hover:text-white" />
            </button>
        </div>

        <!--top-->
        <div class="w-full p-5 pb-6">
            <div class="flex">
                <!--avatar-->
                <div class="mr-5">
                    <div v-if="props.contact" :style="{ backgroundImage: `url(${props.contact.avatar})`}"
                        class="w-[38px] h-[38px] rounded-full bg-cover bg-center">
                    </div>

                    <div v-else :style="{ backgroundImage: `url(${getAvatar(props.conversation)})`}"
                        class="w-[38px] h-[38px] rounded-full bg-cover bg-center">
                    </div>
                </div>

                <!--name-->
                <div class="flex flex-col items-start">
                    <Typography variant="heading-2" class="mb-3">
                        <span v-if="props.contact">
                            {{getFullName(props.contact)}}
                        </span>
                        <span v-else>
                            {{getName(props.conversation)}}
                        </span>
                    </Typography>

                    <Typography variant="body-2" class="font-extralight">
                        <!--last seen-->
                        <span v-if="(props.conversation as Conversation).type === 'couple' || contact">
                            Last seen Dec 16, 2019
                        </span>

                        <!--or number of group memebers-->
                        <span v-else-if="['group', 'boradcast'].includes((props.conversation as Conversation).type)">
                            {{(props.conversation as Conversation).contacts.length}} Contacts
                        </span>
                    </Typography>
                </div>
            </div>
        </div>

        <!--middle-->
        <div class="w-full py-5 border-t border-gray-100 dark:border-gray-700">
            <!--(contact) email-->
            <div v-if="(conversation as Conversation).type === 'couple' || props.contact"
                class="flex px-5 pb-5 items-center">
                <InfoItem :icon="AtSymbolIcon" :title="getOddContact(props.conversation)?.email" />
            </div>

            <!--(group) members-->
            <div v-if="['group', 'boradcast'].includes((props.conversation as Conversation).type) && !props.contact"
                class="px-5 flex items-center pb-5">
                <InfoItem :icon="UserIcon" title="memebers" link chevron
                    @click="$emit('active-page-change', {tabName: 'members', animationName: 'slide-left'})" />
            </div>

            <!--(both) notifications-->
            <div class="px-5 flex items-center">
                <InfoItem :icon="BellIcon" title="notifications" switch />
            </div>

            <!--media-->
            <div class="px-5 pt-5 flex items-center">
                <InfoItem :icon="ShareIcon" title="shared media" link chevron
                    @click="$emit('active-page-change', {tabName: 'sharedMedia', animationName: 'slide-left'})" />
            </div>
        </div>

        <!--bottom-->
        <div class="w-full border-t border-gray-100 dark:border-gray-700">
            <!--block contact-->
            <div v-if="(props.conversation as Conversation).type === 'couple' || props.contact" class="px-5 pt-5 group">
                <InfoItem :icon="NoSymbolIcon" title="block contact" link danger />
            </div>

            <!--delete contact-->
            <div v-if="(props.conversation as Conversation).type === 'couple' || props.contact" class="px-5 pt-5 group">
                <InfoItem :icon="TrashIcon" title="delete contact" link danger />
            </div>

            <!--exit group-->
            <div v-if="['group', 'boradcast'].includes((props.conversation as Conversation).type) && !props.contact"
                class="px-5 pt-5 flex items-center group">
                <InfoItem :icon="ArrowLeftOnRectangleIcon" title="exit group" link danger />
            </div>
        </div>
    </div>
</template>