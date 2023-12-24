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
