<template>
  <Transition name="collapse">
    <slot></slot>
  </Transition>
</template>

<style scoped>
.collapse-enter-active {
  animation: collapse reverse 300ms ease;
}

.collapse-leave-active {
  animation: collapse 300ms ease;
}

@keyframes collapse {
  100% {
    max-height: 0px;
    opacity: 0;
  }

  50% {
    max-height: 400px;
  }

  0% {
    opacity: 1;
  }
}
</style>
