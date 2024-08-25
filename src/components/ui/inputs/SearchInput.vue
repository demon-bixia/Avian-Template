<script setup lang="ts">
import { MagnifyingGlassIcon, XCircleIcon } from "@heroicons/vue/24/outline";
import IconButton from "@src/components/ui/inputs/IconButton.vue";
import LabeledTextInput from "@src/components/ui/inputs/LabeledTextInput.vue";

defineEmits(["valueChanged"]);

const props = defineProps<{
  variant?: string;
  class?: string;
  value?: string;
}>();
</script>

<template>
  <LabeledTextInput
    placeholder="Search.."
    class="pl-7"
    :value="props.value"
    @value-changed="(value) => $emit('valueChanged', value)"
  >
    <template v-slot:startAdornment>
      <MagnifyingGlassIcon
        class="w-5 h-5 mx-[8px] translate-y-[75%] text-gray-400 dark:text-white dark:opacity-70"
      />
    </template>
    <template v-slot:endAdornment>
      <IconButton
        v-if="props.value"
        @click="
          () => {
            if (props.value) $emit('valueChanged', '');
          }
        "
        title="clear text"
        aria-label="clear text"
        class="ic-btn-ghost-gray m-[.5rem] p-2"
      >
        <XCircleIcon class="w-5 h-5" />
      </IconButton>
    </template>
  </LabeledTextInput>
</template>
