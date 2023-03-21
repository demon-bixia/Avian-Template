<script setup lang="ts">
import { ref } from "vue";

import { EyeSlashIcon, EyeIcon } from "@heroicons/vue/24/outline";
import IconButton from "@src/components/ui/inputs/IconButton.vue";
import TextInput from "@src/components/ui/inputs/TextInput.vue";
import Button from "@src/components/ui/inputs/Button.vue";

const showPassword = ref(false);
const showPasswordConfirm = ref(false);
</script>

<template>
  <div>
    <div class="mb-5">
      <!--form-->
      <TextInput
        label="Password"
        placeholder="Enter your password"
        :type="showPassword ? 'text' : 'password'"
        class="pr-[40px] mb-5"
      >
        <template v-slot:endAdornment>
          <IconButton
            title="toggle password visibility"
            aria-label="toggle password visibility"
            class="m-[8px] p-2"
            @click="showPassword = !showPassword"
          >
            <EyeSlashIcon
              v-if="showPassword"
              class="w-5 h-5 text-black opacity-50 dark:text-white dark:opacity-60"
            />
            <EyeIcon
              v-else
              class="w-5 h-5 text-black opacity-50 dark:text-white dark:opacity-60"
            />
          </IconButton>
        </template>
      </TextInput>

      <TextInput
        label="Confirm Password"
        placeholder="Enter your password"
        :type="showPasswordConfirm ? 'text' : 'password'"
      >
        <template v-slot:endAdornment>
          <IconButton
            title="toggle password visibility"
            aria-label="toggle password visibility"
            class="m-[8px] p-2"
            @click="showPasswordConfirm = !showPasswordConfirm"
          >
            <EyeSlashIcon
              v-if="showPasswordConfirm"
              class="w-5 h-5 text-black opacity-50 dark:text-white dark:opacity-60"
            />
            <EyeIcon
              v-else
              class="w-5 h-5 text-black opacity-50 dark:text-white dark:opacity-60"
            />
          </IconButton>
        </template>
      </TextInput>
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
