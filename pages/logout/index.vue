<script setup lang="ts">
import clearToken from "@/src/helpers/token/clearToken";

onMounted(() => {
    clearToken();
    const router = useRouter();
    router.push("/login");
});
</script>

<template>
    <div>Logging out...</div>
</template>
