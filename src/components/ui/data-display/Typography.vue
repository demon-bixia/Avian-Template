<script setup lang="ts">
import { twMerge } from "tailwind-merge";
import { computed } from "vue";

const props = defineProps<{
  variant?: string;
  noColor?: boolean;
  class?: any;
  customStyle?: string;
}>();

const style = computed(() => {
  // heading texts
  if (props.variant && props.variant.includes("heading")) {
    if (props.variant === "heading-1") {
      return props.noColor
        ? "text-xl leading-4 tracking-[.01rem]"
        : "text-black opacity-60 dark:text-white text-xl leading-4 tracking-[.01rem]";
    }

    if (props.variant === "heading-2") {
      return props.noColor
        ? "outline-none text-sm font-semibold leading-4 tracking-[.01rem]"
        : "outline-none text-sm text-black opacity-60 dark:text-white dark:opacity-70 font-semibold leading-4 tracking-[.01rem]";
    }

    if (props.variant === "heading-3") {
      return props.noColor
        ? "outline-none text-xs font-semibold leading-4 tracking-[.01rem]"
        : "outline-none text-xs text-black opacity-50 dark:text-white dark:opacity-70 font-semibold leading-4 tracking-[.01rem]";
    }

    if (props.variant === "heading-4") {
      return props.noColor
        ? "outline-none text-3xl leading-9 tracking-[.01rem]"
        : "outline-none text-3xl text-black opacity-50 dark:text-white dark:opacity-70 leading-9 tracking-[.01rem]";
    }
  }

  // body texts
  else if (props.variant && props.variant.includes("body")) {
    if (props.variant === "body-1") {
      return props.noColor
        ? "outline-none text-xs font-light leading-4 tracking-[.01rem]"
        : "outline-none text-xs text-black opacity-60 dark:text-white dark:opacity-70 font-light leading-4 tracking-[.01rem]";
    } else if (props.variant === "body-2") {
      return props.noColor
        ? "outline-none text-sm font-normal leading-4 tracking-[.01rem]"
        : "outline-none text-sm text-black opacity-60 dark:text-white dark:opacity-70 font-normal leading-4 tracking-[.01rem]";
    } else if (props.variant === "body-3") {
      return props.noColor
        ? "outline-none text-sm font-light leading-5 tracking-[.01rem]"
        : "outline-none text-sm font-light text-black opacity-60 dark:text-white dark:opacity-70 leading-5 tracking-[.01rem]";
    } else if (props.variant === "body-4") {
      return props.noColor
        ? "outline-none text-xs font-light leading-4 tracking-[.01rem]"
        : "outline-none text-xs font-light text-black opacity-60 dark:text-white dark:opacity-70 leading-4 tracking-[.01rem]";
    } else if (props.variant === "body-5") {
      return props.noColor
        ? "outline-none text-[1rem] font-light leading-4 tracking-[.01rem]"
        : "outline-none text-[1rem] font-light text-black opacity-60 dark:text-white dark:opacity-70 leading-4 tracking-[.01rem]";
    }
  }

  // display texts
  else if (props.variant && props.variant === "display") {
    return props.noColor
      ? "outline-none font-display text-[1.75rem] leading-[2.125rem] tracking-[0rem]"
      : "outline-none font-display text-[1.75rem] text-black opacity-60 dark:text-white dark:opacity-70 leading-[2.125rem] tracking-[0rem]";
  }

  // buttons texts
  else if (props.variant && props.variant?.includes("button")) {
    if (props.variant === "button-1") {
      return props.noColor
        ? "text-sm font-semibold leading-4 tracking-[.01rem]"
        : "text-sm font-semibold text-white leading-4 tracking-[.01rem]";
    } else if (props.variant === "button-2") {
      return props.noColor
        ? "text-sm leading-4 tracking-[.01rem] font-semibold"
        : `text-sm leading-4 tracking-[.01rem] font-semibold opacity-60 group-hover:text-white group-hover:opacity-100
                group-focus:text-white group-focus:opacity-100 dark:text-white dark:opacity-70`;
    } else if (props.variant === "button-3") {
      return props.noColor
        ? "text-sm leading-4 tracking-[.01rem]"
        : "text-sm leading-4 tracking-[.01rem] text-black opacity-60 dark:text-white dark:opacity-70";
    } else if (props.variant === "button-4") {
      return props.noColor
        ? "text-sm leading-4 tracking-[.01rem]"
        : "text-sm leading-4 tracking-[.01rem] text-red-400 dark:group-hover:text-white";
    }
  }

  // default to body-1
  else {
    return props.noColor
      ? "outline-none text-xs font-light leading-4 tracking-[.01rem]"
      : "outline-none text-xs text-black opacity-60 dark:text-white dark:opacity-70 font-light leading-4 tracking-[.01rem]";
  }
});

const textStyle = twMerge(style.value, props.customStyle, props.class);
</script>

<template>
  <p :class="textStyle">
    <slot></slot>
  </p>
</template>
