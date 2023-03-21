<script setup lang="ts">
import { ref } from "vue";

import Typography from "@src/components/ui/data-display/Typography.vue";

const emit = defineEmits(["valueChanged"]);

const active = ref(false);

const props = defineProps<{
  id?: string;
  label?: string;
  value?: File;
  description?: string;
  accept?: string;
}>();

// (event) handle change when droping files
const handleFileDrop = (event: any) => {
  active.value = false;
  emit("valueChanged", (event.dataTransfer as DataTransfer).files[0]);
};

// (event) handle change when input files.
const handleFileChange = (event: Event) => {
  emit(
    "valueChanged",
    ((event.target as HTMLInputElement).files as FileList)[0]
  );
};
</script>

<template>
  <div class="flex flex-col">
    <!--displayed label-->
    <div class="flex justify-start">
      <label v-if="props.label" :for="props.id" class="mb-3">
        <span
          class="w-13 text-black text-opacity-60 dark:text-white dark:text-opacity-70 text-sm font-semibold leading-4 tracking-[0.16px]"
        >
          {{ props.label }}
        </span>
      </label>
    </div>

    <label
      @dragover.prevent="active = true"
      @dragenter.prevent="active = false"
      @dragleave.prevent="active = false"
      @dragend.prevent="active = false"
      @drop.prevent="handleFileDrop"
      :for="props.id"
      tabindex="0"
      class="cursor-pointer w-full h-[100px] border border-dashed rounded-sm p-5 border-gray-200 dark:border-gray-500 flex justify-center items-center hover:bg-opacity-0 active:bg-opacity-0 focus:bg-opacity-0 outline-none focus:outline-none duration-500 transition-all"
      :class="{
        'bg-opacity-0': active,
        'bg-gray-50 dark:bg-opacity-70 dark:bg-gray-700 dark:hover:bg-opacity-0 dark:focus:bg-opacity-0':
          !active,
      }"
    >
      <!--file input-->
      <input
        type="file"
        hidden
        name="files[]"
        :id="props.id"
        @change="handleFileChange"
        :accept="props.accept"
      />

      <!--custom placeholder and input-->
      <div :class="{ hidden: active }">
        <Typography v-if="value" variant="body-2">{{ value.name }}</Typography>
        <Typography
          v-else
          variant="body-2"
          no-color
          class="text-black text-opacity-40 dark:text-white dark:text-opacity-70"
        >
          Choose a file <br />
          or drop it here.
        </Typography>
      </div>
    </label>
  </div>
</template>
