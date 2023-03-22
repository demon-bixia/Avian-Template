<script setup lang="ts">
import type { ICall } from "@src/types";
import Call from "@src/components/views/HomeView/Sidebar/Calls/Call.vue";

const props = defineProps<{
  calls: ICall[];
  chatStatus: string;
  delayLoading: string;
  openInfoModal: (call: ICall) => void;
}>();
</script>

<template>
  <div>
    <Call
      v-for="call in props.calls"
      :call="call"
      :open-info-modal="props.openInfoModal"
    />
  </div>
</template>
