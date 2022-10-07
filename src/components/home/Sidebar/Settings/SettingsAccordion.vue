<script setup lang="ts">
import type { Ref } from "vue";
import { ref } from "vue";

import useChatStore, { Settings } from "../../../../stores/chat";
import { updateAccount } from "../../../../stores/fakeData";
import { BooleanValue, FileOrTextValue, Value } from "./types";

import AccordionElement from "./AccordionElement.vue";

const chat = useChatStore();

// array that contains values that determine whether the accordion is collapsed or opened.
const accordionState: Ref<boolean[]> = ref((chat.settings as Settings[]).map(() => true));

// array contains the values that determine wheter the accordion is loading or not.
const accordionLoading: Ref<boolean[]> = ref((chat.settings as Settings[]).map(() => false));

// collapse and expand the accordion element.
const handleToggleElement = (index: number) => {
    accordionState.value = accordionState.value.map((state, idx) => {
        if (index === idx) {
            return !state;
        } else {
            return true;
        }
    });
};

// change the state of the accordion element to loading.
const toggleLoadingState = (index: number) => {
    accordionLoading.value = accordionLoading.value.map((state, idx) => {
        if (index === idx) {
            return !state;
        } else {
            return state;
        }
    });
};

// update the settings state.
const updateSettings = (event: Value) => {
    let newSettings = [...chat.settings];

    chat.settings = newSettings.map((settingGroup) => {
        if (settingGroup.id === event.groupId) {

            settingGroup.settings.map((setting) => {
                if (setting.id === event.id) {
                    setting.value = event.value;
                    return setting;
                } else {
                    return setting;
                }
            });

            return settingGroup;
        } else {
            return settingGroup;
        }
    });
};

// event that toggles the setting switch.
const handleToggleSwitch = (event: BooleanValue) => {
    updateSettings(event);
};

// event that fires when save settings is click
// send updated settings to server and save the state locally.
const handleSaveSettings = async (event: FileOrTextValue[], index: number) => {
    toggleLoadingState(index);

    await updateAccount();

    toggleLoadingState(index);

    for (let setting of event) {
        updateSettings(setting);
    }
};
</script>

<template>
    <div role="list" aria-label="Settings Accordion Control Group Buttons">
        <AccordionElement v-for="(settingsGroup, index) in chat.settings" :settings-group="settingsGroup"
            :collapsed="accordionState[index]" :loading="accordionLoading[index]" :index="index"
            :handle-toggle-element="handleToggleElement" :handleToggleSwitch="handleToggleSwitch"
            :handle-save-settings="handleSaveSettings" :key="index" />
    </div>
</template>