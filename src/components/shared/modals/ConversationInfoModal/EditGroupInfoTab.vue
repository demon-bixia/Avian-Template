<script setup lang="ts">
import { ArrowUturnLeftIcon } from "@heroicons/vue/24/solid";
import Button from "@src/components/ui/inputs/Button.vue";
import DropFileUpload from "@src/components/ui/inputs/DropFileUpload.vue";
import LabeledTextInput from "@src/components/ui/inputs/LabeledTextInput.vue";
import IconButton from "@src/components/ui/inputs/IconButton.vue";
</script>

<template>
  <div>
    <!--header-->
    <div class="px-5 mb-6 flex justify-between items-center">
      <p id="modal-title" class="heading-1 text-color" tabindex="0">
        Edit Group Info
      </p>

      <!--return button-->
      <IconButton
        @click="
          $emit('active-page-change', {
            tabName: 'conversation-info',
            animationName: 'slide-right',
          })
        "
        class="ic-btn-outlined-danger p-2"
      >
        <ArrowUturnLeftIcon class="w-5 h-5" />
      </IconButton>
    </div>

    <!--inputs-->
    <div class="px-5 mb-6">
      <div class="mb-5">
        <LabeledTextInput type="text" placeholder="Group name" label="Name" />
      </div>

      <div>
        <DropFileUpload label="Avatar" />
      </div>
    </div>

    <!--save button-->
    <div class="px-5">
      <Button
        @click="
          $emit('active-page-change', {
            tabName: 'conversation-info',
            animationName: 'slide-right',
          })
        "
        class="contained-primary contained-text w-full"
      >
        Save
      </Button>
    </div>
  </div>
</template>
