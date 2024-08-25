<script setup lang="ts">
import { ArrowUturnLeftIcon } from "@heroicons/vue/24/solid";

import type { ICall } from "@src/types";

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
      <p id="modal-title" class="heading-1 text-color" tabindex="0">
        Call Members
      </p>

      <!--return button-->
      <IconButton
        @click="
          $emit('active-page-change', {
            tabName: 'call-info',
            animationName: 'slide-right',
          })
        "
        class="p-2 ic-btn-outlined-danger"
      >
        <ArrowUturnLeftIcon class="w-5 h-5" />
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
