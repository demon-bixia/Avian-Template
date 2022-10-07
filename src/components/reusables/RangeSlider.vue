<script setup lang="ts">
import type { Ref } from "vue";
import { defineProps, ref } from "vue";

const emit = defineEmits(['update:modelValue']);

const props = defineProps<{
    initialValue?: number,
    self?: boolean
}>();

const thumb: Ref<HTMLElement | undefined> = ref();

const slider: Ref<HTMLElement | undefined> = ref();

const fill: Ref<HTMLElement | undefined> = ref();

const shiftX = ref();

const modelValue: Ref<number> = ref((props.initialValue) || 0);

// check if thumb is out of boundaries and move it to the location
const moveThumb = (location: number) => {
    // the pointer is out of slider => lock the thumb within the bounaries
    if (location < 0) {
        location = 0;
    }

    let rightEdge = (slider.value as HTMLElement).offsetWidth;
    // the pointer is out of slider => lock the thumb within the bounaries
    if (location > rightEdge) {
        location = rightEdge;
    }

    (thumb.value as HTMLElement).style.left = location + 'px';
    (fill.value as HTMLElement).style.width = location + 'px';

    modelValue.value = (location / (slider.value as HTMLElement).clientWidth) * 100;

    emit('update:modelValue', modelValue.value);
};

// start the drag event
const handleDrag = (event: MouseEvent) => {
    shiftX.value = event.clientX - (thumb.value as HTMLElement).getBoundingClientRect().left;

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
};

// move slider when moving the mouse
const handleMouseMove = (event: MouseEvent) => {
    let newLeft = event.clientX - shiftX.value - (slider.value as HTMLElement).getBoundingClientRect().left;

    moveThumb(newLeft);
};

// remove the drag event
const handleMouseUp = () => {
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('mousemove', handleMouseMove);
}
</script>

<template>
    <div class="flex w-full m-auto items-center justify-center">
        <div class="relative min-w-full py-1">
            <!--track-->
            <div @mouseup="event => moveThumb(event.offsetX)" ref="slider"
                class="h-2 rounded-full cursor-pointer bg-gray-200">

                <!--blue fill-->
                <div ref="fill" class="absolute h-2 w-0 rounded-full transition-all duration-100"
                    :class="props.self ? ['bg-white'] : ['bg-indigo-300']"
                    :style="{'width': props.initialValue?.toString() || '100%'}"> </div>

                <!--dragable thumb-->
                <div ref="thumb" @mousedown.prevent="handleDrag"
                    class="absolute top-[-1px] h-4 w-4 -ml-2 flex items-center justify-center border rounded-full cursor-pointer active:scale-110 focus:scale-110 transition-all duration-100"
                    :class="props.self ? ['bg-white', 'border-white', 'hover:bg-gray-50', 'foucs:bg-gray-50', 'active:bg-gray-50'] : ['bg-indigo-300', 'border-indigo-300', 'hover:bg-indigo-400', 'foucs:bg-indigo-400', 'active:bg-indigo-400']"
                    unselectable="on" onselectstart="return false;"
                    :style="{'left': props.initialValue?.toString() || '100%'}">
                    <div class="relative -mt-2 w-1">
                        <div class="absolute z-40 bottom-100 left-0 min-w-full mb-2 opacity-100"
                            style="margin-left: -20.5px;">
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
