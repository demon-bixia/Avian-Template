<script setup lang="ts">
import useChatStore from "../../../../stores/chat";

import AccordionButton from "../../../reusables/AccordionButton.vue";
import Collapse from "../../../reusables/Collapse.vue";
import SettingsSwitch from "./SettingsSwitch.vue";
import Typography from "../../../reusables/Typography.vue";

// Variables
const props = defineProps<{
  collapsed: boolean;
  handleToggle: () => void;
}>();

const chat = useChatStore();
</script>

<template>
  <!--privacy settings-->
  <AccordionButton
    id="privacy-settings-toggler"
    class="w-full flex px-5 py-6 mb-3 rounded focus:outline-none"
    :collapsed="props.collapsed"
    chevron
    aria-controls="privacy-settings-collapse"
    @click="props.handleToggle()"
  >
    <Typography variant="heading-2" class="mb-4"> Privacy & Safety </Typography>
    <Typography variant="body-2"> Control your privacy settings</Typography>
  </AccordionButton>

  <Collapse id="privacy-settings-collapse" :collapsed="props.collapsed">
    <SettingsSwitch
      title="Show Last Seen"
      description="Allow people to see your last login"
      :value="chat.settings['last-seen']"
      :handle-toggle-switch="(value) => (chat.settings['last-seen'] = value)"
      class="mb-7"
    />
    <SettingsSwitch
      title="Show Read Receipt"
      description="Allow people to see whether or not you've read the message"
      :value="chat.settings['read-receipt']"
      :handle-toggle-switch="(value) => (chat.settings['read-receipt'] = value)"
      class="mb-7"
    />
    <SettingsSwitch
      title="Joining Groups"
      description="Allow people to add you to groups"
      :value="chat.settings['joining-groups']"
      :handle-toggle-switch="
        (value) => (chat.settings['joining-groups'] = value)
      "
      class="mb-7"
    />
    <SettingsSwitch
      title="Private Messages"
      description="Receive messages from non-contacts"
      :value="chat.settings['private-messages']"
      :handle-toggle-switch="
        (value) => (chat.settings['private-messages'] = value)
      "
      class="mb-7"
    />
  </Collapse>
</template>
