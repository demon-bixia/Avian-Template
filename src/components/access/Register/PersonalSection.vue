<script setup lang="ts">
import Button from "../../reusables/Button.vue";
import TextInput from "../../reusables/TextInput.vue";
</script>

<template>
  <div>
    <!--form-->
    <div class="mb-6">
      <TextInput
        variant="bordered"
        label="Email"
        placeholder="Enter your email"
        class="mb-4"
      />

      <TextInput
        variant="bordered"
        label="First Name"
        placeholder="Enter your first name"
        class="mb-4"
      />

      <TextInput
        variant="bordered"
        label="Last Name"
        placeholder="Enter your last name"
      />
    </div>

    <!--controls-->
    <div class="mb-6">
      <Button
        @click="
          $emit('active-section-change', {
            sectionName: 'password-section',
            animationName: 'slide-left',
          })
        "
        class="w-full mb-4"
        >Next</Button
      >

      <Button variant="outlined" class="w-full">
        <span class="flex">
          <img src="../../../../public/vectors/google-logo.svg" class="mr-3" />
          Sign up with google
        </span>
      </Button>
    </div>
  </div>
</template>
