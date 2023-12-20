<script setup lang="ts">
import UserContext from "@/src/contexts/UserContextProvider/UserContext";
import NavItem from "./NavItem.vue";
import Icon from "@/src/components/ui/Icon/index.vue";

const user = inject(UserContext);
const iconClasses = "text-info-hover text-white fs-3";
const iconClassesActive = "shadow bg-white-hover bg-info";
</script>

<template>
    <nav
        class="d-flex flex-row flex-sm-column px-2 py-2 align-items-center bg-secondary shadow-lg"
    >
        <a class="navbar-brand" href="#">
            <img
                src="/logo_144.jpeg"
                alt="App logo"
                width="40"
                height="40"
                class="rounded-circle"
            />
        </a>
        <ul
            class="flex-grow-1 m-0 mt-0 mt-sm-1 ms-1 ms-sm-0 p-0 w-100 d-flex flex-row flex-sm-column"
        >
            <NavItem
                href="chat"
                :class="iconClasses"
                :class-active="iconClassesActive"
            >
                <Icon iconName="chat-left-text" class="text-inherit" />
            </NavItem>
            <NavItem
                href="dall-e"
                :class="iconClasses"
                :class-active="iconClassesActive"
            >
                <Icon iconName="image" class="text-inherit" />
            </NavItem>
        </ul>
        <p
            v-if="user !== undefined"
            class="m-0 mb-sm-2 me-2 me-sm-0 rounded text-center w-sm-100 py-2 px-3 px-sm-0 bg-info text-white"
        >
            {{ user.name.substring(0, 1) }}
        </p>
        <a
            :href="user ? 'logout' : 'login'"
            class="w-sm-100 bg-primary text-white rounded py-2 px-3 px-sm-0"
        >
            <div
                class="d-flex flex-row flex-sm-column w-100 align-items-center justify-content-center"
            >
                <Icon
                    :iconName="user ? 'box-arrow-right' : 'box-arrow-in-right'"
                    class="text-inherit"
                />
            </div>
        </a>
    </nav>
</template>
