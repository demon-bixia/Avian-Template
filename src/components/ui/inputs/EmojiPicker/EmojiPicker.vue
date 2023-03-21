<script setup lang="ts">
import { ref } from "vue";
import Emojis from "@src/components/ui/inputs/EmojiPicker/Emojis.vue";
import EmojiSkinTones from "@src/components/ui/inputs/EmojiPicker/EmojiSkinTones.vue";
import EmojiTabs from "@src/components/ui/inputs/EmojiPicker/EmojiTabs.vue";
import SearchInput from "@src/components/ui/inputs/SearchInput.vue";

const props = defineProps<{
  show?: boolean;
}>();

// selected emoji groups
const activeTab = ref("people");

// search keyword
const keyword = ref("");

// (event) changes the selected emoji  group
const handleActiveTabChange = (tab: string) => {
  activeTab.value = tab;
};
</script>

<template>
  <div
    v-if="props.show"
    class="w-[300px] p-5 rounded-[16px] border shadow-xl shadow-outline bg-white dark:bg-gray-800 border-gray-50 dark:border-gray-700"
  >
    <!--Tabs-->
    <EmojiTabs
      class="w-full mb-5"
      :active="activeTab"
      @tab-change="handleActiveTabChange"
    />

    <!--Search-->
    <SearchInput class="w-full mb-5 rounded-[12px]" v-model="keyword" />

    <!--Emojis-->
    <Emojis :keyword="keyword" :active-tab="activeTab" class="w-full mb-5" />

    <!--Skin tones-->
    <EmojiSkinTones class="w-full" />
  </div>
</template>
