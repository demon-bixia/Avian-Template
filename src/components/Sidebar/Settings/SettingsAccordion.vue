<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import { Settings } from "../../../stores/chat";
import AccordionElement from "./AccordionElement.vue";
import useChatStore from "../../../stores/chat";
import { Value, FileOrTextValue, BooleanValue } from "./types";
import { updateAccount } from "../../../stores/fakeData";

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

// event that changes the switch form toggled to untoggled.
const handleToggleSwitch = (event: BooleanValue) => {
    updateSettings(event);
};

// change the state of the accordion element to loading.
const toggleLoadinState = (index: number) => {
    accordionLoading.value = accordionLoading.value.map((state, idx) => {
        if (index === idx) {
            return !state;
        } else {
            return state;
        }
    });

}

// event that fires when save settings is click
// send updated settings to server and save the state locally.
const handleSaveSettings = async (event: FileOrTextValue[], index: number) => {
    toggleLoadinState(index);

    await updateAccount();

    toggleLoadinState(index);

    for (let setting of event) {
        updateSettings(setting);
    }
};
</script>

<template>
    <AccordionElement v-for="(settingsGroup, index) in chat.settings" :settings-group="settingsGroup"
        :collapsed="accordionState[index]" :loading="accordionLoading[index]"
        :handle-toggle-element="handleToggleElement" :index="index" :key="index"
        :handleToggleSwitch="handleToggleSwitch" :handle-save-settings="handleSaveSettings" />
</template>