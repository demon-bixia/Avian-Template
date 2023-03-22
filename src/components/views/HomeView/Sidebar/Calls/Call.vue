<script setup lang="ts">
import { computed } from "vue";

import { ICall } from "@src/types";
import { getCallName, getOtherMembers } from "@src/utils";

import {
  PhoneIcon,
  PhoneArrowDownLeftIcon,
  PhoneArrowUpRightIcon,
  PhoneXMarkIcon,
} from "@heroicons/vue/24/solid";
import Typography from "@src/components/ui/data-display/Typography.vue";
import CallAvatar from "@src/components/shared/blocks/CallAvatar.vue";

const props = defineProps<{
  call: ICall;
  active?: boolean;
  openInfoModal?: (call: ICall) => void;
  openVoiceCallModal?: () => void;
  endCall?: () => void;
}>();

const members = computed(() => {
  return getOtherMembers(props.call);
});

const handleOpenInfoModal = () => {
  if (props.openInfoModal && !props.active) {
    props.openInfoModal(props.call);
  }
};
</script>

<template>
  <div>
    <component
      :is="props.active ? 'div' : 'button'"
      :aria-label="'voice call with ' + getCallName(props.call, true)"
      @click="handleOpenInfoModal"
      class="w-full h-[92px] px-5 py-6 mb-3 flex rounded focus:outline-none transition duration-500 ease-out"
      :class="
        props.active
          ? ['border border-dashed border-green-100 dark:border-green-800']
          : [
              'focus:bg-indigo-50 dark:active:bg-gray-600 dark:focus:bg-gray-600 dark:hover:bg-gray-600 hover:bg-indigo-50 active:bg-indigo-100',
            ]
      "
      tabindex="0"
    >
      <!--profile images-->
      <div :class="members.length === 1 ? ['mr-4'] : ['mr-[32px]']">
        <div class="relative">
          <button
            v-if="props.active"
            class="relative block"
            @click="props.openVoiceCallModal"
          >
            <CallAvatar
              v-for="(member, index) in members"
              :member="member"
              :index="index"
              :members-length="members.length"
            />
          </button>

          <CallAvatar
            v-else
            v-for="(member, index) in members"
            :member="member"
            :index="index"
            :members-length="members.length"
          />
        </div>
      </div>

      <div class="w-full flex flex-col">
        <div class="w-full">
          <!--contacts names-->
          <div class="flex items-start">
            <div class="grow mb-4 text-start">
              <button
                v-if="props.active"
                class="block"
                @click="props.openVoiceCallModal"
              >
                <Typography variant="heading-2">
                  {{ getCallName(props.call) }}
                </Typography>
              </button>

              <Typography v-else variant="heading-2">
                {{ getCallName(props.call) }}
              </Typography>
            </div>

            <!--end Call-->
            <button
              v-if="props.active"
              @click="props.endCall"
              class="p-[5px] flex justify-center items-center rounded-full outline-none bg-red-400 hover:bg-red-500 active:bg-red-600 transition-all duratoin-500 ease"
            >
              <PhoneIcon class="w-[14px] h-[14px] text-white" />
            </button>

            <!--status icon-->
            <div v-else class="mr-2">
              <PhoneXMarkIcon
                v-if="props.call.status === 'missed'"
                class="w-[14px] h-[14px] text-red-300 dark:text-red-400"
              />
              <PhoneArrowUpRightIcon
                v-else-if="props.call.status === 'sent'"
                class="w-[14px] h-[14px] text-green-300 dark:text-green-400"
              />
              <PhoneArrowDownLeftIcon
                v-else-if="props.call.status === 'received'"
                class="w-[14px] h-[14px] text-green-300 dark:text-green-400"
              />
            </div>
          </div>
        </div>

        <div>
          <!--recording length-->
          <Typography
            v-if="props.active"
            variant="body-2"
            no-color
            class="flex justify-start items-center text-indigo-300"
          >
            {{ props.call.length }}
          </Typography>

          <!--recording date-->
          <Typography
            v-else
            variant="body-2"
            class="flex justify-start items-center"
          >
            {{ props.call.date }}
          </Typography>
        </div>
      </div>
    </component>
  </div>
</template>
