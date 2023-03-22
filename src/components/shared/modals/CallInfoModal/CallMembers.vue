<script setup lang="ts">
import { ArrowUturnLeftIcon } from "@heroicons/vue/24/solid";

import type { ICall } from "@src/types";

import Typography from "@src/components/ui/data-display/Typography.vue";
import SearchInput from "@src/components/ui/inputs/SearchInput.vue";
import ContactItem from "@src/components/shared/blocks/ContactItem.vue";
import ScrollBox from "@src/components/ui/utils/ScrollBox.vue";

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
      <button
        @click="
          $emit('active-page-change', {
            tabName: 'call-info',
            animationName: 'slide-right',
          })
        "
        class="group p-2 border rounded-full border-gray-200 dark:border-white dark:border-opacity-70 focus:outline-none focus:border-indigo-100 focus:bg-indigo-100 hover:bg-indigo-100 hover:border-indigo-100 dark:hover:border-indigo-400 dark:hover:bg-indigo-400 dark:focus:bg-reindigod-400 dark:focus:border-indigo-400 transition-all duration-200 outline-none"
      >
        <ArrowUturnLeftIcon
          class="w-5 h-5 text-black opacity-50 dark:text-white dark:opacity-70 group-hover:text-indigo-500 group-hover:opacity-100 dark:group-hover:text-white"
        />
      </button>
    </div>

    <!--search-->
    <div class="mb-5 mx-5 mt-6">
      <SearchInput />
    </div>

    <!--contacts-->
    <ScrollBox
      ref="contactContainer"
      class="max-h-[140px] mb-5 overflow-y-scroll"
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
