<script setup lang="ts">
import { Call } from '../../../../stores/chat';

import SearchInput from "../../../reusables/SearchInput.vue";
import ContactItem from "../../Sidebar/Contacts/ContactItem.vue";

const props = defineProps<{
    closeModal: () => void,
    call: Call,
}>();

</script>

<template>
    <div>
        <!--search-->
        <div class="mb-5 mx-5 mt-6">
            <SearchInput />
        </div>

        <!--contacts-->
        <div ref="contactContainer" class="max-h-[140px]  mb-5 overflow-y-scroll scrollbar scrollbar-hidden">
            <ContactItem v-for="(member, index) in props.call.members" :contact="member" :key="index" />
        </div>
    </div>
</template>