<script setup lang="ts">
const props = defineProps<{ loading: boolean; text: string }>();
</script>

<template>
    <button type="submit" :disabled="props.loading">
        <span>{{ props.text }}</span>
        <span
            v-if="props.loading"
            class="spinner-border spinner-border-sm ms-1"
            role="status"
        ></span>
    </button>
</template>
