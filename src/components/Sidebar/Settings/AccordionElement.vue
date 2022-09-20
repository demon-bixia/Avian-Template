<script setup lang="ts">
import { ChevronRightIcon } from "@heroicons/vue/24/outline";
import { defineProps, ref } from "vue";
import { Settings } from "../../../stores/chat";
import AccordionInput from "./AccordionInput.vue";
import { BooleanValue, FileOrTextValue } from "./types";

const props = defineProps<{
    index: number,
    collapsed: boolean,
    settingsGroup: Settings,
    loading: boolean,
    handleToggleElement: (index: number) => void,
    handleToggleSwitch: (event: BooleanValue) => void,
    handleSaveSettings: (event: FileOrTextValue[], index: number) => Promise<void>,
}>();

// when using input text element use these values to save queued changes.
// so you can submit them later
const queuedValues = ref((() => {
    return props.settingsGroup.settings.map((setting) => {
        if (['text', 'password', 'file'].includes(setting.type)) {
            return { value: setting.value || undefined, id: setting.id, groupId: props.settingsGroup.id };
        }
    }).filter((value) => value)
})());

// update queued changes
const handleQueuedValueChange = (event: FileOrTextValue, index: number) => {
    console.log(queuedValues.value);
    (queuedValues.value as FileOrTextValue[])[index] = event;
};

// test whether the settingGroup contains input elements or not.
// so you can render a save settings button to save queued changes.
const hasInput = () => {
    let inputSettings = props.settingsGroup.settings.filter((setting) => setting.type === 'text');

    return Boolean(inputSettings.length);
};
</script>

<template>
    <button class="w-full flex px-5 py-6 mb-3 rounded focus:outline-none"
        @click="() => handleToggleElement(props.index)">
        <!--title and description-->
        <div class="grow text-start">
            <p class="mb-4 opacity-60 font-semibold text-sm leading-4 tracking-[0.16px]">
                {{props.settingsGroup.title}}
            </p>
            <p class="opacity-60 font-normal text-sm leading-4 tracking-[0.16px]">
                {{props.settingsGroup.description}}
            </p>
        </div>

        <!--dropdown button icon-->
        <div>
            <i class="opacity-60 font-light text-xs leading-4 tracking-[0.16px]">
                <ChevronRightIcon class="w-5 h-5 stoke-1 text-black opacity-70 transition-all duration-300"
                    :class="{'rotate-90': !collapsed}" />
            </i>
        </div>
    </button>

    <!--accordion collapsed region-->
    <Transition name="collapse">
        <div class="w-full flex flex-col px-5" v-show="!collapsed">
            <div v-for="(setting, index) in props.settingsGroup.settings" class="mb-5" :key="index">
                <AccordionInput :setting="setting" :group-id="props.settingsGroup.id"
                    :handle-toggle-switch="handleToggleSwitch" :handle-queued-value-change="handleQueuedValueChange"
                    :value="(queuedValues as FileOrTextValue[])[index]" :index="index" />
            </div>

            <!--Save settings button-->
            <button @click="() => props.handleSaveSettings(queuedValues as FileOrTextValue[], props.index)"
                v-if="hasInput()" class="w-full p-3 rounded-sm bg-indigo-300 mt-2 hover:bg-indigo-400 active:ring 
                active:ring-indigo-200 transition duration-200 ease-out active:bg-indigo-400
                 focus:outline-none focus:ring focus:ring-indigo-100 flex  justify-center items-center" tabindex="0">

                <svg v-if="props.loading" :class="{'animate-spin': props.loading}"
                    class=" -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                </svg>

                <span v-if="props.loading" class="text-white">Processing</span>
                <span v-else class="text-white">Save Settings</span>
            </button>
        </div>
    </Transition>
</template>

<style>
.collapse-enter-active {
    animation: collapse reverse 300ms ease;
}

.collapse-leave-active {
    animation: collapse 300ms ease;
}

@keyframes collapse {
    100% {
        max-height: 0px;
        opacity: 0;
    }

    50% {
        max-height: 400px;
    }

    0% {
        opacity: 1;
    }

}
</style>