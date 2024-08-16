<script setup lang="ts">
import { ArrowUturnLeftIcon } from "@heroicons/vue/24/solid";

import type { ICall } from "@src/types";

import Typography from "@src/components/ui/data-display/Typography.vue";
import SearchInput from "@src/components/ui/inputs/SearchInput.vue";
import ContactItem from "@src/components/shared/blocks/ContactItem.vue";
import ScrollBox from "@src/components/ui/utils/ScrollBox.vue";
import IconButton from "@src/components/ui/inputs/IconButton.vue";

const props = defineProps<{
  call: ICall;
}>();
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
        Call Members
      </Typography>

      <!--return button-->
      <IconButton
        @click="
          $emit('active-page-change', {
            tabName: 'call-info',
            animationName: 'slide-right',
          })
        "
        color="danger"
        class="group p-2 border rounded-full border-gray-200 dark:border-white dark:border-opacity-70 focus:border-red-100 dark:focus:border-red-400 hover:border-red-100 dark:hover:border-red-500"
      >
        <ArrowUturnLeftIcon
          class="w-5 h-5 text-black opacity-50 dark:text-white dark:opacity-70 group-focus:text-red-500 dark:group-focus:text-white group-hover:text-red-500 group-hover:opacity-100 dark:group-hover:text-white"
        />
      </IconButton>
    </div>

    <!--search-->
    <div class="mb-5 mx-5 mt-6">
      <SearchInput />
    </div>

    <!--contacts-->
    <ScrollBox
      ref="contactContainer"
      class="max-h-[8.75rem] mb-5 overflow-y-scroll"
    >
      <ContactItem
        v-for="(member, index) in props.call.members"
        variant="card"
        :unselectable="true"
        :contact="member"
        :key="index"
      />
    </ScrollBox>
  </div>
</template>
