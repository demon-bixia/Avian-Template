<script setup lang="ts">
import type { IMessage } from "@src/types";
import { getFullName } from "@src/utils";
import Typography from "@src/components/ui/data-display/Typography.vue";

const props = defineProps<{
  message: IMessage;
}>();
</script>

<template>
  <button
    class="w-full p-5 flex outline-none hover:bg-indigo-100 focus:bg-indigo-100 active:bg-indigo-200 dark:hover:bg-gray-600 dark:focus:bg-gray-600 duration-200"
  >
    <!--profile image-->
    <div class="mr-4">
      <div
        :style="{ backgroundImage: `url(${props.message.sender.avatar})` }"
        class="w-7 h-7 rounded-full bg-cover bg-center"
      ></div>
    </div>

    <!--name and message-->
    <div class="grow">
      <div class="flex flex-col items-start">
        <Typography variant="heading-2" class="mb-4">
          {{ getFullName(props.message.sender) }}
        </Typography>

        <Typography variant="body-2"> Wow really cool </Typography>
      </div>
    </div>

    <!--message date-->
    <div>
      <p class="opacity-60 font-light text-xs leading-4 tracking-[0.16px]">
        <Typography variant="body-4"> 1/5/2019 </Typography>
      </p>
    </div>
  </button>
</template>
