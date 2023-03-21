<script setup lang="ts">
import type { Ref } from "vue";
import { onMounted, ref, watch } from "vue";

const props = defineProps<{
  id: string;
  self?: boolean;
  initialValue?: number;
  percentage?: number;
}>();

const range: Ref<any> = ref(null);

const style = document.createElement("style");

const value = ref(props.initialValue || 0);

const changeBarStyle = () => {
  if (style && range.value.value) {
    const value =
      ((range.value.value - range.value.min) /
        (range.value.max - range.value.min)) *
      100;

    style.textContent = `
        #${props.id}::-webkit-slider-runnable-track {
          background: linear-gradient(
            to right,
            rgb(165 180 252) 0%,
            rgb(165 180 252) ${value}%,
            rgba(255, 255, 255, 0.4) ${value}%,
            rgba(255, 255, 255, 0.4) 100%
          );
        }
      `;
  }
};

onMounted(() => {
  document.head.appendChild(style);
  changeBarStyle();
});

watch(
  () => props.percentage,
  () => {
    if (props.percentage) {
      value.value = props.percentage;
      changeBarStyle();
    }
  }
);
</script>

<template>
  <input
    min="0"
    max="100"
    ref="range"
    type="range"
    class="slider"
    :id="props.id"
    :value="value"
    @input="$event => { 
      changeBarStyle();
      $emit('valueChange', ($event.target as HTMLInputElement).value);
    }"
  />
</template>
