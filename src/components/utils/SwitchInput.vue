<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import Typography from "../utils/Typography.vue";

defineEmits(['switchClicked']);

const props = defineProps<{
    id?: string
    label?: string
    value: boolean
    description?: string,
    small?: boolean,
}>();
</script>
    
<template>
    <div :class="props.small ? []: ['w-full', 'flex']">
        <div class="flex flex-col w-full">
            <div class="flex">
                <!--input label-->
                <div v-if="props.label" :class="{'grow': props.label}">
                    <label v-if="props.label" :for="id" class="inline-block mb-4">
                        <Typography variant="heading-2" class="w-13">
                            {{props.label}}
                        </Typography>
                    </label>
                </div>

                <!--switch-->
                <div @click="$emit('switchClicked', !props.value)"
                    class="relative flex select-none transition-all duration-200 ease-in">
                    <input :checked="props.value" :id="id" type="checkbox" :name="label" class="absolute block w-5 h-5 rounded-full bg-white scale-[0.6]
                   appearance-none cursor-pointer foucs:outline-none transition-all duration-300"
                        :class="{'right-0': value}" />

                    <label :for="id" class="block w-7 h-5 rounded-full cursor-pointer"
                        :class="{'bg-indigo-400': value, 'bg-gray-300': !value}">
                    </label>
                </div>
            </div>

            <!--description or help text-->
            <Typography variant="body-2" class="help-block">{{props.description}}</Typography>
        </div>
    </div>
</template>