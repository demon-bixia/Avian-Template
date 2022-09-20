<script setup lang="ts">
import { defineProps } from "vue";
import { XMarkIcon } from "@heroicons/vue/24/solid";

const props = defineProps<{
    open: boolean,
    isList?: boolean,
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
                    <div class="w-[300px] bg-white rounded py-6">
                        <!--header-->
                        <div class="flex justify-between items-center mb-6 px-5">
                            <p class="text-black opacity-60 text-xl leading-4 tracking-[0.16px]">
                                <slot name="header"></slot>
                            </p>

                            <button @click="closeModal"
                                class="group p-2 border border-gray-200 text-black opacity-50 rounded-full text-sm  focus:outline-none focus:bg-red-100 hover:bg-red-100 hover:border-red-100 transition-all duration-200 outline-none">
                                <XMarkIcon class="w-5 h-5 group-hover:text-red-500" />
                            </button>
                        </div>

                        <!--Search-->
                        <slot name="search"></slot>

                        <!--content-->
                        <div class="overflow-y-scroll scrollbar scrollbar-hidden" :class="{'h-64': isList}">
                            <slot name="content"></slot>
                        </div>
                    </div>
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
    transform: scale(.95);
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
    transform: scale(.95);
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