<script setup lang="ts">
import Button from "primevue/button";
import ProgressSpinner from "primevue/progressspinner";
const { loading, text } = defineProps<{ loading: boolean; text: string }>();
</script>

<template>
    <Button type="submit" :disabled="loading">
        <div class="flex gap-2 align-items-center">
            <span>{{ text }}</span>
            <ProgressSpinner
                v-if="loading"
                style="height: 1em; width: 1em"
                stroke-width="10"
                aria-label="Loading"
            />
        </div>
    </Button>
</template>
