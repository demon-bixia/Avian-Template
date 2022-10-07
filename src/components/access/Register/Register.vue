<script setup lang="ts">
import { computed, ref } from "vue";
import { RouterLink } from 'vue-router';

import SlideTransition from "../../reusables/transitions/SlideTransition.vue";
import Typography from "../../reusables/Typography.vue";
import PasswordSection from './PasswordSection.vue';
import PersonalSection from './PersonalSection.vue';



defineEmits(['activeSectionChange']);

// determines what form section to use.
const activeSectionName = ref('personal-section');

// determines what direction the slide animation should use.
const animation = ref('slide-left');

// get the active section component from the section name
const ActiveSection = computed(() => {
    if (activeSectionName.value === 'personal-section') {
        return PersonalSection;
    } else if (activeSectionName.value === 'password-section') {
        return PasswordSection;
    }
});

// (event) to move between modal pages
const changeActiveSection = (event: { sectionName: string, animationName: string }) => {
    animation.value = event.animationName;
    activeSectionName.value = event.sectionName;
};
</script>
    
<template>
    <div>
        <div>
            <!--header-->
            <div class="mb-6 flex flex-col items-center">
                <Typography variant="heading-4" class="mb-4">Create an account</Typography>
                <Typography variant="body-3">get started by creating a new account</Typography>
            </div>

            <SlideTransition :animation="animation">
                <component @active-section-change="changeActiveSection" :is="ActiveSection" />
            </SlideTransition>

            <!--bottom text-->
            <div class="flex justify-center">
                <Typography variant="body-2">Already have an account ?
                    <RouterLink to="/access/sign-in/" class="text-indigo-400 opacity-100">
                        Sign in
                    </RouterLink>
                </Typography>
            </div>
        </div>
    </div>

</template>