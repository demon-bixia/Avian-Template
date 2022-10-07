<script setup lang="ts">
import ResetForm from '../components/password_reset/ResetForm.vue';
import useChatStore from '../stores/chat';

</script>
    
<template>
    <div>
        <div class="w-full h-screen flex">
            <ResetForm class="w-full p-5 flex flex-col justify-center items-center" />
        </div>
    </div>
</template>