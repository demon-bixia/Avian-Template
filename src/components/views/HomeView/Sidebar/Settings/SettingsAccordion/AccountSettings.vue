<script setup lang="ts">
import type { Ref } from "vue";

import { ref } from "vue";

import useStore from "@src/store/store";

import AccordionButton from "@src/components/ui/data-display/AccordionButton.vue";
import Button from "@src/components/ui/inputs/Button.vue";
import DropFileUpload from "@src/components/ui/inputs/DropFileUpload.vue";
import LabeledTextInput from "@src/components/ui/inputs/LabeledTextInput.vue";
import Collapse from "@src/components/ui/utils/Collapse.vue";

// Types
interface AccountValues {
  firstName: string | undefined;
  lastName: string | undefined;
  avatar: File | undefined;
}

// Variables
const props = defineProps<{
  collapsed: boolean;
  handleToggle: () => void;
}>();

const store = useStore();

const accountValues: Ref<AccountValues> = ref({
  firstName: store.user?.firstName,
  lastName: store.user?.lastName,
  avatar: undefined,
});

const loading = ref(false);

// (event) handle submitting the values of the form.
const handleSubmit = () => {
  loading.value = true;

  store.$patch({
    user: {
      ...store.user,
      firstName: accountValues.value.firstName,
      lastName: accountValues.value.lastName,
    },
  });

  setTimeout(() => {
    loading.value = false;
  }, 2000);
};
</script>

<template>
  <!--account settings-->
  <AccordionButton
    id="account-settings-toggler"
    class="w-full flex px-5 py-6 mb-3 rounded focus:outline-none"
    :collapsed="props.collapsed"
    chevron
    aria-controls="account-settings-collapse"
    @click="handleToggle()"
  >
    <p class="heading-2 text-color mb-4">Account</p>
    <p class="body-2 text-color">Update your profile details</p>
  </AccordionButton>

  <Collapse id="account-settings-collapse" :collapsed="props.collapsed">
    <LabeledTextInput
      label="First name"
      inputClasses="mb-7"
      :value="accountValues?.firstName"
      @value-changed="(value) => (accountValues.firstName = value)"
    />
    <LabeledTextInput
      label="Last name"
      inputClasses="mb-7"
      :value="accountValues?.lastName"
      @value-changed="(value) => (accountValues.lastName = value)"
    />
    <DropFileUpload
      label="Avatar"
      class="mb-7"
      accept="image/*"
      :value="accountValues.avatar"
      @value-changed="(value) => (accountValues.avatar = value)"
    />
    <Button
      class="contained-primary contained-text w-full py-4"
      @click="handleSubmit"
      :loading="loading"
    >
      Save Settings
    </Button>
  </Collapse>
</template>
