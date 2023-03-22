<script setup lang="ts">
import { PhoneIcon, XMarkIcon } from "@heroicons/vue/24/solid";
import { ICall, IContact } from "@src/types";
import { getCallName } from "@src/utils";

import CallAvatar from "@src/components/shared/blocks/CallAvatar.vue";
import Typography from "@src/components/ui/data-display/Typography.vue";

const props = defineProps<{
  members: IContact[];
  activeCall: ICall;
  closeModal: () => void;
  handleCallStatusChange: (status: string) => void;
}>();
</script>

<template>
  <div class="w-full h-full py-6 flex flex-col items-center">
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

    <!--answer buttons-->
    <div class="flex">
      <button
        @click="handleCallStatusChange('ongoing')"
        class="relative p-[17px] mr-8 flex justify-center items-center rounded-full outline-none bg-green-400 hover:bg-green-500 active:bg-green-600 transition-all duratoin-500 ease"
      >
        <PhoneIcon class="w-[16px] h-[16px] text-white" />
        <span
          class="animate-ping absolute inline-flex w-[35px] h-[35px] rounded-full bg-green-400 opacity-75"
        ></span>
      </button>

      <button
        @click="
          () => {
            props.closeModal();
          }
        "
        class="relative p-[17px] flex justify-center items-center rounded-full outline-none bg-red-400 hover:bg-red-500 active:bg-red-600 transition-all duratoin-500 ease"
      >
        <XMarkIcon class="w-[16px] h-[16px] text-white" />
        <span
          class="animate-ping absolute inline-flex w-[35px] h-[35px] rounded-full bg-red-400 opacity-75"
        ></span>
      </button>
    </div>
  </div>
</template>
