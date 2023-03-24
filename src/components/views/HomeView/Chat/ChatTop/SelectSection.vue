<script setup lang="ts">
import Typography from "@src/components/ui/data-display/Typography.vue";
import Button from "@src/components/ui/inputs/Button.vue";
import Checkbox from "@src/components/ui/inputs/Checkbox.vue";

const props = defineProps<{
  selectMode: boolean;
  selectAll: boolean;
  handleCloseSelect: () => void;
  handleDeselectAll: () => void;
  handleSelectAll: () => void;
}>();

// (event) toggle the select all checkbox
const handleCheck = () => {
  if (props.selectAll) {
    props.handleDeselectAll();
  } else {
    props.handleSelectAll();
  }
};
</script>

<template>
  <!--select mode controls-->
  <div v-if="props.selectMode" class="w-full flex justify-between items-center">
    <div class="flex items-center">
      <Checkbox
        input-id="select-all"
        :value="props.selectAll"
        class="mr-3"
        :handle-check="handleCheck"
      />
      <label for="select-all">
        <Typography variant="body-2">Select All</Typography>
      </label>
    </div>
    <div class="flex items-center">
      <Button variant="ghost" color="danger" class="mr-3"> Delete </Button>
      <Button variant="ghost" color="primary" @click="props.handleCloseSelect">
        Cancel
      </Button>
    </div>
  </div>
</template>
