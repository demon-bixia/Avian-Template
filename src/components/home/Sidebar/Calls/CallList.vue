<script setup lang="ts">
import { Call as CallType } from "../../../../stores/chat";

import Call from "./Call.vue";

const props = defineProps<{
  calls: CallType[];
  chatStatus: string;
  delayLoading: string;
  openInfoModal: (call: CallType) => void;
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
