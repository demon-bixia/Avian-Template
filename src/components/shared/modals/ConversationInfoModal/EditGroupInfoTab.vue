<script setup lang="ts">
import { ArrowUturnLeftIcon } from "@heroicons/vue/24/solid";
import Typography from "@src/components/ui/data-display/Typography.vue";
import Button from "@src/components/ui/inputs/Button.vue";
import DropFileUpload from "@src/components/ui/inputs/DropFileUpload.vue";
import TextInput from "@src/components/ui/inputs/TextInput.vue";
import IconButton from "@src/components/ui/inputs/IconButton.vue";
</script>

<template>
  <div>
    <!--header-->
    <div class="px-5 mb-6 flex justify-between items-center">
      <Typography
        id="modal-title"
        variant="heading-1"
        class="default-outline"
        tabindex="0"
      >
        Edit Group Info
      </Typography>

      <!--return button-->
      <IconButton
        @click="
          $emit('active-page-change', {
            tabName: 'conversation-info',
            animationName: 'slide-right',
          })
        "
        color="danger"
        class="group p-2 border rounded-full border-gray-200 dark:border-white dark:border-opacity-70 focus:border-red-100 dark:focus:border-red-400 hover:border-red-100 dark:hover:border-red-500"
      >
        <ArrowUturnLeftIcon
          class="w-5 h-5 text-black opacity-50 dark:text-white dark:opacity-70 group-focus:text-red-500 dark:group-focus:text-white group-hover:text-red-500 group-hover:opacity-100 dark:group-hover:text-white"
        />
      </IconButton>
    </div>

    <!--inputs-->
    <div class="px-5 mb-6">
      <div class="mb-5">
        <TextInput type="text" placeholder="Group name" label="Name" />
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
        class="w-full px-5 bg-indigo-400 hover:bg-indigo-500 active:bg-indigo-500"
      >
        Save
      </Button>
    </div>
  </div>
</template>
