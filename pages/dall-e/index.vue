<script setup lang="ts">
import PrivateSection from "@/src/components/PrivateSection/index.vue";

import GeneratedImagesContextProvider from "@/src/contexts/GeneratedImagesContextProvider/index.vue";

import Preview from "./Preview.vue";
import DalleForm from "./DalleForm.vue";
import GalleryPrevious from "./GalleryPrevious.vue";
</script>

<template>
    <PrivateSection>
        <GeneratedImagesContextProvider>
            <div class="d-flex flex-grow-1 flex-column flex-sm-row">
                <div class="d-flex flex-column col-12 col-sm-7 flex-grow-1">
                    <div
                        class="d-flex flex-column flex-grow-1 align-items-center justify-content-center w-100 mb-2 border rounded"
                    >
                        <Preview />
                    </div>
                    <DalleForm />
                </div>
                <GalleryPrevious />
            </div>
        </GeneratedImagesContextProvider>
    </PrivateSection>
</template>
