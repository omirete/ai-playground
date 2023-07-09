<script setup lang="ts">
import UserContext from "~/src/contexts/UserContext";
const user = inject(UserContext);
const router = useRouter();
const { onUnauthorized } = defineProps<{
    onUnauthorized?: "message" | "redirect" | "hide";
}>();
watchEffect(() => {
    if (user?.value === undefined && onUnauthorized === "redirect") {
        // redirect to login
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
