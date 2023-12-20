<script setup lang="ts">
import { provide, ref, onMounted, watchEffect } from "vue";
import getUserFromToken from "./helpers/getUserFromToken";
import type UserType from "@/src/types/UserType";
import UserContext from "./UserContext";

const token = ref<string | null>(null);
const user = ref<UserType | undefined>();
const loggedIn = ref<boolean>(false);

const handleTokenUpdated = () => {
    token.value = localStorage.getItem("token");
};

onMounted(() => {
    token.value = localStorage.getItem("token");
});

watchEffect(() => {
    user.value = getUserFromToken(token.value);
    loggedIn.value = user.value !== undefined;
});

provide(UserContext, user);
</script>

<template>
    <slot></slot>
</template>
