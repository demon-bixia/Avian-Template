<script setup lang="ts">
import { PlusCircleIcon } from "@heroicons/vue/24/outline";
import { Ref, ref } from "vue";

import useChatStore, { Call as CallType } from "../../../../stores/chat";

import NoCalls from "../../../reusables/emptyStates/NoCalls.vue";
import IconButton from "../../../reusables/IconButton.vue";
import Loading1 from "../../../reusables/loading/Loading1.vue";
import ExpandTransition from "../../../reusables/transitions/ExpandTransition.vue";
import SidebarHeader from "../SidebarHeader.vue";
import Call from "./Call.vue";
import CallList from "./CallList.vue";
import CallInfoModal from "../../modals/CallInfoModal/CallInfoModal.vue";
import DialModal from "../../modals/DialModal/DialModal.vue";

const chat = useChatStore();

const selectedCall: Ref<CallType | null> = ref(null)

const openInfoModal = ref(false);

const openDialModal = ref(false);

const handleOpenInfoModal = (call: CallType) => {
    openInfoModal.value = true;
    selectedCall.value = call;
};
</script>

<template>
    <div>
        <SidebarHeader>
            <!--title-->
            <template v-slot:title>Voice Calls</template>

            <!--side actions-->
            <template v-slot:actions>
                <IconButton @click="openDialModal = true" aria-label="initiate call">
                    <PlusCircleIcon class="w-[20px] h-[20px] text-indigo-300 hover:text-indigo-400" />
                </IconButton>
            </template>
        </SidebarHeader>

        <!--content-->
        <div ref="contactContainer" class="w-full h-full scroll-smooth scrollbar-hidden"
            style="overflow-x:visible; overflow-y: scroll;">
            <Loading1 v-if="chat.status === 'loading'  || chat.delayLoading" v-for="item in 6" />

            <div v-else>
                <ExpandTransition>
                    <div class="max-h-[200px]" v-if="chat.callMinimized && chat.activeCall">
                        <Call v-if="chat.activeCall" :call="chat.activeCall"
                            :open-voice-call-modal="() => chat.openVoiceCall = true"
                            :end-call="() => {chat.activeCall = null; chat.callMinimized = false}" active />
                    </div>
                </ExpandTransition>

                <CallList v-if="(chat.calls as CallType[])?.length > 0" :calls="(chat.calls as CallType[])"
                    delay-loading="chat.delayLoading" :chat-status="chat.status"
                    :open-info-modal="handleOpenInfoModal" />

                <NoCalls v-else />
            </div>
        </div>

        <!--call info modal-->
        <CallInfoModal :open="openInfoModal" :close-modal="() => openInfoModal = false"
            :call="(selectedCall as CallType)" />

        <!--start call modal-->
        <DialModal :open="openDialModal" :close-modal="() => openDialModal = false" />
    </div>
</template>
