<script setup lang="ts">
import { LinkIcon } from "@heroicons/vue/24/outline";

import { IPreviewData } from "@src/types";

const props = defineProps<{
  self?: boolean;
  previewData: IPreviewData;
}>();
</script>

<template>
  <div
    class="border-l pl-3 cursor-pointer border-opacity-50 duration-200"
    :class="
      props.self
        ? ['border-white']
        : ['border-black', 'dark:border-white', 'dark:border-opacity-70']
    "
  >
    <!--title-->
    <p
      class="mb-3 font-semibold text-xs leading-4 tracking-[0.16px]"
      :class="
        props.self
          ? ['text-white']
          : ['text-black', 'opacity-50', 'dark:text-white', 'dark:opacity-70']
      "
    >
      {{ props.previewData.title }}
    </p>

    <!--description-->
    <p
      class="font-normal text-xs leading-4 tracking-[0.16px]"
      :class="
        props.self
          ? ['text-white']
          : ['text-black', 'opacity-50', 'dark:text-white', 'dark:opacity-70']
      "
    >
      {{ props.previewData.description }}
    </p>

    <!--image-->
    <img
      :src="props.previewData.image"
      class="my-5 rounded-sm"
      :alt="props.previewData.link"
    />

    <!--link domain-->
    <a
      :href="props.previewData.link"
      class="font-normal text-xs leading-4 tracking-[0.16px] flex items-center"
      :class="
        props.self
          ? ['text-white']
          : ['text-black', 'opacity-50', 'dark:text-white', 'dark:opacity-70']
      "
    >
      <LinkIcon class="w-4 h-4 mr-2 stroke-1" /> {{ props.previewData.domain }}
    </a>
  </div>
</template>
