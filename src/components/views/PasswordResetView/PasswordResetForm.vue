<script setup lang="ts">
import { ref } from "vue";

import Button from "@src/components/ui/inputs/Button.vue";
import PasswordInput from "@src/components/ui/inputs/PasswordInput.vue";

const oldPassword = ref("");
const newPassword = ref("");
const confirmNewPassword = ref("");
</script>

<template>
  <div class="w-full p-5 flex flex-col justify-center items-center">
    <div class="mb-6 w-[21.875rem]">
      <!--header-->
      <div class="mb-6 flex flex-col">
        <img
          src="@src/assets/vectors/logo-gradient.svg"
          class="w-[1.375rem] h-[1.125rem] mb-4 opacity-70"
          alt="bird logo"
        />
        <p class="heading-2 text-color mb-4">Reset Your Password</p>
        <p class="body-3 text-color text-opacity-75 font-light">
          Enter your old password and your new password below to reset your
          password
        </p>
      </div>

      <!--form-->
      <div class="mb-6">
        <PasswordInput
          :value="oldPassword"
          @valueChanged="
            (value) => {
              oldPassword = value;
            }
          "
          bordered
          label="Old Password"
          placeholder="Enter your password"
          class="mb-5"
        />

        <PasswordInput
          :value="newPassword"
          @valueChanged="
            (value) => {
              newPassword = value;
            }
          "
          bordered
          label="New Password"
          placeholder="Enter your password"
          class="mb-5"
        />

        <PasswordInput
          :value="confirmNewPassword"
          @valueChanged="
            (value) => {
              confirmNewPassword = value;
            }
          "
          bordered
          label="Confirm New Password"
          placeholder="Enter your password"
        />
      </div>

      <!--controls-->
      <div>
        <Button class="contained-primary contained-text w-full" link to="/"
          >Reset Password</Button
        >
      </div>
    </div>
  </div>
</template>
