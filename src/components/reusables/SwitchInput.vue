<script setup lang="ts">
import Typography from "./Typography.vue";

const emit = defineEmits(['switchClicked']);

const props = defineProps<{
    id?: string
    label?: string
    value: boolean
    description?: string,
    small?: boolean,
}>();


// (event) toggle the switch when pressing enter
const handleToggleSwitchOnEnter = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
        emit('switchClicked', !props.value);
    }
};
</script>
    
<template>
    <div :class="props.small ? []: ['w-full', 'flex']">
        <div class="flex flex-col w-full">
            <div class="flex">
                <!--input label-->
                <div v-if="props.label" :class="{'grow': props.label}">
                    <label v-if="props.label" :for="id" class="inline-block mb-4 outline-none" tabindex="0">
                        <Typography variant="heading-2" class="w-13">
                            {{props.label}}
                        </Typography>
                    </label>
                </div>

                <!--switch-->
                <div role="switch" :aria-checked="!!props.value"
                    :aria-label="'Switch ' + (props.value ? 'checked' : 'not checked')"
                    @click="$emit('switchClicked', !props.value)" @keydown="handleToggleSwitchOnEnter"
                    class="relative flex select-none outline-none transition-all duration-200 ease-in" tabindex="0">

                    <input :checked="props.value" :id="id" type="checkbox" :name="label" class="absolute block w-5 h-5 rounded-full bg-white scale-[0.6] 
                    appearance-none cursor-pointer foucs:outline-none transition-all duration-300"
                        :class="{'right-0': value}" tabindex="-1" />

                    <label :for="id" class="block w-7 h-5 rounded-full outline-none cursor-pointer"
                        :class="{'bg-indigo-400': value, 'bg-gray-300 dark:bg-gray-600': !value}" tabindex="-1">
                    </label>
                </div>
            </div>

            <!--description or help text-->
            <Typography variant="body-2" class="help-block outline-none" tabindex="0">{{props.description}}</Typography>
        </div>
    </div>
</template>