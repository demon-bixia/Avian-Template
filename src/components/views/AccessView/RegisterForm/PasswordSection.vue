<script setup lang="ts">
import { ref } from "vue";

import PasswordInput from "@src/components/ui/inputs/PasswordInput.vue";
import Button from "@src/components/ui/inputs/Button.vue";

const password = ref("");
const confirmPassword = ref("");
</script>

<template>
  <div>
    <div class="mb-5">
      <!--form-->
      <PasswordInput
        @valueChanged="(value) => (password = value)"
        :value="password"
        label="Password"
        placeholder="Enter your password"
        class="mb-4"
      />

      <PasswordInput
        @valueChanged="(value) => (confirmPassword = value)"
        :value="confirmPassword"
        label="Confirm Password"
        placeholder="Enter your password"
      />
    </div>

    <!--controls-->
    <div class="mb-5">
      <Button class="contained-primary contained-text w-full mb-4"
        >Sign up</Button
      >
      <Button
        class="outlined-primary outlined-text w-full"
        @click="
          $emit('active-section-change', {
            sectionName: 'personal-section',
            animationName: 'slide-right',
          })
        "
      >
        Back
      </Button>
    </div>
  </div>
</template>
