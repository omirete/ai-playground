<script setup lang="ts">
import { provide, ref, onMounted } from "vue";
import GeneratedImagesContext, {
    type GeneratedImagesContextType,
} from "./GeneratedImagesContext";
import type GeneratedImage from "@/src/types/GeneratedImage";

const images = ref<GeneratedImage[]>([]);
const activeImg = ref<GeneratedImage>();
const setActiveImg = (id: string) => {
    activeImg.value = images.value.find((img) => img.id === id);
};

const setImages = (newImages: GeneratedImage[]) => {
    images.value = newImages;
};

const loading = ref<boolean>(true);
const getPreviousGenerations: () => void = () => {
    loading.value = true;
    const token = localStorage ? localStorage.getItem("token") : "";
    fetch(`/api/dall-e`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then(async (res) => {
            const data = await res.json();
            setImages(
                (data.prompts as GeneratedImage[])?.sort(
                    (a, b) =>
                        new Date(b.createdAt).valueOf() -
                        new Date(a.createdAt).valueOf(),
                ),
            );
        })
        .finally(() => {
            loading.value = false;
        })
        .catch((error) => {
            console.error(error);
            loading.value = false;
        });
};

onMounted(() => {
    getPreviousGenerations();
});

const addImages = (newImages: GeneratedImage[]) => {
    setImages([...newImages, ...images.value]);
};

const context = ref<GeneratedImagesContextType | undefined>();

watchEffect(() => {
    context.value = {
        images: images.value,
        setImages,
        addImages,
        activeImg: activeImg.value,
        setActiveImg,
        loading: loading.value,
    };
});

provide(GeneratedImagesContext, context);
</script>

<template>
    <slot></slot>
</template>
