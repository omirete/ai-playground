<script setup lang="ts">
import type { MenuItem } from "primevue/menuitem";
import TabMenu from "primevue/tabmenu";
import Sidebar from "primevue/sidebar";
import Menu from "primevue/menu";
import { PrimeIcons } from "primevue/api";
import UserContext from "@/src/contexts/UserContext";

const showSidebar = ref<boolean>(false);
const toggleSidebar = () => {
    showSidebar.value = !showSidebar.value;
};
const hideSidebar = () => {
    showSidebar.value = false;
};
const user = inject(UserContext);
const baseItems: MenuItem[] = [
    { label: "Home", to: "/", icon: PrimeIcons.HOME, command: hideSidebar },
    {
        label: "GPT3.5turbo",
        to: "/chat",
        icon: PrimeIcons.COMMENT,
        command: hideSidebar,
    },
    {
        label: "DALL-E",
        to: "/dall-e",
        icon: PrimeIcons.IMAGE,
        command: hideSidebar,
    },
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
                command: hideSidebar,
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
                command: hideSidebar,
            },
        ];
    }
});
</script>

<template>
    <template class="hidden sm:block">
        <TabMenu :model="items" class="block" style="min-height: 4rem" />
    </template>
    <template class="block sm:hidden">
        <TabMenu
            :model="[{ icon: PrimeIcons.BARS, command: toggleSidebar }]"
            class="block"
            style="min-height: 4rem"
        />
        <Sidebar v-model:visible="showSidebar">
            <Menu :model="items" class="border-0" />
        </Sidebar>
    </template>
</template>
