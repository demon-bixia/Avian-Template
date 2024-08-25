<script setup lang="ts">
import type { ICall } from "@src/types";

import { computed } from "vue";

import {
  CalendarIcon,
  PhoneArrowDownLeftIcon,
  PhoneArrowUpRightIcon,
  PhoneXMarkIcon,
  UserGroupIcon,
} from "@heroicons/vue/24/outline";
import IconAndText from "@src/components/shared/blocks/IconAndText.vue";
import Button from "@src/components/ui/inputs/Button.vue";

const props = defineProps<{
  call: ICall;
  closeModal: () => void;
}>();

const CallStatusIcon = computed(() => {
  if (props.call) {
    if (props.call.status === "received") {
      return PhoneArrowDownLeftIcon;
    } else if (props.call.status === "missed") {
      return PhoneXMarkIcon;
    } else if (props.call.status === "sent") {
      return PhoneArrowUpRightIcon;
    }
  }
});
</script>

<template>
  <div>
    <!--modal header-->
    <div class="px-5 flex justify-between items-center">
      <p id="modal-title" class="heading-1 text-color" tabindex="0">
        Call Details
      </p>

      <Button
        @click="props.closeModal"
        class="outlined-danger ghost-text py-2 px-4"
      >
        esc
      </Button>
    </div>

    <div v-if="props.call" class="w-full py-7">
      <div class="px-5 pb-5 flex items-center">
        <IconAndText :icon="CalendarIcon" :title="props.call.date" />
      </div>

      <div class="px-5 pb-5 flex items-center">
        <IconAndText :icon="CallStatusIcon" :title="props.call.status" />
      </div>

      <div class="px-5 flex items-center">
        <IconAndText
          :icon="UserGroupIcon"
          title="members"
          link
          chevron
          @click="
            $emit('active-page-change', {
              tabName: 'call-members',
              animationName: 'slide-left',
            })
          "
        />
      </div>
    </div>
  </div>
</template>
