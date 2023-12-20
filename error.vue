<script setup lang="ts">
import Icon from "@/src/components/ui/Icon/index.vue";

interface ErrorType {
    url: string;
    statusCode: number;
    statusMessage: string;
    message: string;
    stack: any;
}

const props = defineProps<{
    error: ErrorType;
}>();
</script>

<template>
    <template v-if="props.error.statusCode === 404">
        <div
            class="d-flex flex-column w-100 vh-100 align-items-center justify-content-center"
        >
            <div class="d-flex flex-column flex-sm-row align-items-center">
                <img
                    src="/404.jpeg"
                    alt="Creative design for a 404 error, featuring a zepelling flying over giant 404 numbers which float above the clouds."
                    width="150"
                    height="150"
                    class="rounded"
                />
                <div class="mt-2 mt-sm-0 ms-0 ms-sm-2">
                    <h3 class="text-muted">Error 404</h3>
                    <h2>Ups, that didn't work.</h2>
                    <p>{{ props.error?.statusMessage }}</p>
                </div>
            </div>
            <NuxtLink
                to="/"
                class="text-center text-decoration-none btn btn-link text-secondary"
                >Go back home. <Icon icon-name="house"
            /></NuxtLink>
        </div>
    </template>
</template>
