<script setup lang="ts">
const props = defineProps<{
    loading: boolean;
    text: string;
    type?: "button" | "submit" | "reset";
    class?: string;
}>();
</script>

<template>
    <button
        :type="props.type"
        :disabled="props.loading"
        :class="`text-nowrap ${props.class ?? ''}`"
    >
        <span>{{ props.text }}</span>
        <span
            v-if="props.loading"
            class="spinner-border spinner-border-sm ms-1"
            role="status"
        ></span>
    </button>
</template>
