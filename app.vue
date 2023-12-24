<script setup lang="ts">
import "./custom.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
// Primevue Theming

import UserContextProvider from "@/src/contexts/UserContextProvider/index.vue";
import Navbar from "@/src/components/ui/Navbar/index.vue";
</script>

<template>
    <UserContextProvider>
        <div class="d-flex min-vh-100 min-vw-100 flex-column flex-sm-row">
            <Navbar />
            <div class="p-2 d-flex flex-column flex-grow-1">
                <NuxtPage />
            </div>
        </div>
    </UserContextProvider>
</template>

<style>
body {
}
</style>
