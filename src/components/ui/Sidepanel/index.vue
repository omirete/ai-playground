<script setup lang="ts">
const props = defineProps<{ title?: string; show: boolean; toggle(): void }>();
</script>

<template>
    <div
        :class="`offcanvas offcanvas-start ${props.show ? 'show' : ''}`"
        tabindex="-1"
    >
        <div class="offcanvas-header">
            <h5
                v-if="props.title !== undefined"
                class="offcanvas-title"
                id="offcanvasExampleLabel"
            >
                {{ props.title }}
            </h5>
            <button
                type="button"
                class="btn-close"
                @click="props.toggle"
                aria-label="Close"
            ></button>
        </div>

        <div class="offcanvas-body">
            <slot></slot>
        </div>
    </div>
</template>
