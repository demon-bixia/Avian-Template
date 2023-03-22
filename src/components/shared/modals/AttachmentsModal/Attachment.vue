<script setup lang="ts">
import type { IAttachment } from "@src/types";

import {
  ArrowPathRoundedSquareIcon,
  DocumentIcon,
  PhotoIcon,
  TrashIcon,
  VideoCameraIcon,
} from "@heroicons/vue/24/outline";
import Typography from "@src/components/ui/data-display/Typography.vue";
import IconButton from "@src/components/ui/inputs/IconButton.vue";

const props = defineProps<{
  attachment: IAttachment;
}>();
</script>

<template>
  <div href="#" class="flex px-5 py-4 transition-all duration-300">
    <!--icon-->
    <div
      class="w-8 h-8 mr-4 rounded-full flex justify-center items-center bg-gray-100 dark:bg-gray-600"
    >
      <PhotoIcon
        class="stroke-1 h-5 w-5 text-black opacity-60 dark:text-white dark:opacity-70"
        v-if="attachment.type === 'image'"
      />
      <VideoCameraIcon
        class="stroke-1 h-5 w-5 text-black opacity-60 dark:text-white dark:opacity-70"
        v-else-if="attachment.type === 'video'"
      />
      <DocumentIcon
        class="stroke-1 h-5 w-5 text-black opacity-60 dark:text-white dark:opacity-70"
        v-else-if="attachment.type === 'file'"
      />
    </div>

    <!--name, date and size-->
    <div class="grow">
      <div class="flex items-center justify-between mb-3">
        <Typography variant="heading-2" tabindex="0">
          {{ attachment.name }}
        </Typography>
      </div>

      <div class="flex justify-start">
        <Typography variant="body-2" tabindex="0">
          {{ attachment.size }}
        </Typography>
      </div>
    </div>

    <!--action buttons-->
    <div class="flex">
      <IconButton class="w-7 h-7 mr-2" title="replace">
        <ArrowPathRoundedSquareIcon
          class="w-[15px] h-[15px] text-gray-400 group-hover:text-indigo-300"
        />
      </IconButton>
      <IconButton class="w-7 h-7" title="delete">
        <TrashIcon
          class="w-[15px] h-[15px] text-gray-400 group-hover:text-red-300"
        />
      </IconButton>
    </div>
  </div>
</template>
