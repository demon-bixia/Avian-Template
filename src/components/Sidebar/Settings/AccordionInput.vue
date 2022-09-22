<script setup lang="ts">
import { defineProps } from "vue";
import { Setting } from "../../../stores/chat";
import TextInput from "../../utils/TextInput.vue";
import SwitchInput from "../../utils/SwitchInput.vue";
import DropFileUpload from "../../utils/DropFileUpload.vue";
import { FileOrTextValue, TextValue, FileValue, BooleanValue } from "./types";


const props = defineProps<{
    setting: Setting,
    groupId: number,
    index: number,
    value?: TextValue & FileValue,
    handleToggleSwitch: (event: BooleanValue) => void,
    handleQueuedValueChange: (event: FileOrTextValue, index: number) => void,
}>();
</script>

<template>
    <div class="mb-5">
        <!--switch input-->
        <div v-if="props.setting.type === 'switch'">
            <SwitchInput @switch-clicked="handleToggleSwitch" :id="props.setting.title" :label="props.setting.title"
                :value="(props.setting.value as boolean)" :description="props.setting.description"
                :setting-id="props.setting.id" :group-id="props.groupId" />
        </div>

        <!--text input-->
        <div v-if="props.setting.type === 'text' || props.setting.type === 'password'">
            <TextInput @value-changed="event => props.handleQueuedValueChange(event, index)" :id="props.setting.title"
                :label="props.setting.title" :value="(props.value as TextValue).value" :type="props.setting.type"
                :settingId="props.setting.id" :groupId="props.groupId" />
        </div>

        <!--file upload-->
        <div v-if="props.setting.type === 'file'">
            <DropFileUpload @file-selected="event => props.handleQueuedValueChange(event, index)"
                :id="props.setting.title" :label="props.setting.title" :description="props.setting.description"
                :type="props.setting.type" :value="(props.value as FileValue).value" :setting-id="props.setting.id"
                :group-id="props.groupId" />
        </div>
    </div>
</template>