<script setup lang="ts">
import type { IAttachment } from "@src/types";

import {
  DocumentIcon,
  PhotoIcon,
  VideoCameraIcon,
} from "@heroicons/vue/24/outline";
import Typography from "@src/components/ui/data-display/Typography.vue";

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
        <Typography variant="heading-2">
          {{ props.attachment.name }}
        </Typography>

        <Typography variant="body-4">
          {{ props.date }}
        </Typography>
      </div>

      <div class="flex justify-start">
        <Typography
          variant="body-2"
          class="font-normal text-sm text-black opacity-60 leading-4 tracking-[0.16px]"
        >
          {{ props.attachment.size }}
        </Typography>
      </div>
    </div>
  </button>
</template>
