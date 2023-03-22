<script setup lang="ts">
import type { Ref } from "vue";
import type { IEmoji } from "@src/types";

import { watch, ref, onMounted } from "vue";
import useStore from "@src/store/store";
import { unicodeToEmoji } from "@src/utils";

import emojis from "@src/components/ui/inputs/EmojiPicker/emojis.json";
import ScrollBox from "@src/components/ui/utils/ScrollBox.vue";
import IconButton from "@src/components/ui/inputs/IconButton.vue";
import Typography from "@src/components/ui/data-display/Typography.vue";

interface IEmojiGroups {
  people: IEmoji[];
  nature: IEmoji[];
  food: IEmoji[];
  activity: IEmoji[];
  travel: IEmoji[];
  objects: IEmoji[];
  symbols: IEmoji[];
  flags: IEmoji[];
}

type EmojiGroupNames =
  | "people"
  | "nature"
  | "food"
  | "activity"
  | "objects"
  | "travel"
  | "flags";

const props = defineProps<{
  keyword: string;
  activeTab: string;
}>();

const store = useStore();

const loading = ref(true);

// emojis filtered by skintone and keyword
const filteredEmojis: Ref<IEmojiGroups> = ref(emojis);

// Search for the emojis.
const filterEmojis = () => {
  const _emojiGroups = {} as IEmojiGroups;

  // search emojis
  Object.keys(emojis).forEach((key) => {
    const _emojis: IEmoji[] = [];
    if (key === props.activeTab) {
      (emojis as IEmojiGroups)[key as EmojiGroupNames].forEach((emoji) => {
        // if search key match
        if (emoji["n"][0].includes(props.keyword.toLocaleLowerCase())) {
          let result = emoji.u;
          // check skin tone
          if (store.emojiSkinTone !== "neutral" && Array.isArray(emoji.v)) {
            const v_index =
              emoji.v?.findIndex((v) => v.includes(store.emojiSkinTone)) || -1;
            if (v_index !== -1 && emoji.v) {
              // @ts-ignore
              result = emoji.v[v_index];
            }
          }
          return _emojis.push({ ...emoji, r: result });
        }
      });

      // save filtered group to _emojiGroups
      if (_emojis.length) {
        _emojiGroups[key as EmojiGroupNames] = _emojis;
      }
    }
  });
  return _emojiGroups;
};

// (watcher) change the filtered emojis when the search keyword change
watch(
  () => [props.keyword, props.activeTab, store.emojiSkinTone],
  async () => {
    filteredEmojis.value = filterEmojis();
  }
);

// when mounting the component filter the emojis
onMounted(() => {
  filteredEmojis.value = filterEmojis();
});
</script>

<template>
  <ScrollBox class="w-full max-h-[274px] overflow-y-scroll">
    <div v-for="[name, group] in Object.entries(filteredEmojis)" class="mb-6">
      <!--Group title-->
      <Typography variant="heading-2" class="mb-4 dark:text-white"
        >{{ name }}
      </Typography>
      <div class="flex flex-wrap justify-start">
        <!--Emojis-->
        <div v-for="emoji in group">
          <IconButton
            v-if="emoji && emoji.r"
            class="w-[30px] h-[30px] mr-1"
            :title="emoji.n[0]"
            :aria-label="emoji.n[0]"
          >
            {{ unicodeToEmoji(emoji.r) }}
          </IconButton>
        </div>
      </div>
    </div>
  </ScrollBox>
</template>
