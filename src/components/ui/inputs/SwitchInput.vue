<script setup lang="ts">
const emit = defineEmits(["switchClicked"]);

const props = defineProps<{
  id?: string;
  label?: string;
  value: boolean;
  description?: string;
}>();

// (event) toggle the switch when pressing enter
const handleToggleSwitchOnEnter = (event: KeyboardEvent) => {
  if (event.key === "Enter") {
    emit("switchClicked", !props.value);
  }
};
</script>

<template>
  <!--switch-->
  <div
    role="switch"
    :aria-checked="!!props.value"
    :aria-label="'Switch ' + (props.value ? 'checked' : 'not checked')"
    class="relative flex select-none outline-none transition-all duration-200 ease-in"
    tabindex="0"
  >
    <input
      :checked="props.value"
      :id="id"
      type="checkbox"
      :name="label"
      class="absolute block w-5 h-5 rounded-full bg-white scale-[0.6] appearance-none cursor-pointer foucs:outline-none transition-all duration-300"
      :class="{ 'right-0': value }"
      tabindex="-1"
    />

    <label
      @click.capture="$emit('switchClicked', !props.value)"
      @keydown="handleToggleSwitchOnEnter"
      :for="id"
      class="block w-7 h-5 rounded-full outline-none cursor-pointer"
      :class="{
        'bg-indigo-400': value,
        'bg-gray-300 dark:bg-gray-600': !value,
      }"
      tabindex="-1"
    >
    </label>
  </div>
</template>
