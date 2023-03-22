<script setup lang="ts">
import { computed } from "vue";

import type { ICall } from "@src/types";

import {
  CalendarIcon,
  PhoneArrowDownLeftIcon,
  PhoneArrowUpRightIcon,
  PhoneXMarkIcon,
  UserGroupIcon,
} from "@heroicons/vue/24/outline";
import InfoItem from "@src/components/shared/blocks/InfoItem.vue";
import Typography from "@src/components/ui/data-display/Typography.vue";
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
      <Typography
        id="modal-title"
        variant="heading-1"
        class="-none"
        tabindex="0"
      >
        Call Details
      </Typography>

      <Button
        @click="props.closeModal"
        variant="outlined"
        color="danger"
        typography="body-4"
      >
        esc
      </Button>
    </div>

    <div v-if="props.call" class="w-full py-7">
      <div class="px-5 pb-5 flex items-center">
        <InfoItem :icon="CalendarIcon" :title="props.call.date" />
      </div>

      <div class="px-5 pb-5 flex items-center">
        <InfoItem :icon="CallStatusIcon" :title="props.call.status" />
      </div>

      <div class="px-5 flex items-center">
        <InfoItem
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
