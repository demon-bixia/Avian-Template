<script setup lang="ts">
import GreenChecks from "@src/assets/vectors/green_checks.svg";
import GrayChecks from "@src/assets/vectors/gray_checks.svg";

const props = defineProps<{
  state: string;
}>();
</script>

<template>
  <img
    v-if="props.state === 'delivered'"
    :src="GrayChecks"
    class="w-[14px] h-[14px]"
  />
  <img
    v-else-if="props.state === 'read'"
    :src="GreenChecks"
    class="w-[14px] h-[14px]"
  />
</template>
