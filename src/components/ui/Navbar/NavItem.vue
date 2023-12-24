<script setup lang="ts">
const props = defineProps<{
    href?: string;
    command?: () => void;
    class?: string;
    classActive?: string;
}>();
</script>

<template>
    <li
        :class="`
            text-center rounded d-flex px-2
            ${
                props.href
                    ? $route.fullPath.endsWith(props.href)
                        ? props.classActive ?? ''
                        : ''
                    : ''
            }
            ${props.class ?? ''}
            `"
        @click="props.command"
        style="list-style-type: none"
    >
        <template v-if="props.href">
            <NuxtLink
                class="text-decoration-none text-inherit w-100 h-100"
                :to="props.href"
            >
                <slot></slot>
            </NuxtLink>
        </template>
        <template v-else>
            <slot></slot>
        </template>
    </li>
</template>
