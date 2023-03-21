<script setup lang="ts">
import { ref } from "vue";
import FadeTransition from "@src/components/ui/transitions/FadeTransition.vue";
import useStore from "@src/store/store";
import Typography from "@src/components/ui/data-display/Typography.vue";

const store = useStore();
const select = ref(false);

const skinToneColor: any = {
  "1f3ff": "bg-[#60463A]",
  "1f3fe": "bg-[#A86637]",
  "1f3fd": "bg-[#C88E62]",
  "1f3fc": "bg-[#FFDFBD]",
  neutral: "bg-[#FFD225]",
};

// (event) change the skin tone of the emojis
const handleChangeSkinTone = (tone: string) => {
  select.value = false;
  store.emojiSkinTone = tone;
};
</script>

<template>
  <div class="w-full h-[20px] flex justify-between items-center">
    <!--list of tones-->
    <div>
      <FadeTransition>
        <div v-if="select" class="h-5 max-h-fit">
          <button
            class="w-6 h-5 bg-[#60463A] hover:scale-110 duration-200 ease-in"
            @click="handleChangeSkinTone('1f3ff')"
          ></button>
          <button
            class="w-6 h-5 bg-[#A86637] hover:scale-110 duration-200 ease-in"
            @click="handleChangeSkinTone('1f3fe')"
          ></button>
          <button
            class="w-6 h-5 bg-[#C88E62] hover:scale-110 duration-200 ease-in"
            @click="handleChangeSkinTone('1f3fd')"
          ></button>
          <button
            class="w-6 h-5 bg-[#FFDFBD] hover:scale-110 duration-200 ease-in"
            @click="handleChangeSkinTone('1f3fc')"
          ></button>
          <button
            class="w-6 h-5 bg-[#FFD225] hover:scale-110 duration-200 ease-in"
            @click="handleChangeSkinTone('neutral')"
          ></button>
        </div>
      </FadeTransition>
    </div>

    <!--active tone-->
    <div class="flex items-center">
      <Typography variant="body-2">Skin tone:</Typography>
      <button
        @click="select = !select"
        class="w-5 h-5 ml-3 rounded-full hover:scale-110 duration-200 ease-in"
        :class="[skinToneColor[store.emojiSkinTone]]"
      ></button>
    </div>
  </div>
</template>
