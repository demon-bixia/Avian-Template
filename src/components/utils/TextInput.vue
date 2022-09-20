<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

defineEmits(['valueChanged']);

const props = defineProps<{
    settingId?: number,
    groupId?: number,
    id?: string,
    type: string,
    label?: string,
    value?: string
    placeholder?: string,
    description?: string
}>();
</script>

<template>
    <div>
        <label v-if="props.label" :for="props.id" class="mb-3">
            <span class="w-13 opacity-60 text-sm font-semibold leading-4 tracking-[0.16px]">
                {{props.label}}
            </span>
        </label>
    </div>
    <input
        @input="$emit('valueChanged', {value: ($event.target as HTMLInputElement).value, id: props.settingId, groupId: props.groupId})"
        :type="props.type" :id="props.id" :value="props.value"
        class="max-w-full w-full h-8 p-4 border border-gray-100 rounded-sm 
                    content-center text-black opacity-60 bg-gray-100 focus:outline-none focus:bg-white 
                    focus:ring focus:ring-indigo-100 duration-200 transition ease-out placeholder:text-black placeholder:opacity-60" :placeholder="props.placeholder"
        :class="{'mt-4':label}">
</template>