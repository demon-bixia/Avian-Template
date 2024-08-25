<script setup lang="ts">
import type { IContact } from "@src/types";

const props = defineProps<{
  member: IContact;
  index: number;
  membersLength: number;
  large?: Boolean;
}>();
</script>

<template>
  <div
    v-if="index === 0"
    :style="{ backgroundImage: `url(${member.avatar})` }"
    class="rounded-full bg-cover bg-center"
    :class="props.large ? ['w-[6.25rem]', 'h-[6.25rem]'] : ['w-7', 'h-7']"
  ></div>

  <div
    v-else-if="props.membersLength === 2 && index === 1"
    :style="{ backgroundImage: `url(${member.avatar})` }"
    class="absolute top-0 left-[1.25rem] rounded-full bg-cover bg-center"
    :class="props.large ? ['w-[6.25rem]', 'h-[6.25rem]'] : ['w-7', 'h-7']"
  ></div>

  <div
    v-else-if="props.membersLength > 2 && index === 1"
    class="absolute top-0 left-[1.25rem] flex justify-center items-center rounded-full bg-gray-50 dark:bg-gray-700"
    :class="props.large ? ['w-[6.25rem]', 'h-[6.25rem]'] : ['w-7', 'h-7']"
  >
    <p class="body-4 text-color">{{ props.membersLength - 1 }}+</p>
  </div>
</template>
