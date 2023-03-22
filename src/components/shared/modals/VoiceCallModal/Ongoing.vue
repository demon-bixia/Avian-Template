<script setup lang="ts">
import type { ICall, IContact } from "@src/types";

import { getCallName } from "@src/utils";

import {
  ChatBubbleBottomCenterTextIcon,
  PhoneIcon,
  SpeakerXMarkIcon,
  UserPlusIcon,
} from "@heroicons/vue/24/solid";
import CallAvatar from "@src/components/shared/blocks/CallAvatar.vue";
import Typography from "@src/components/ui/data-display/Typography.vue";

const props = defineProps<{
  members: IContact[];
  activeCall: ICall;
  closeModal: () => void;
}>();
</script>

<template>
  <div class="w-full h-full pt-6 flex flex-col items-center">
    <!--call info-->
    <div class="mb-7">
      <div class="relative mb-5">
        <CallAvatar
          v-for="(member, index) in members"
          :member="member"
          :index="index"
          :members-length="members.length"
          :large="true"
        />
      </div>

      <Typography variant="heading-2" class="mb-4 outline-none" tabindex="0">
        {{ getCallName(activeCall) }}
      </Typography>

      <Typography
        variant="body-3"
        no-color
        class="outline-none text-green-300"
        tabindex="0"
      >
        {{ activeCall.direction }}
      </Typography>
    </div>

    <!--call actions-->
    <div class="mb-9 flex">
      <!--add member to call-->
      <div class="mr-5 first-letter:flex flex-col justify-center items-center">
        <button
          class="p-3 mb-3 flex justify-center items-center rounded-full outline-none bg-gray-100 hover:bg-gray-200 focus:bg-gray-200 active:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:active:bg-gray-500 transition duration-200"
        >
          <UserPlusIcon
            class="w-[17px] h-[17px] text-black text-opacity-60 dark:text-white dark:text-opacity-70"
          />
        </button>

        <Typography variant="body-4">add</Typography>
      </div>

      <!--mute sound-->
      <div class="mr-5 flex flex-col justify-center items-center">
        <button
          class="p-3 mb-3 flex justify-center items-center rounded-full outline-none bg-gray-100 hover:bg-gray-200 focus:bg-gray-200 active:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:active:bg-gray-500 transition duration-200"
        >
          <SpeakerXMarkIcon
            class="w-[17px] h-[17px] text-black text-opacity-60 dark:text-white dark:text-opacity-70"
          />
        </button>

        <Typography variant="body-4">mute</Typography>
      </div>

      <!--open chat-->
      <div class="flex flex-col justify-center items-center">
        <button
          class="p-3 mb-3 flex justify-center items-center rounded-full outline-none bg-gray-100 hover:bg-gray-200 focus:bg-gray-200 active:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:active:bg-gray-500 transition duration-200"
        >
          <ChatBubbleBottomCenterTextIcon
            class="w-[17px] h-[17px] text-black text-opacity-60 dark:text-white dark:text-opacity-70"
          />
        </button>

        <Typography variant="body-4">chat</Typography>
      </div>
    </div>

    <!--call actions-->
    <div
      class="relative w-full h-[50px] rounded-b flex justify-center bg-gray-50 dark:bg-gray-700"
    >
      <div class="absolute bottom-[19px]">
        <div class="p-3 rounded-full bg-white dark:bg-gray-800">
          <button
            @click="
              () => {
                props.closeModal();
              }
            "
            class="p-[17px] flex justify-center items-center rounded-full outline-none bg-red-400 hover:bg-red-500 active:bg-red-600 transition-all duratoin-500 ease"
          >
            <PhoneIcon class="w-[16px] h-[16px] text-white" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
