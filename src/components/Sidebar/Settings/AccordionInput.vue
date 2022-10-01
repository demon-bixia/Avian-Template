<script setup lang="ts">
import { defineProps } from "vue";

import { Setting } from "../../../stores/chat";
import { BooleanValue, FileOrTextValue, FileValue, TextValue } from "./types";

import DropFileUpload from "../../utils/DropFileUpload.vue";
import SwitchInput from "../../utils/SwitchInput.vue";
import TextInput from "../../utils/TextInput.vue";

const props = defineProps<{
    setting: Setting,
    groupId: number,
    index: number,
    value?: TextValue | FileValue,
    handleToggleSwitch: (event: BooleanValue) => void,
    handleQueuedValueChange: (event: FileOrTextValue, index: number) => void,
}>();

</script>

<template>
    <div class="mb-5">
        <!--switch input-->
        <div v-if="props.setting.type === 'switch'">
            <SwitchInput
                @switch-clicked="(value) => props.handleToggleSwitch({value: value, id: props.setting.id, groupId: props.groupId })"
                :label="props.setting.title" :value="(props.setting.value as boolean)"
                :description="props.setting.description" :id="props.setting.id.toString()" />
        </div>

        <!--text input-->
        <div v-else-if="props.setting.type === 'text' || props.setting.type === 'password'">
            <TextInput
                @value-changed="value => props.handleQueuedValueChange({value:value, id: props.setting.id, groupId: props.groupId}, index)"
                :id="props.setting.id.toString()" :label="props.setting.title" :value="(props.value as TextValue).value"
                :type="props.setting.type" />
        </div>

        <!--file upload-->
        <div v-else-if="props.setting.type === 'file'">
            <DropFileUpload
                @file-selected="(value: File) => props.handleQueuedValueChange({value: value, id: props.setting.id, groupId: props.groupId }, index)"
                :id="props.setting.title" :label="props.setting.title" :description="props.setting.description"
                :type="props.setting.type" :value="(props.value as FileValue).value" />
        </div>
    </div>
</template>