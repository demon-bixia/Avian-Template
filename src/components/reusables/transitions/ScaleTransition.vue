<template>
  <Transition name="scale">
    <slot></slot>
  </Transition>
</template>

<style scoped>
.scale-enter-active {
  transition: all 0.1s ease-out;
}

.scale-leave-active {
  transition: all 0.075s ease-in;
}

.scale-enter-from {
  opacity: 0;
  transform: scale(0.95);
}

.scale-enter-to {
  opacity: 1;
  transform: scale(1);
}

.scale-leave-from {
  opacity: 1;
  transform: scale(1);
}

.scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
