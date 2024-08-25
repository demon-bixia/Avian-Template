<script setup lang="ts">
import TextInput from "@src/components/ui/inputs/TextInput.vue";

defineEmits(["valueChanged"]);

const props = defineProps<{
  id?: string;
  type?: string;
  label?: string;
  value?: string;
  name?: string;
  class?: string;
  placeholder?: string;
  bordered?: boolean;
}>();
</script>

<template>
  <div class="flex flex-col">
    <label v-if="props.label" :id="props.id" class="body-2 text-color mb-3">
      {{ props.label }}
    </label>

    <div class="relative">
      <div class="absolute left-0 top-0">
        <slot name="startAdornment"></slot>
      </div>

      <TextInput
        :type="props.type || 'text'"
        name="props.name"
        :id="props.id"
        :value="value"
        class="text-input"
        :class="[
          props.bordered ? 'bordered-input' : 'ringed-input',
          props.class,
        ]"
        :placeholder="props.placeholder"
        @value-changed="(value) => $emit('valueChanged', value)"
      />

      <div class="absolute top-0 right-0">
        <slot name="endAdornment"></slot>
      </div>
    </div>
  </div>
</template>
