<script setup lang="ts">
import { computed, ref } from "vue";

import GroupInfo from "@src/components/shared/modals/ComposeModal/GroupInfo.vue";
import GroupMembers from "@src/components/shared/modals/ComposeModal/GroupMembers.vue";
import SlideTransition from "@src/components/ui/transitions/SlideTransition.vue";

defineEmits(["activePageChange"]);

// used to determine whether to slide left or right
const animation = ref("slide-left");

// name of the active modal page
const activePageName = ref("group-info");

// the active page component
const ActivePage = computed(() => {
  if (activePageName.value === "group-info") return GroupInfo;
  else if (activePageName.value === "group-members") return GroupMembers;
});

// event to move between modal pages
const changeActiveTab = (event: { tabName: string; animationName: string }) => {
  animation.value = event.animationName;
  activePageName.value = event.tabName;
};
</script>

<template>
  <div>
    <!--content-->
    <div class="overflow-x-hidden">
      <SlideTransition :animation="animation">
        <component
          @active-page-change="changeActiveTab"
          :is="ActivePage"
          :key="activePageName"
        />
      </SlideTransition>
    </div>
  </div>
</template>
