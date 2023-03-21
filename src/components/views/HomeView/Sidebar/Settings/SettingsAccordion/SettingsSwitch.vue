<script setup lang="ts">
import SwitchInput from "@src/components/ui/inputs/SwitchInput.vue";
import Typography from "@src/components/ui/data-display/Typography.vue";

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
          <Typography variant="heading-2" class="w-13">
            {{ props.title }}
          </Typography>
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
    <Typography variant="body-2" class="help-block outline-none" tabindex="0">
      {{ props.description }}
    </Typography>
  </div>
</template>
