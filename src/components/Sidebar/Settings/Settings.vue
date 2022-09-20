<script setup lang="ts">
import Header from "../Header.vue";
import Content from "../Content.vue";
import SettingsAccordion from "./SettingsAccordion.vue";
</script>

<template>
    <div>
        <Header>
            <template v-slot:title>Settings</template>
        </Header>

        <Content>
            <template v-slot:content>
                <SettingsAccordion />
            </template>
        </Content>
    </div>
</template>