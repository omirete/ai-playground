<script setup lang="ts">
import { inject } from "vue";
import GenerationsGallery from "@/src/components/GenerationsGallery/index.vue";
import type GeneratedImage from "@/src/types/GeneratedImage";
import GeneratedImagesContext from "@/src/contexts/GeneratedImagesContextProvider/GeneratedImagesContext";
import Sidepanel from "@/src/components/ui/Sidepanel/index.vue";
const generatedImgsContext = inject(GeneratedImagesContext);
const showPreviousGenerations = ref<boolean>(false);
const togglePreviousGenerations = () => {
    showPreviousGenerations.value = !showPreviousGenerations.value;
};
const hidePreviousGenerations = () => {
    showPreviousGenerations.value = false;
};
</script>

<template>
    <div class="d-none d-md-flex ps-2" style="max-height: calc(100vh - 1rem)">
        <div class="border-1 rounded border p-2 d-flex flex-column w-100">
            <h4 class="mt-0 mb-2 mx-0 p-0 rounded">Previous generations</h4>
            <div class="flex-grow-1 overflow-auto">
                <GenerationsGallery
                    :imageGenerations="generatedImgsContext?.images ?? []"
                    :on-select="
                        (image: GeneratedImage) => {
                            generatedImgsContext?.setActiveImg(image.id);
                        }
                    "
                />
            </div>
        </div>
    </div>
    <button
        severity="warning"
        @click="togglePreviousGenerations"
        class="d-md-none form-control btn btn-info mt-2"
    >
        See previous generations
    </button>
    <Sidepanel
        title="Previous generations"
        :show="showPreviousGenerations"
        :toggle="togglePreviousGenerations"
    >
        <GenerationsGallery
            :imageGenerations="generatedImgsContext?.images ?? []"
            :onSelect="
                (image: GeneratedImage) => {
                    generatedImgsContext?.setActiveImg(image.id);
                    hidePreviousGenerations();
                }
            "
        />
    </Sidepanel>
</template>
