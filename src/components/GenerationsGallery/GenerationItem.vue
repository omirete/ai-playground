<script setup lang="ts">
import getImgSrc from "@/src/helpers/getImgSrc";
import Icon from "@/src/components/ui/Icon/index.vue";
import type GeneratedImage from "@/src/types/GeneratedImage";

const props = defineProps<{ image: GeneratedImage }>();
</script>

<template>
    <div
        class="d-flex align-items-start p-1 m-0 mt-2 me-2 bg-light-hover rounded cursor-pointer"
    >
        <img
            class="shadow-sm rounded"
            :src="getImgSrc(props.image.image)"
            :alt="props.image.prompt"
            width="80"
            height="80"
            loading="lazy"
        />
        <div class="flex-grow-1 d-flex flex-column ms-2">
            <div class="text-dark">
                {{ props.image.prompt }}
            </div>
            <div class="d-flex align-items-center text-black-50">
                <Icon icon-name="calendar" />
                <span class="ms-1">{{
                    new Date(props.image.createdAt).toLocaleDateString(
                        undefined,
                        {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                        },
                    )
                }}</span>
                <Icon icon-name="box" class="ms-2" />
                <span class="ms-1">{{ props.image.model }}</span>
            </div>
        </div>
    </div>
</template>
