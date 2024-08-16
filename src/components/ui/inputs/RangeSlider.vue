<script setup lang="ts">
import type { Ref } from "vue";
import { ref } from "vue";

const emit = defineEmits(["valueChanged"]);

const props = defineProps<{
  self?: boolean;
  initialValue?: number;
  percentage?: number;
}>();

const input: Ref<any> = ref(null);

// (event) handle changing the value of the slider
const handleValueChange = (event: any) => {
  emit("valueChanged", event.target.value);
};
</script>

<template>
  <input
    min="0"
    max="100"
    ref="input"
    type="range"
    class="slider accent-indigo-500"
    :value="props.percentage"
    @input="handleValueChange"
  />
</template>
