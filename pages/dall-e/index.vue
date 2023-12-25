<script setup lang="ts">
import PrivateSection from "@/src/components/PrivateSection/index.vue";

import GeneratedImagesContextProvider from "@/src/contexts/GeneratedImagesContextProvider/index.vue";

import Preview from "@/src/components/pages/dall-e/Preview.vue";
import DalleForm from "@/src/components/pages/dall-e/DalleForm.vue";
import GalleryPrevious from "@/src/components/pages/dall-e/GalleryPrevious.vue";
</script>

<template>
    <PrivateSection>
        <GeneratedImagesContextProvider>
            <div class="d-flex flex-column flex-md-row flex-grow-1">
                <div class="d-flex flex-column flex-grow-1">
                    <div class="d-flex flex-grow-1">
                        <Preview />
                    </div>
                    <div class="overflow-hidden">
                        <DalleForm />
                    </div>
                </div>
                <div class="col-md-5">
                    <GalleryPrevious />
                </div>
            </div>
        </GeneratedImagesContextProvider>
    </PrivateSection>
</template>
