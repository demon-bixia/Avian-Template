<script setup lang="ts">
import IconButton from "@src/components/ui/inputs/IconButton.vue";
import {
  FaceSmileIcon,
  FireIcon,
  CakeIcon,
  FlagIcon,
  RocketLaunchIcon,
  GlobeAsiaAustraliaIcon,
  LightBulbIcon,
} from "@heroicons/vue/24/outline";

const props = defineProps<{
  active: string;
}>();
</script>

<template>
  <div class="flex justify-between">
    <!--people-->
    <div
      class="pb-[5px] border-b transition-colors duration-200"
      :class="[
        props.active === 'people'
          ? 'border-indigo-400 rounded-1'
          : 'border-transparent',
      ]"
    >
      <IconButton
        @click="$emit('tab-change', 'people')"
        variant="ghost"
        title="people and smiles"
        aria-label="people and smiles"
      >
        <FaceSmileIcon
          class="w-5 h-5 transition-colors duration-200"
          :class="[
            props.active === 'people'
              ? ['text-indigo-400 dark:text-indigo-400']
              : ['text-gray-500 dark:text-white dark:opacity-60'],
          ]"
        />
      </IconButton>
    </div>

    <!--nature-->
    <div
      class="pb-[5px] border-b transition-colors duration-200"
      :class="[
        props.active === 'nature'
          ? 'border-indigo-400 rounded-1'
          : 'border-transparent',
      ]"
    >
      <IconButton
        title="nature"
        aria-label="nature"
        @click="$emit('tab-change', 'nature')"
        variant="ghost"
      >
        <FireIcon
          class="w-5 h-5 transition-colors duration-200"
          :class="[
            props.active === 'nature'
              ? ['text-indigo-400 dark:text-indigo-400']
              : ['text-gray-500 dark:text-white dark:opacity-60'],
          ]"
        />
      </IconButton>
    </div>

    <!--food-->
    <div
      class="pb-[5px] border-b transition-colors duration-200"
      :class="[
        props.active === 'food'
          ? 'border-indigo-400 rounded-1'
          : 'border-transparent',
      ]"
    >
      <IconButton
        title="food"
        aria-label="food"
        @click="$emit('tab-change', 'food')"
        variant="ghost"
      >
        <CakeIcon
          class="w-5 h-5 transition-colors duration-200"
          :class="[
            props.active === 'food'
              ? ['text-indigo-400 dark:text-indigo-400']
              : ['text-gray-500 dark:text-white dark:opacity-60'],
          ]"
        />
      </IconButton>
    </div>

    <!--activity-->
    <div
      class="pb-[5px] border-b transition-colors duration-200"
      :class="[
        props.active === 'activity'
          ? 'border-indigo-400 rounded-1'
          : 'border-transparent',
      ]"
    >
      <IconButton
        @click="$emit('tab-change', 'activity')"
        variant="ghost"
        title="activities and sports"
        aria-label="activities and sports"
      >
        <RocketLaunchIcon
          class="w-5 h-5 transition-colors duration-200"
          :class="[
            props.active === 'activity'
              ? ['text-indigo-400 dark:text-indigo-400']
              : ['text-gray-500 dark:text-white dark:opacity-60'],
          ]"
        />
      </IconButton>
    </div>

    <!--objects-->
    <div
      class="pb-[5px] border-b transition-colors duration-200"
      :class="[
        props.active === 'objects'
          ? 'border-indigo-400 rounded-1'
          : 'border-transparent',
      ]"
    >
      <IconButton @click="$emit('tab-change', 'objects')" variant="ghost">
        <LightBulbIcon
          class="w-5 h-5 transition-colors duration-200"
          :class="[
            props.active === 'objects'
              ? ['text-indigo-400 dark:text-indigo-400']
              : ['text-gray-500 dark:text-white dark:opacity-60'],
          ]"
        />
      </IconButton>
    </div>

    <!--travel-->
    <div
      class="pb-[5px] border-b transition-colors duration-200"
      :class="[
        props.active === 'travel'
          ? 'border-indigo-400 rounded-1'
          : 'border-transparent',
      ]"
    >
      <IconButton
        @click="$emit('tab-change', 'travel')"
        variant="ghost"
        title="travel"
        aria-label="travel"
      >
        <GlobeAsiaAustraliaIcon
          class="w-5 h-5 transition-colors duration-200"
          :class="[
            props.active === 'travel'
              ? ['text-indigo-400 dark:text-indigo-400']
              : ['text-gray-500 dark:text-white dark:opacity-60'],
          ]"
        />
      </IconButton>
    </div>

    <!--flags-->
    <div
      class="pb-[5px] border-b transition-colors duration-200"
      :class="[
        props.active === 'flags'
          ? 'border-indigo-400 rounded-1'
          : 'border-transparent',
      ]"
    >
      <IconButton
        title="flags"
        aria-label="flags"
        @click="$emit('tab-change', 'flags')"
        variant="ghost"
      >
        <FlagIcon
          class="w-5 h-5 transition-colors duration-200"
          :class="[
            props.active === 'flags'
              ? ['text-indigo-400 dark:text-indigo-400']
              : ['text-gray-500 dark:text-white dark:opacity-60'],
          ]"
        />
      </IconButton>
    </div>
  </div>
</template>
