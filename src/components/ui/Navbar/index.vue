<script setup lang="ts">
import { MenuItem } from "primevue/menuitem";
import TabMenu from "primevue/tabmenu";
import { PrimeIcons } from "primevue/api";
import UserContext from "~/src/contexts/UserContext";

const user = inject(UserContext);
const baseItems: MenuItem[] = [
    { label: "Home", to: "/", icon: PrimeIcons.HOME },
    { label: "GPT3.5turbo", to: "/chat", icon: PrimeIcons.COMMENT },
    { label: "DALL-E", to: "/dall-e", icon: PrimeIcons.IMAGE },
];
const items = ref<MenuItem[]>(baseItems);
watchEffect(() => {
    if (user?.value !== undefined) {
        items.value = [
            ...baseItems,
            {
                label: "Logout",
                to: "/logout",
                icon: PrimeIcons.SIGN_OUT,
                visible: user?.value !== undefined,
            },
        ];
    } else {
        items.value = [
            ...baseItems,
            {
                label: "Login",
                to: "/login",
                icon: PrimeIcons.SIGN_IN,
                visible: user?.value === undefined,
            },
        ];
    }
});
</script>

<template>
    <TabMenu :model="items" class="block" style="min-height: 4rem" />
</template>
