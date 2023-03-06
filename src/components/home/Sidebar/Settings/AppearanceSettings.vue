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
  <!--appearance settings-->
  <AccordionButton
    id="appearance-settings-toggler"
    class="w-full flex px-5 py-6 mb-3 rounded focus:outline-none"
    :collapsed="props.collapsed"
    chevron
    aria-controls="appearance-settings-collapse"
    @click="props.handleToggle()"
  >
    <Typography variant="heading-2" class="mb-4"> Appearance </Typography>
    <Typography variant="body-2"> Customize the look and feel </Typography>
  </AccordionButton>

  <Collapse id="appearance-settings-collapse" :collapsed="props.collapsed">
    <SettingsSwitch
      title="Dark Mode"
      description="Apply a theme with dark colors"
      :value="chat.settings['dark-mode']"
      :handle-toggle-switch="(value) => (chat.settings['dark-mode'] = value)"
      class="mb-7"
    />
    <SettingsSwitch
      title="Bordered Theme"
      description="Apply borders to the theme"
      :value="chat.settings['bordered-theme']"
      :handle-toggle-switch="
        (value) => (chat.settings['bordered-theme'] = value)
      "
      class="mb-7"
    />
  </Collapse>
</template>
