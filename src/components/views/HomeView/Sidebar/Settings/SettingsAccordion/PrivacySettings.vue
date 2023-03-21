<script setup lang="ts">
import useStore from "@src/store/store";

import AccordionButton from "@src/components/ui/data-display/AccordionButton.vue";
import Typography from "@src/components/ui/data-display/Typography.vue";
import Collapse from "@src/components/ui/utils/Collapse.vue";
import SettingsSwitch from "@src/components/views/HomeView/Sidebar/Settings/SettingsAccordion/SettingsSwitch.vue";

// Variables
const props = defineProps<{
  collapsed: boolean;
  handleToggle: () => void;
}>();

const store = useStore();
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
      :value="!!store.settings.lastSeen"
      :handle-toggle-switch="(value:boolean) => (store.settings.lastSeen = value)"
      class="mb-7"
    />
    <SettingsSwitch
      title="Show Read Receipt"
      description="Allow people to see whether or not you've read the message"
      :value="!!store.settings.readReceipt"
      :handle-toggle-switch="
        (value:boolean) => (store.settings.readReceipt = value)
      "
      class="mb-7"
    />
    <SettingsSwitch
      title="Joining Groups"
      description="Allow people to add you to groups"
      :value="!!store.settings.joiningGroups"
      :handle-toggle-switch="
        (value:boolean) => (store.settings.joiningGroups = value)
      "
      class="mb-7"
    />
    <SettingsSwitch
      title="Private Messages"
      description="Receive messages from non-contacts"
      :value="!!store.settings.privateMessages"
      :handle-toggle-switch="
        (value:boolean) => (store.settings.privateMessages = value)
      "
      class="mb-7"
    />
  </Collapse>
</template>
