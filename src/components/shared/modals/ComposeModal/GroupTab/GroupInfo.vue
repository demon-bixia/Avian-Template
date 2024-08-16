<script setup lang="ts">
import Button from "@src/components/ui/inputs/Button.vue";
import DropFileUpload from "@src/components/ui/inputs/DropFileUpload.vue";
import TextInput from "@src/components/ui/inputs/TextInput.vue";
</script>

<template>
  <div class="px-5">
    <!--inputs-->
    <div class="mb-5">
      <div class="mb-5">
        <TextInput type="text" placeholder="Group name" label="Name" />
      </div>

      <div>
        <DropFileUpload label="Avatar" />
      </div>
    </div>

    <!--next button-->
    <div class="flex pb-6">
      <div class="grow"></div>
      <Button
        @click="
          $emit('active-page-change', {
            tabName: 'group-members',
            animationName: 'slide-left',
          })
        "
        class="px-5 bg-indigo-400 hover:bg-indigo-500 active:bg-indigo-500"
      >
        Next
      </Button>
    </div>
  </div>
</template>
