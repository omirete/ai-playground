<script setup lang="ts">
import type GeneratedImage from "@/src/types/GeneratedImage";
import GenerationItem from "./GenerationItem.vue";

const props = defineProps<{
    imageGenerations: GeneratedImage[];
    onSelect: (generation: GeneratedImage) => void;
}>();
</script>

<template>
    <div class="position-relative">
        <GenerationItem
            v-for="image in props.imageGenerations"
            :image="image"
            @click="() => props.onSelect(image)"
        />
    </div>
</template>
