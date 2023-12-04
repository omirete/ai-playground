<script setup lang="ts">
import "/node_modules/primeflex/primeflex.css";
// Primevue Theming
import "primeicons/primeicons.css";
import "primevue/resources/themes/lara-light-indigo/theme.css";
import "primevue/resources/primevue.min.css";

import UserContextProvider from "@/src/components/UserContextProvider/index.vue";
import Navbar from "@/src/components/ui/Navbar/index.vue";
</script>

<template>
    <UserContextProvider>
        <div class="min-h-screen max-h-screen flex flex-column">
            <Navbar />
            <div class="px-3 py-2 flex-1 flex flex-column">
                <NuxtPage />
            </div>
        </div>
    </UserContextProvider>
</template>

<style>
body {
    font-family: var(--font-family);
    padding: 0;
    margin: 0;
}
</style>
