<script setup lang="ts">
import { ref } from "vue";

import TextInput from "@src/components/ui/inputs/TextInput.vue";
import { EyeSlashIcon, EyeIcon } from "@heroicons/vue/24/outline";
import IconButton from "@src/components/ui/inputs/IconButton.vue";

const props = defineProps<{
  id?: string;
  type?: string;
  label?: string;
  value?: string;
  placeholder?: string;
  description?: string;
  variant?: string;
  class?: string;
}>();

const showPassword = ref(false);
</script>

<template>
  <TextInput
    :id="props.id"
    :type="showPassword ? 'text' : 'password'"
    :label="props.label"
    :value="props.value"
    :placeholder="props.placeholder"
    :description="props.description"
    :variant="props.variant"
    :class="props.class"
  >
    <template v-slot:endAdornment>
      <IconButton
        title="toggle password visibility"
        aria-label="toggle password visibility"
        class="m-[.5rem] p-2"
        @click="showPassword = !showPassword"
      >
        <EyeSlashIcon
          v-if="showPassword"
          class="w-5 h-5 text-black opacity-50 dark:text-white dark:opacity-60"
        />
        <EyeIcon
          v-else
          class="w-5 h-5 text-black opacity-50 dark:text-white dark:opacity-60"
        />
      </IconButton>
    </template>
  </TextInput>
</template>
