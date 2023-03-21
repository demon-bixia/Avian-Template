<script setup lang="ts">
import Button from "@src/components/ui/inputs/Button.vue";
import TextInput from "@src/components/ui/inputs/TextInput.vue";
import Typography from "@src/components/ui/data-display/Typography.vue";
</script>

<template>
  <div>
    <!--form-->
    <div class="mb-5">
      <TextInput label="Email" placeholder="Enter your email" class="mb-5" />
      <TextInput
        label="First Name"
        placeholder="Enter your first name"
        class="mb-5"
      />
      <TextInput
        label="Last Name"
        placeholder="Enter your last name"
        class="mb-5"
      />
    </div>

    <!--local controls-->
    <div class="mb-6">
      <Button
        class="w-full mb-4"
        @click="
          $emit('active-section-change', {
            sectionName: 'password-section',
            animationName: 'slide-left',
          })
        "
        >Next</Button
      >
    </div>

    <!--divider-->
    <div class="mb-6 flex items-center">
      <span
        class="w-full border border-dashed border-gray-100 dark:border-gray-600 rounded-[1px]"
      ></span>
      <Typography variant="body-3" class="px-4 text-opacity-75 font-light"
        >or</Typography
      >
      <span
        class="w-full border border-dashed border-gray-100 dark:border-gray-600 rounded-[1px]"
      ></span>
    </div>

    <!--oauth controls-->
    <Button variant="outlined" class="w-full mb-5">
      <span class="flex">
        <img
          src="@src/assets/vectors/google-logo.svg"
          class="mr-3"
          alt="google-logo"
        />
        Sign in with google
      </span>
    </Button>
  </div>
</template>
