<script setup lang="ts">
import { EyeSlashIcon } from "@heroicons/vue/24/outline";
import { RouterLink } from 'vue-router'

import GoogleIcon from '../../../assets/google-logo.svg';
import IconButton from "../../reusables/IconButton.vue";
import PrimaryButton from "../../reusables/PrimaryButton.vue";
import TextInput from "../../reusables/TextInput.vue";
import Typography from "../../reusables/Typography.vue";
</script>

<template>
    <div>
        <div>
            <!--header-->
            <div class="mb-6 flex flex-col items-center">
                <Typography variant="heading-4" class="mb-4">Welcome back</Typography>
                <Typography variant="body-3">enter your credentials to login</Typography>
            </div>

            <!--form-->
            <div class="mb-6">
                <TextInput variant="bordered" label="Email" placeholder="Enter your email" class="mb-4" />
                <TextInput variant="bordered" label="Password" placeholder="Enter your password">
                    <template v-slot:endAdornment>
                        <IconButton variant="gohst" class="p-4">
                            <EyeSlashIcon class="w-5 h-5 text-black opacity-50 dark:text-white dark:opacity-60" />
                        </IconButton>
                    </template>
                </TextInput>
            </div>

            <!--controls-->
            <div class="mb-6">
                <PrimaryButton class="w-full mb-4 " link to="/">Sign in</PrimaryButton>
                <PrimaryButton variant="outlined" class="w-full">
                    <span class="flex">
                        <GoogleIcon class="mr-3" /> Sign in with google
                    </span>
                </PrimaryButton>
            </div>

            <!--bottom text-->
            <div class="flex justify-center">
                <Typography variant="body-2">Don’t have an account ?
                    <RouterLink to="/access/sign-up/" class="text-indigo-400 opacity-100">
                        Sign up
                    </RouterLink>
                </Typography>
            </div>
        </div>
    </div>

</template>