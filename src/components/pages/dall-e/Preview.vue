<script setup lang="ts">
import Gallery from "@/src/components/ui/Gallery/index.vue";
import type GeneratedImage from "@/src/types/GeneratedImage";
import { inject, watchEffect } from "vue";
import GeneratedImagesContext from "@/src/contexts/GeneratedImagesContextProvider/GeneratedImagesContext";
const generatedImgsContext = inject(GeneratedImagesContext);

const imgs = ref<GeneratedImage[]>([]);
const activeId = ref<string | undefined>();
const activePrompt = ref<string | undefined>();

watchEffect(() => {
    activeId.value = generatedImgsContext?.value?.activeImg?.id;
    activePrompt.value = generatedImgsContext?.value?.activeImg?.prompt;
    imgs.value = generatedImgsContext?.value?.images ?? [];
});
</script>

<template>
    <Gallery
        :images="imgs.filter((image) => image.prompt === activePrompt)"
        :default-img-id="activeId"
        :on-click="
            (newImage: GeneratedImage) => {
                generatedImgsContext?.setActiveImg(newImage.id);
            }
        "
    />
</template>
