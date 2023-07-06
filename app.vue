<script setup lang="ts">
import "/node_modules/primeflex/primeflex.css";
// Primevue Theming
import "primeicons/primeicons.css";
import "primevue/resources/themes/lara-light-indigo/theme.css";
import "primevue/resources/primevue.min.css";

import { MenuItem } from "primevue/menuitem";
import TabMenu from "primevue/tabmenu";
import { PrimeIcons } from "primevue/api";

const items: MenuItem[] = [
    { label: "GPT3.5turbo", to: "/", icon: PrimeIcons.COMMENT },
    { label: "DALL-E", to: "/dall-e", icon: PrimeIcons.IMAGE },
];
</script>

<template>
    <div class="min-h-screen max-h-screen flex flex-column">
        <TabMenu :model="items" />
        <div class="px-3 py-2 flex-1 flex flex-column">
            <NuxtPage />
        </div>
    </div>
</template>

<style>
body {
    font-family: var(--font-family);
    padding: 0;
    margin: 0;
}
</style>
