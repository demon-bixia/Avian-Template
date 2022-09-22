<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

defineEmits(['switchClicked']);

const props = defineProps<{
    settingId?: number,
    groupId?: number,
    id?: string
    label?: string
    value: boolean
    description?: string,
    small?: boolean,
}>();

</script>
    
<template>
    <div :class="props.small ? []: ['w-full', 'flex']">
        <div class="flex flex-col w-full grow" v-if="props.label">
            <div>
                <label v-if="props.label" :for="id" class=" inline-block mb-4">
                    <span class="w-13 opacity-60 text-sm font-semibold leading-4 tracking-[0.16px]">
                        {{props.label}}
                    </span>
                </label>
            </div>

            <span class="help-block opacity-60 text-sm leading-5 tracking-[0.16px]">
                {{props.description}}
            </span>
        </div>

        <div class="relative align-middle flex select-none transition-all duration-200 ease-in">
            <input @click="$emit('switchClicked', {value: !props.value, id: props.settingId, groupId:props.groupId})"
                :checked="props.value" :id="id" type="checkbox" :name="label" class="absolute block w-5 h-5 rounded-full bg-white scale-[0.6]
                   appearance-none cursor-pointer foucs:outline-none transition-all duration-300"
                :class="{'right-0': value}" />

            <label :for="id" class="block w-7 h-5 rounded-full  cursor-pointer"
                :class="{'bg-indigo-400': value, 'bg-gray-300': !value}">
            </label>
        </div>
    </div>
</template>