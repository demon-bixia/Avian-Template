<script setup lang="ts">
import { EyeSlashIcon } from "@heroicons/vue/24/outline";

import IconButton from "../../reusables/IconButton.vue";
import PrimaryButton from "../../reusables/PrimaryButton.vue";
import TextInput from "../../reusables/TextInput.vue";
</script>
    
<template>
    <div>
        <!--form-->
        <div class="mb-6">
            <TextInput variant="bordered" label="Password" placeholder="Enter your password" class="mb-4">
                <template v-slot:endAdornment>
                    <IconButton variant="gohst" class="p-4">
                        <EyeSlashIcon class="w-5 h-5 text-black opacity-50" />
                    </IconButton>
                </template>
            </TextInput>

            <TextInput variant="bordered" label="Confirm Password" placeholder="Enter your password">
                <template v-slot:endAdornment>
                    <IconButton variant="gohst" class="p-4">
                        <EyeSlashIcon class="w-5 h-5 text-black opacity-50" />
                    </IconButton>
                </template>
            </TextInput>
        </div>

        <!--controls-->
        <div class="mb-6">
            <PrimaryButton class="w-full mb-4">Sign up</PrimaryButton>
            <PrimaryButton variant="outlined" class="w-full"
                @click="$emit('active-section-change', { sectionName: 'personal-section', animationName: 'slide-right' })">
                Back
            </PrimaryButton>
        </div>
    </div>
</template>