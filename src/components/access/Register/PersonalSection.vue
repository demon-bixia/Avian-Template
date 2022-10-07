<script setup lang="ts">
import GoogleIcon from '../../../assets/google-logo.svg';
import PrimaryButton from '../../reusables/PrimaryButton.vue';
import TextInput from '../../reusables/TextInput.vue';
</script>

<template>
    <div>
        <!--form-->
        <div class="mb-6">
            <TextInput variant="bordered" label="Email" placeholder="Enter your email" class="mb-4" />

            <TextInput variant="bordered" label="First Name" placeholder="Enter your first name" class="mb-4" />

            <TextInput variant="bordered" label="Last Name" placeholder="Enter your last name" />
        </div>

        <!--controls-->
        <div class="mb-6">
            <PrimaryButton
                @click="$emit('active-section-change', { sectionName: 'password-section', animationName: 'slide-left' })"
                class="w-full mb-4">Next</PrimaryButton>

            <PrimaryButton variant="outlined" class="w-full">
                <span class="flex">
                    <GoogleIcon class="mr-3" /> Sign up with google
                </span>
            </PrimaryButton>
        </div>
    </div>
</template>