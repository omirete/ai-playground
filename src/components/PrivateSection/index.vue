<script setup lang="ts">
import UserContext from "@/src/contexts/UserContextProvider/UserContext";
const user = inject(UserContext);
const { onUnauthorized } = defineProps<{
    onUnauthorized?: "message" | "redirect" | "hide";
}>();
onMounted(() => {
    if (user?.value === undefined && onUnauthorized === "redirect") {
        // redirect to login
        const router = useRouter();
        router.push("/login");
    }
});
</script>

<template>
    <slot v-if="user !== undefined"></slot>
    <template v-else>
        <div
            v-if="onUnauthorized === 'message' || onUnauthorized === undefined"
        >
            You are not authorized to view this content. Please
            <a href="/login" class="p-button p-component">Log in</a>
        </div>
    </template>
</template>
