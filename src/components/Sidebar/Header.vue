<template>
    <div class="w-full min-h-[80px] max-h-fit px-5 py-6 flex justify-between items-center">
        <p class="opacity-60 text-xl leading-4 tracking-[0.16px]">
            <slot name="title"></slot>
        </p>
        <div>
            <slot name="actions"></slot>
        </div>
    </div>
</template>