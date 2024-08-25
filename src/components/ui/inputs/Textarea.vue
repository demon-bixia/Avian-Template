<script setup lang="ts">
import type { Ref } from "vue";
import { ref } from "vue";

const emit = defineEmits(["update:modelValue"]);

const props = defineProps<{
  id?: string;
  type?: string;
  value?: string;
  name?: string;
  placeholder?: string;
  bordered?: boolean;
  autoResize?: boolean;
}>();

const textarea: Ref<HTMLTextAreaElement | null> = ref(null);

// change the size of the textarea
const autoResize = () => {
  if (props.autoResize && textarea.value) {
    textarea.value.style.height = "auto";
    textarea.value.style.height = textarea.value.scrollHeight + "px";
  }
};

// (event) change the input value and the size of the textarea
const handleInput = (event: any) => {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
  autoResize();
};
</script>

<template>
  <textarea
    name="props.name"
    :id="props.id"
    class="text-input"
    :class="[props.bordered ? 'bordered-input' : 'ringed-input']"
    @input="handleInput"
    :value="props.value"
    :placeholder="props.placeholder"
    ref="textarea"
  >
  {{ props.value }}
  </textarea>
</template>
