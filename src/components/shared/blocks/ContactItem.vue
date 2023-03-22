<script setup lang="ts">
import type { IContact, IUser } from "@src/types";

import useStore from "@src/store/store";
import { getFullName } from "@src/utils";

import Typography from "@src/components/ui/data-display/Typography.vue";

defineEmits(["contactSelected"]);

const props = defineProps<{
  contact: IContact;
  variant?: string;
  active?: boolean;
  unselectable?: boolean;
}>();

const store = useStore();
</script>

<template>
  <div>
    <component
      :is="props.variant === 'card' ? 'div' : 'a'"
      @click="
        props.variant === 'card'
          ? () => {}
          : $emit('contactSelected', props.contact)
      "
      href="#"
      class="w-full p-5 flex transition duration-200 ease-out outline-none"
      :class="{
        'hover:bg-indigo-50 active:bg-indigo-100 focus:bg-indigo-50 dark:hover:bg-gray-600 dark:focus:bg-gray-600':
          props.variant !== 'card',
        'bg-indigo-50 dark:bg-gray-600': props.active,
      }"
    >
      <!--profile image-->
      <div class="mr-4">
        <div
          :style="{ backgroundImage: `url(${props.contact.avatar})` }"
          class="w-7 h-7 rounded-full bg-cover bg-center"
        ></div>
      </div>

      <div class="w-full flex flex-col items-start">
        <div class="w-full mb-3 flex justify-between items-center">
          <!--contact name-->
          <component
            :is="props.variant === 'card' && !props.unselectable ? 'a' : 'div'"
            @click="
              props.variant === 'card'
                ? $emit('contactSelected', props.contact)
                : () => {}
            "
            href="#"
            class="flex items-center"
          >
            <Typography variant="heading-2">
              {{
                store.user && store.user.id === props.contact.id
                  ? "You"
                  : getFullName(props.contact)
              }}
            </Typography>

            <slot name="tag" />
          </component>

          <!--optional menu-->
          <div class="relative">
            <slot name="menu" />
          </div>
        </div>

        <!--contact last seen-->
        <Typography variant="body-2"> Last seen 2:30 am </Typography>
      </div>

      <div class="h-full flex flex-col justify-center items-center">
        <slot name="checkbox"></slot>
      </div>
    </component>
  </div>
</template>
