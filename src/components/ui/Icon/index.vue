<script setup lang="ts">
const props = defineProps<{ iconName: string; class?: string }>();
</script>

<template>
    <i :class="`bi bi-${props.iconName} ${props.class ?? ''}`"></i>
</template>
