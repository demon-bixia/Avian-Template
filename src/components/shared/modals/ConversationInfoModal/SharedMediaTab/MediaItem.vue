<script setup lang="ts">
import type { IAttachment } from "@src/types";

import {
  DocumentIcon,
  PhotoIcon,
  VideoCameraIcon,
} from "@heroicons/vue/24/outline";

const props = defineProps<{
  attachment: IAttachment;
  date: string;
}>();
</script>

<template>
  <button
    class="w-full p-5 flex hover:bg-indigo-50 active:bg-indigo-100 dark:hover:bg-gray-600 dark:focus:bg-gray-600 outline-none transition-all duration-300"
  >
    <!--icon-->
    <div
      class="w-8 h-8 mr-4 flex justify-center items-center rounded-full bg-gray-50 dark:bg-gray-500"
    >
      <PhotoIcon
        class="h-5 w-5 text-gray-500 dark:text-white dark:text-opacity-70"
        v-if="props.attachment.type === 'image'"
      />
      <DocumentIcon
        class="h-5 w-5 text-gray-500 dark:text-white dark:text-opacity-70"
        v-else-if="props.attachment.type === 'file'"
      />
      <VideoCameraIcon
        class="h-5 w-5 text-gray-500 dark:text-white dark:text-opacity-70"
        v-else-if="props.attachment.type === 'video'"
      />
    </div>

    <!--name, date and size-->
    <div class="grow">
      <div class="flex items-center justify-between mb-3">
        <p class="heading-2 text-color">
          {{ props.attachment.name }}
        </p>

        <p class="body-4 text-color">
          {{ props.date }}
        </p>
      </div>

      <div class="flex justify-start">
        <p
          class="body-2 text-color font-normal text-sm text-black opacity-60 leading-4 tracking-[.01rem]"
        >
          {{ props.attachment.size }}
        </p>
      </div>
    </div>
  </button>
</template>
