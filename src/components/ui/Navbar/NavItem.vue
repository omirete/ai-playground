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
            text-center rounded
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
            <a
                class="text-decoration-none px-2 text-inherit"
                aria-current="page"
                :href="props.href"
                ><slot></slot>
            </a>
        </template>
        <template v-else>
            <slot></slot>
        </template>
    </li>
</template>
