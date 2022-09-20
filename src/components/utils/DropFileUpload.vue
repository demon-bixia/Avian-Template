<script setup lang="ts">
import { defineProps, ref, defineEmits } from "vue";

const emit = defineEmits(['fileSelected']);

const active = ref(false);

const props = defineProps<{
    settingId: number,
    groupId: number,
    id: string,
    type: string,
    label?: string,
    value?: File,
    description?: string
}>();

const handleDragEnter = () => {
    active.value = true;
};

const handleDragLeave = () => {
    active.value = false;
};

const handleFileDrop = (event: any) => {
    active.value = false;
    emit('fileSelected', { value: (event.dataTransfer as DataTransfer).files[0], id: props.settingId, groupId: props.groupId });
};

const handleFileChange = (event: Event) => {
    emit('fileSelected', { value: ((event.target as HTMLInputElement).files as FileList)[0], id: props.settingId, groupId: props.groupId });
};
</script>
    
<template>
    <div class="flex flex-col">
        <div>
            <label v-if="props.label" :for="props.id" class="mb-3">
                <span class="w-13 opacity-60 text-sm font-semibold leading-4 tracking-[0.16px]">
                    {{props.label}}
                </span>
            </label>
        </div>

        <label @dragover.prevent="handleDragEnter" @dragenter.prevent="handleDragEnter"
            @dragleave.prevent="handleDragLeave" @dragend.prevent="handleDragLeave" @drop.prevent="handleFileDrop"
            :for="props.id" tabindex="0" class="cursor-pointer w-full h-24 border border-dashed rounded-sm p-5
             border-gray-200  hover:bg-white flex justify-center items-center  
             duration-500 transition-all active:bg-white focus:bg-white outline-none 
             focus:outline-none" :class="{'bg-white': active, 'bg-gray-50': !active}">

            <input type="file" hidden name="files[]" :id="props.id" @change="handleFileChange" />

            <div :class="{'hidden': active}">
                <div v-if="value">
                    <span class="opacity-60 text-sm leading-5 tracking-[0.16px]">{{value.name}}</span>
                </div>

                <div v-else class="flex flex-col">
                    <span class="opacity-60 text-sm leading-5 tracking-[0.16px]">Choose a file</span>
                    <span class="opacity-60 text-sm leading-5 tracking-[0.16px]">or drag it here.</span>
                </div>
            </div>
        </label>
    </div>
</template>