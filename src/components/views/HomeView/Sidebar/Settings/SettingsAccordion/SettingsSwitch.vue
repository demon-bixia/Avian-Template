<script setup lang="ts">
import SwitchInput from "@src/components/ui/inputs/SwitchInput.vue";

const props = defineProps<{
  value: boolean;
  title: string;
  description: string;
  handleToggleSwitch: (value: boolean) => any;
}>();
</script>

<template>
  <div class="w-full flex flex-col">
    <div class="flex">
      <!--label-->
      <div class="grow">
        <label
          for="last-seen"
          class="inline-block outline-none mb-4"
          tabindex="0"
        >
          <p class="heading-2 text-color w-13">
            {{ props.title }}
          </p>
        </label>
      </div>

      <!--switch-->
      <SwitchInput
        id="last-seen"
        :value="props.value"
        @switch-clicked="(value) => props.handleToggleSwitch(value)"
      />
    </div>
    <!--description or help text-->
    <p class="body-2 text-color help-block outline-none" tabindex="0">
      {{ props.description }}
    </p>
  </div>
</template>
