<script setup lang="ts">
// import "./node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./custom.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
// Primevue Theming

import UserContextProvider from "@/src/contexts/UserContextProvider/index.vue";
import Navbar from "@/src/components/ui/Navbar/index.vue";
</script>

<template>
    <UserContextProvider>
        <div class="d-flex vh-100 flex-column flex-sm-row">
            <Navbar />
            <div class="px-3 py-2 d-flex flex-column flex-grow-1">
                <NuxtPage />
            </div>
        </div>
    </UserContextProvider>
</template>

<style>
body {
}
</style>
