<script setup lang="ts">
import useChatStore from "../../../../stores/chat";

import AccordionButton from "../../../reusables/AccordionButton.vue";
import Collapse from "../../../reusables/Collapse.vue";
import SettingsSwitch from "./SettingsSwitch.vue";
import Typography from "../../../reusables/Typography.vue";

const props = defineProps<{
  collapsed: boolean;
  handleToggle: () => void;
}>();

const chat = useChatStore();
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
      :value="chat.settings['allow-notifications']"
      :handle-toggle-switch="
        (value) => (chat.settings['allow-notifications'] = value)
      "
      class="mb-7"
    />
    <SettingsSwitch
      title="Keep Notifications"
      description="Save notifications after they are received"
      :value="chat.settings['keep-notifications']"
      :handle-toggle-switch="
        (value) => (chat.settings['keep-notifications'] = value)
      "
      class="mb-7"
    />
  </Collapse>
</template>
