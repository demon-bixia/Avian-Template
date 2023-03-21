<script setup lang="ts">
import useStore from "@src/store/store";

import AccordionButton from "@src/components/ui/data-display/AccordionButton.vue";
import Collapse from "@src/components/ui/utils/Collapse.vue";
import SettingsSwitch from "@src/components/views/HomeView/Sidebar/Settings/SettingsAccordion/SettingsSwitch.vue";
import Typography from "@src/components/ui/data-display/Typography.vue";

const props = defineProps<{
  collapsed: boolean;
  handleToggle: () => void;
}>();

const store = useStore();
</script>

<template>
  <!--notifications settings-->
  <AccordionButton
    id="notifications-settings-toggler"
    class="w-full flex px-5 py-6 mb-3 rounded focus:outline-none"
    :collapsed="props.collapsed"
    chevron
    aria-controls="notifications-settings-collapse"
    @click="props.handleToggle()"
  >
    <Typography variant="heading-2" class="mb-4"> Notifications </Typography>
    <Typography variant="body-2"> Customize notifications </Typography>
  </AccordionButton>

  <Collapse id="notifications-settings-collapse" :collapsed="props.collapsed">
    <SettingsSwitch
      title="Allow Notifications"
      description="Receive Notifications from avian"
      :value="!!store.settings.allowNotifications"
      :handle-toggle-switch="
        (value) => (store.settings.allowNotifications = value)
      "
      class="mb-7"
    />
    <SettingsSwitch
      title="Keep Notifications"
      description="Save notifications after they are received"
      :value="!!store.settings.keepNotifications"
      :handle-toggle-switch="
        (value) => (store.settings.keepNotifications = value)
      "
      class="mb-7"
    />
  </Collapse>
</template>
