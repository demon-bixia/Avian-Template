<script setup lang="ts">
import { defineEmits, defineProps, ref } from "vue";

import Typography from "./Typography.vue";

const emit = defineEmits(['fileSelected']);

const active = ref(false);

const props = defineProps<{
    id?: string,
    label?: string,
    value?: File,
    description?: string
}>();

// (event) handle change when droping files
const handleFileDrop = (event: any) => {
    active.value = false;
    emit('fileSelected', (event.dataTransfer as DataTransfer).files[0]);
};

// (event) handle change when inputing files
const handleFileChange = (event: Event) => {
    emit('fileSelected', ((event.target as HTMLInputElement).files as FileList)[0]);
};
</script>
    
<template>
    <div class="flex flex-col">
        <!--displayed label-->
        <div class="flex justify-start">
            <label v-if="props.label" :for="props.id" class="mb-3">
                <span class="w-13 opacity-60 text-sm font-semibold leading-4 tracking-[0.16px]">
                    {{props.label}}
                </span>
            </label>
        </div>

        <label @dragover.prevent="active = true" @dragenter.prevent="active = false" @dragleave.prevent="active = false"
            @dragend.prevent="active = false" @drop.prevent="handleFileDrop" :for="props.id" tabindex="0" class="cursor-pointer w-full h-24 border border-dashed rounded-sm p-5
             border-gray-200  hover:bg-white flex justify-center items-center  
             duration-500 transition-all active:bg-white focus:bg-white outline-none 
             focus:outline-none" :class="{'bg-white': active, 'bg-gray-50': !active}">

            <!--file input-->
            <input type="file" hidden name="files[]" :id="props.id" @change="handleFileChange" />

            <!--custom placeholder and input-->
            <div :class="{'hidden': active}">
                <Typography v-if="value" variant="body-2">{{value.name}}</Typography>
                <Typography v-else variant="body-2">Choose a file <br /> or drop it here.</Typography>
            </div>
        </label>
    </div>
</template>