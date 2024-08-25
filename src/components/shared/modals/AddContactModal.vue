<script setup lang="ts">
import Button from "@src/components/ui/inputs/Button.vue";
import LabeledTextInput from "@src/components/ui/inputs/LabeledTextInput.vue";
import Modal from "@src/components/ui/utils/Modal.vue";

const props = defineProps<{
  openModal: boolean;
  closeModal: () => void;
}>();
</script>

<template>
  <Modal :open="props.openModal" :closeModal="props.closeModal">
    <template v-slot:content>
      <div class="w-[18.75rem] bg-white dark:bg-gray-800 rounded py-6">
        <!--modal header-->
        <div class="flex justify-between items-center px-5">
          <p id="modal-title" class="heading-1 text-color" tabindex="0">
            Add Contact
          </p>

          <Button
            class="outlined-danger ghost-text py-2 px-4"
            @click="props.closeModal"
          >
            esc
          </Button>
        </div>

        <!--text input-->
        <div class="px-5 pb-5 pt-6">
          <LabeledTextInput type="text" placeholder="Email" />
        </div>

        <!--submit button-->
        <div class="px-5">
          <Button class="contained-primary contained-text w-full py-4">
            Add
          </Button>
        </div>
      </div>
    </template>
  </Modal>
</template>
