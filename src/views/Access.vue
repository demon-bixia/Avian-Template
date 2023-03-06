<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed } from "vue";

import Login from "../components/access/Login/Login.vue";
import Register from "../components/access/Register/Register.vue";
import Cover from "../components/access/Cover/Cover.vue";
import FadeTransition from "../components/reusables/transitions/FadeTransition.vue";

const route = useRoute();

const ActiveMethod = computed(() => {
  if (route.params.method === "sign-up") {
    return Register;
  } else if (route.params.method === "sign-in") {
    return Login;
  }
});
</script>

<template>
  <div class="w-full h-full">
    <div class="w-full h-full flex dark:bg-gray-800">
      <FadeTransition>
        <component
          :is="ActiveMethod"
          class="p-5 md:basis-1/2 xs:basis-full flex flex-col justify-center items-center"
        />
      </FadeTransition>

      <Cover
        class="h-full basis-1/2 md:flex xs:hidden items-center justify-center"
      />
    </div>
  </div>
</template>
