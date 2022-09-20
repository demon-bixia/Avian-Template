<script setup lang="ts">
import { EllipsisVerticalIcon } from "@heroicons/vue/24/outline";
import { defineProps } from 'vue';
import { ContactGroup } from "../../../stores/chat";
import { ref } from "vue";
import type { Ref } from "vue";
import { TrashIcon, InformationCircleIcon } from "@heroicons/vue/24/outline";


const props = defineProps<{
    contactGroups?: ContactGroup[],
    slim?: boolean,
}>();

const dropdownMenuStates: Ref<boolean[][] | undefined> = ref(props.contactGroups?.map((contactGroup) => {
    let group = contactGroup.contacts.map(() => false);
    return group;
}));

const toggleDropdown = (groupIndex: number, index: number) => {
    (dropdownMenuStates.value as boolean[][])[groupIndex][index] = !(dropdownMenuStates.value as boolean[][])[groupIndex][index];
};

const closeAllMenus = () => {
    dropdownMenuStates.value = props.contactGroups?.map((contactGroup) => {
        let group = contactGroup.contacts.map(() => false);
        return group;
    });
}
</script>

<template>
    <div v-for="(group, groupIndex) in props.contactGroups" :key="groupIndex">
        <!--group title-->
        <p :class="{'hidden': slim}"
            class="w-full px-5 pb-3 pt-5 opacity-50 text-xs leading-4 font-semibold tracking-[0.16px]">
            {{group.letter}}
        </p>

        <!--contacts-->
        <div v-for="(contact, index) in group.contacts" :key="index">
            <div class="w-full flex justify-between items-center" :class="{'p-5': !slim}">
                <a href="#" class="duration-200 transition ease-out"
                    :class="{'flex': slim, 'p-5': slim, 'w-full': slim, 'hover:bg-indigo-50': slim, 'active:bg-indigo-100': slim}">
                    <!--profile image-->
                    <div class="mr-4" :class="{'hidden': !slim}">
                        <div :style="{ backgroundImage: `url(${contact.avatar})`}"
                            class="w-7 h-7 rounded-full bg-cover bg-center">
                        </div>
                    </div>
                    <!--contact name-->
                    <div :class="{'flex': slim, 'flex-col': slim, 'flex-row': !slim, 'items-start': slim}">
                        <p href="#" :class="{'mb-2': slim}"
                            class="opacity-60 font-semibold text-sm leading-4 tracking-[0.16px]" tabindex="0">
                            {{contact.firstName + ' ' + contact.lastName}}
                        </p>

                        <p :class="{'hidden': !slim}"
                            class="opacity-60 font-normal text-sm leading-4 tracking-[0.16px]">Last seen 2:30 am
                        </p>
                    </div>
                </a>
                <div class="relative" :class="{'hidden': slim}">
                    <!--dropdown menu button-->
                    <button @click="() => toggleDropdown(groupIndex, index)" @blur="closeAllMenus"
                        class="rounded-full w-6 h-6 hover:bg-gray-100 flex justify-center items-center duration-200">
                        <EllipsisVerticalIcon class="h-5 w-5 text-black opacity-60" tabindex="0" />
                    </button>

                    <!--dropdown menu-->
                    <Transition name="scale">
                        <div v-show="(dropdownMenuStates as boolean[][])[groupIndex][index]"
                            class="absolute top-6 right-0 z-10 mt-2 w-56  rounded-sm bg-white shadow-lg ring-1 ring-gray-100 focus:outline-none"
                            role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                            <div class="py-1" role="none">
                                <a href="#"
                                    class=" border-b border-gray-200 text-black opacity-60 active:bg-gray-100 hover:bg-gray-50 duration-200 px-4 py-3 text-sm flex items-center"
                                    role="menuitem" tabindex="-1" id="menu-item-0">
                                    <InformationCircleIcon class="text-black opacity-60 h-5 w-5 mr-3" />
                                    Personal information
                                </a>

                                <a href="#"
                                    class=" text-red-500  active:bg-red-100 hover:bg-red-50 duration-200 px-4 py-3 text-sm flex items-center"
                                    role="menuitem" tabindex="-1" id="menu-item-1">
                                    <TrashIcon class="text-red-500  h-5 w-5 mr-3" />
                                    Delete contact
                                </a>
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.scale-enter-active {
    transition: all 0.100s ease-out;
}

.scale-leave-active {
    transition: all 0.075s ease-in;

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
</style>