<script setup lang="ts">
import UserContext from "@/src/contexts/UserContextProvider/UserContext";
import type UserType from "@/src/types/UserType";
const { onUnauthorized } = defineProps<{
    onUnauthorized?: "message" | "redirect" | "hide";
}>();
const userContext = inject(UserContext);

const user = ref<UserType | undefined>();
watchEffect(() => {
    user.value = userContext?.user.value;
});

onMounted(() => {
    if (user.value === undefined && onUnauthorized === "redirect") {
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
            <NuxtLink to="/login" class="p-button p-component">Log in</NuxtLink>
        </div>
    </template>
</template>
