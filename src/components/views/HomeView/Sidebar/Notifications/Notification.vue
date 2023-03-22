<script setup lang="ts">
import type { INotification } from "@src/types";

import Typography from "@src/components/ui/data-display/Typography.vue";
import {
  ArrowPathIcon,
  LockClosedIcon,
  PlusCircleIcon,
} from "@heroicons/vue/24/outline";

const props = defineProps<{
  notification: INotification;
}>();
</script>

<template>
  <div
    class="w-full px-5 py-5 mb-3 flex rounded outline-none"
    tabindex="0"
    :aria-label="props.notification.message"
  >
    <!--notifications icon-->
    <div class="mr-4">
      <div
        class="w-7 h-7 flex justify-center items-center rounded-full transition duration-500"
        :class="{
          'bg-blue-100 dark:bg-blue-600':
            notification.flag === 'account-update',
          'bg-yellow-100 dark:bg-yellow-600': notification.flag === 'security',
          'bg-green-100 dark:bg-green-600':
            notification.flag === 'added-to-group',
        }"
      >
        <ArrowPathIcon
          v-if="notification.flag === 'account-update'"
          class="w-5 h-5 stroke-1 text-blue-500 dark:text-white transition duration-500"
        />
        <LockClosedIcon
          v-else-if="notification.flag === 'security'"
          class="w-5 h-5 stroke-1 text-yellow-500 dark:text-white transition duration-500"
        />
        <PlusCircleIcon
          v-else-if="notification.flag === 'added-to-group'"
          class="w-5 h-5 stroke-1 text-green-500 dark:text-white transition duration-500"
        />
      </div>
    </div>

    <!--notification content-->
    <div class="grow">
      <Typography variant="heading-2" class="mb-4">
        {{ props.notification.title }}
      </Typography>

      <Typography variant="body-2">
        {{ props.notification.message }}
      </Typography>
    </div>
  </div>
</template>
