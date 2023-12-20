<script setup lang="ts">
import UserContext from "@/src/contexts/UserContextProvider/UserContext";

const userContext = inject(UserContext);

watchEffect(() => {
    if (userContext && typeof window !== "undefined") {
        userContext.clearToken();
        const router = useRouter();
        router.push("/login");
    }
});
</script>

<template>
    <div>Logging out...</div>
</template>
