<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
    open: boolean,
    closeModal: () => void,
}>();

const closeOnClick = (event: Event) => {
    if ((event.target as HTMLDivElement).id === 'close-modal') {
        props.closeModal();
    }
};
</script>

<template>
    <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <!--overlay-->
        <Transition name="fade">
            <div v-show="props.open" class="fixed inset-0 bg-black bg-opacity-60 transition-opacity">
            </div>
        </Transition>

        <Transition name="scale">
            <!--modal-->
            <div @click="closeOnClick" v-show="props.open" class="fixed inset-0 z-10 overflow-y-auto">
                <div id="close-modal"
                    class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <!--content-->
                    <slot name="content"></slot>
                </div>
            </div>
        </Transition>
    </div>
</template>

<style scoped>
.scale-enter-active {
    transition: all 0.200s ease-out;
}

.scale-leave-active {
    transition: all 0.050s ease-in;

}

.scale-enter-from {
    opacity: 0;
    transform: scale(.75);
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
    transform: scale(.85);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.100s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>