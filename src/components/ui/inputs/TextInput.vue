<script setup lang="ts">
const emit = defineEmits(["valueChanged"]);

const props = defineProps<{
  id?: string;
  type?: string;
  value?: string;
  name?: string;
  placeholder?: string;
  bordered?: boolean;
}>();

const handleInput = (event: any) => {
  emit("valueChanged", (event.target as HTMLInputElement).value);
};
</script>

<template>
  <input
    :type="props.type || 'text'"
    name="props.name"
    :id="props.id"
    class="text-input"
    :class="[props.bordered ? 'bordered-input' : 'ringed-input']"
    @input="handleInput"
    :value="props.value"
    :placeholder="props.placeholder"
  />
</template>
