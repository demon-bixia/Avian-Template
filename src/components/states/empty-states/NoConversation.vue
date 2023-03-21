<script setup lang="ts">
import { InboxIcon } from "@heroicons/vue/24/outline";
import Typography from "@src/components/ui/data-display/Typography.vue";

const props = defineProps<{
  vertical?: boolean;
}>();
</script>

<template>
  <div
    class="w-full p-5 flex"
    :class="
      props.vertical
        ? ['flex-col', 'justify-center', 'items-center']
        : ['flex-row']
    "
  >
    <!--icon-->
    <div :class="props.vertical ? ['mb-3'] : []">
      <div
        class="w-7 h-7 mr-4 flex justify-center items-center rounded-full bg-gray-50 dark:bg-gray-700 transition duration-500"
      >
        <InboxIcon
          class="w-5 h-5 text-gray-500 dark:text-white dark:opacity-70"
        />
      </div>
    </div>

    <!--content-->
    <div :class="props.vertical ? [] : ['flex', 'flex-col', 'items-start']">
      <Typography variant="heading-2" class="mb-3">No conversations</Typography>

      <Typography variant="body-2" class="flex">
        click pencil icon to create one.
      </Typography>
    </div>
  </div>
</template>
