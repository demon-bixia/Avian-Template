<script setup lang="ts">
import { EyeSlashIcon } from "@heroicons/vue/24/outline";

import IconButton from "@src/components/ui/inputs/IconButton.vue";
import Button from "@src/components/ui/inputs/Button.vue";
import TextInput from "@src/components/ui/inputs/TextInput.vue";
</script>

<template>
  <div>
    <div>
      <!--form-->
      <div class="mb-6">
        <TextInput
          variant="bordered"
          label="Old Password"
          placeholder="Enter your password"
          class="mb-4"
        >
          <template v-slot:endAdornment>
            <IconButton variant="ghost" class="p-4">
              <EyeSlashIcon class="w-5 h-5 text-black opacity-50" />
            </IconButton>
          </template>
        </TextInput>

        <TextInput
          variant="bordered"
          label="New Password"
          placeholder="Enter your password"
          class="mb-4"
        >
          <template v-slot:endAdornment>
            <IconButton variant="ghost" class="p-4">
              <EyeSlashIcon class="w-5 h-5 text-black opacity-50" />
            </IconButton>
          </template>
        </TextInput>

        <TextInput
          variant="bordered"
          label="Confirm New Password"
          placeholder="Enter your password"
        >
          <template v-slot:endAdornment>
            <IconButton variant="ghost" class="p-4">
              <EyeSlashIcon class="w-5 h-5 text-black opacity-50" />
            </IconButton>
          </template>
        </TextInput>
      </div>

      <!--controls-->
      <div>
        <Button class="w-full" link to="/">Reset Password</Button>
      </div>
    </div>
  </div>
</template>
