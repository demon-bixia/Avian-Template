<script setup lang="ts">
import { ChevronRightIcon } from "@heroicons/vue/24/outline";
import { ref } from "vue";

import { Settings } from "../../../../stores/chat";
import { BooleanValue, FileOrTextValue } from "./types";

import PrimaryButton from "../../../reusables/PrimaryButton.vue";
import CollapseTransition from "../../../reusables/transitions/CollapseTransition.vue";
import Typography from "../../../reusables/Typography.vue";
import AccordionInput from "./AccordionInput.vue";

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
    <button role="listitem" :id="'accordion-control-' + props.index"
        class="w-full flex px-5 py-6 mb-3 rounded focus:outline-none" @click="() => handleToggleElement(props.index)"
        :aria-expanded="!collapsed" :aria-controls="'content-' + props.index">
        <!--title and description-->
        <div class="grow text-start">
            <Typography variant="heading-2" class="mb-4"> {{props.settingsGroup.title}} </Typography>
            <Typography variant="body-2"> {{props.settingsGroup.description}} </Typography>
        </div>

        <!--dropdown button icon-->
        <ChevronRightIcon
            class="w-5 h-5 stoke-1 text-black opacity-70 dark:text-white dark:opacity-70 transition-all duration-300"
            :class="{'rotate-90': !collapsed}" />
    </button>

    <!--accordion collapsed region-->
    <CollapseTransition>
        <div :id="'content-' + props.index" class="w-full flex flex-col px-5" :aria-hidden="collapsed"
            v-if="!collapsed">
            <!--inputs-->
            <div v-for="(setting, index) in props.settingsGroup.settings" class="mb-5" :key="index">
                <AccordionInput :setting="setting" :group-id="props.settingsGroup.id"
                    :handle-toggle-switch="handleToggleSwitch" :handle-queued-value-change="handleQueuedValueChange"
                    :value="(queuedValues as FileOrTextValue[])[index]" :index="index" />
            </div>

            <!--Save settings button-->
            <PrimaryButton v-if="hasInput()"
                @click="() => props.handleSaveSettings(queuedValues as FileOrTextValue[], props.index)"
                class="w-full py-4" :loading="props.loading">
                Save Settings
            </PrimaryButton>
        </div>
    </CollapseTransition>
</template>
