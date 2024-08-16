<script setup lang="ts">
import type { ICall, IContact } from "@src/types";

import { getCallName } from "@src/utils";

import { PhoneIcon, XMarkIcon } from "@heroicons/vue/24/solid";
import CallAvatar from "@src/components/shared/blocks/CallAvatar.vue";
import Typography from "@src/components/ui/data-display/Typography.vue";
import IconButton from "@src/components/ui/inputs/IconButton.vue";

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

    <!--answer button-->
    <div class="flex">
      <IconButton
        variant="solid"
        color="success"
        @click="handleCallStatusChange('ongoing')"
        class="relative p-[1.0625rem] mr-8"
      >
        <PhoneIcon class="w-[1rem] h-[1rem] text-white" />
        <span
          class="animate-ping absolute inline-flex w-[2.1875rem] h-[2.1875rem] rounded-full bg-green-400 opacity-75"
        ></span>
      </IconButton>

      <!--reject button-->
      <IconButton
        variant="solid"
        color="danger"
        @click="
          () => {
            props.closeModal();
          }
        "
        class="relative p-[1.0625rem]"
      >
        <XMarkIcon class="w-[1rem] h-[1rem] text-white" />
        <span
          class="animate-ping absolute inline-flex w-[2.1875rem] h-[2.1875rem] rounded-full bg-red-400 opacity-75"
        ></span>
      </IconButton>
    </div>
  </div>
</template>
