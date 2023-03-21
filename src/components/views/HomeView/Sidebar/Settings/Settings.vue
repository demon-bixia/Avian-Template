<script setup lang="ts">
import SidebarHeader from "@src/components/views/HomeView/Sidebar/SidebarHeader.vue";
import SettingsAccordion from "@src/components/views/HomeView/Sidebar/Settings/SettingsAccordion/SettingsAccordion.vue";
</script>

<template>
  <div>
    <SidebarHeader>
      <template v-slot:title>Settings</template>
    </SidebarHeader>

    <div
      class="w-full h-full scroll-smooth scrollbar-hidden"
      style="overflow-x: visible; overflow-y: scroll"
    >
      <SettingsAccordion />
    </div>
  </div>
</template>
