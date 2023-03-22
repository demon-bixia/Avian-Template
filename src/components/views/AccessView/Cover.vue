<script setup lang="ts">
import Typography from "@src/components/ui/data-display/Typography.vue";
import cloudPatternPath from "@src/assets/images/clouds.png";
import blurPath from "@src/assets/images/blur.png";
</script>

<template>
  <div
    class="py-[50px] px-[50px] h-full basis-1/2 md:flex xs:hidden items-center justify-center"
  >
    <div
      class="w-full h-full px-7 flex items-center bg-no-repeat bg-center bg-cover rounded-[12px]"
      :style="{ 'background-image': `url(${cloudPatternPath})` }"
    >
      <div
        class="px-9 py-[60px] rounded-[5px] bg-cover bg-no-repeat"
        :style="{ 'background-image': `url(${blurPath})` }"
      >
        <Typography variant="display" class="mb-5 text-white" no-color
          >Blazingly fast messaging platform for the
          <span class="text-gradient">web.</span>
        </Typography>
        <Typography variant="body-3" class="text-white" no-color
          >Avian saves all the data in user’s devices and uses a cryptographic
          protocols to sync the data across multiple browsers and devices.
        </Typography>
      </div>
    </div>
  </div>
</template>

<!-- Add this custom CSS to your project -->
<style scoped>
.text-gradient {
  background: -webkit-linear-gradient(left top, #de6dce, #e7ddee);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
