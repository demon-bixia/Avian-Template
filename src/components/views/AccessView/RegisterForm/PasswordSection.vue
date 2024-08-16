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
        class="pr-[2.5rem] mb-5"
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
      <Button class="w-full mb-4">Sign up</Button>
      <Button
        variant="outlined"
        class="w-full"
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
