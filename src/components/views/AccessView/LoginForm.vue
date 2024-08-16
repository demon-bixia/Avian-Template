<script setup lang="ts">
import { ref } from "vue";

import Typography from "@src/components/ui/data-display/Typography.vue";
import Button from "@src/components/ui/inputs/Button.vue";
import TextInput from "@src/components/ui/inputs/TextInput.vue";
import PasswordInput from "@src/components/ui/inputs/PasswordInput.vue";
import { RouterLink } from "vue-router";

const password = ref("");
</script>

<template>
  <div
    class="p-5 md:basis-1/2 xs:basis-full flex flex-col justify-center items-center"
  >
    <div class="w-full md:px-[26%] xs:px-[10%]">
      <!--header-->
      <div class="mb-6 flex flex-col">
        <img
          src="@src/assets/vectors/logo-gradient.svg"
          class="w-[1.375rem] h-[1.125rem] mb-4 opacity-70"
          alt="bird logo"
        />
        <Typography variant="heading-2" class="mb-4">Welcome back</Typography>
        <Typography variant="body-3" class="text-opacity-75 font-light">
          Create an account a start messaging now!
        </Typography>
      </div>

      <!--form-->
      <div class="mb-6">
        <TextInput label="Email" placeholder="Enter your email" class="mb-5" />
        <PasswordInput
          @valueChanged="(value) => (password = value)"
          :value="password"
          label="Password"
          placeholder="Enter your password"
          class="pr-[2.5rem]"
        />
      </div>

      <!--local controls-->
      <div class="mb-6">
        <Button class="w-full mb-4" link to="/chat/no-chat/">Sign in</Button>
      </div>

      <!--divider-->
      <div class="mb-6 flex items-center">
        <span
          class="w-full border border-dashed border-gray-100 dark:border-gray-600 rounded-[.0625rem]"
        ></span>
        <Typography variant="body-3" class="px-4 text-opacity-75 font-light"
          >or</Typography
        >
        <span
          class="w-full border border-dashed border-gray-100 dark:border-gray-600 rounded-[.0625rem]"
        ></span>
      </div>

      <!--oauth controls-->
      <div>
        <Button variant="outlined" class="w-full mb-5">
          <span class="flex">
            <img
              src="@src/assets/vectors/google-logo.svg"
              class="mr-3"
              alt="google logo"
            />
            Sign in with google
          </span>
        </Button>

        <!--bottom text-->
        <div class="flex justify-center">
          <Typography variant="body-2"
            >Don’t have an account?
            <RouterLink
              to="/access/sign-up/"
              class="text-indigo-400 opacity-100"
            >
              Sign up
            </RouterLink>
          </Typography>
        </div>
      </div>
    </div>
  </div>
</template>
