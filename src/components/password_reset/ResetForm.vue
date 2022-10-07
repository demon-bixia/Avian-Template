<script setup lang="ts">
import { EyeSlashIcon } from "@heroicons/vue/24/outline";

import IconButton from "../reusables/IconButton.vue";
import PrimaryButton from "../reusables/PrimaryButton.vue";
import TextInput from "../reusables/TextInput.vue";
</script>
    
<template>
    <div>
        <div>
            <!--form-->
            <div class="mb-6">
                <TextInput variant="bordered" label="Old Password" placeholder="Enter your password" class="mb-4">
                    <template v-slot:endAdornment>
                        <IconButton variant="gohst" class="p-4">
                            <EyeSlashIcon class="w-5 h-5 text-black opacity-50" />
                        </IconButton>
                    </template>
                </TextInput>

                <TextInput variant="bordered" label="New Password" placeholder="Enter your password" class="mb-4">
                    <template v-slot:endAdornment>
                        <IconButton variant="gohst" class="p-4">
                            <EyeSlashIcon class="w-5 h-5 text-black opacity-50" />
                        </IconButton>
                    </template>
                </TextInput>

                <TextInput variant="bordered" label="Confirm New Password" placeholder="Enter your password">
                    <template v-slot:endAdornment>
                        <IconButton variant="gohst" class="p-4">
                            <EyeSlashIcon class="w-5 h-5 text-black opacity-50" />
                        </IconButton>
                    </template>
                </TextInput>
            </div>

            <!--controls-->
            <div>
                <PrimaryButton class="w-full" link to="/">Reset Password</PrimaryButton>
            </div>
        </div>
    </div>

</template>