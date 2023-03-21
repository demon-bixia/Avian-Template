<script setup lang="ts">
import Typography from "@src/components/ui/data-display/Typography.vue";
import Button from "@src/components/ui/inputs/Button.vue";
import TextInput from "@src/components/ui/inputs/TextInput.vue";
import Modal from "@src/components/ui/utils/Modal.vue";

const props = defineProps<{
  openModal: boolean;
  closeModal: () => void;
}>();
</script>

<template>
  <Modal :open="props.openModal" :closeModal="props.closeModal">
    <template v-slot:content>
      <div class="w-[300px] bg-white dark:bg-gray-800 rounded py-6">
        <!--modal header-->
        <div class="flex justify-between items-center px-5">
          <Typography
            id="modal-title"
            variant="heading-1"
            class="default-outline"
            tabindex="0"
          >
            Add Contact
          </Typography>

          <Button
            variant="outlined"
            color="danger"
            @click="props.closeModal"
            typography="body-4"
          >
            esc
          </Button>
        </div>

        <!--text input-->
        <div class="px-5 pb-5 pt-6">
          <TextInput type="text" placeholder="Email" />
        </div>

        <!--submit button-->
        <div class="px-5">
          <Button class="w-full py-4"> Add </Button>
        </div>
      </div>
    </template>
  </Modal>
</template>
