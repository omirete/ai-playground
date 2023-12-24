<script setup lang="ts">
import getImgSrc from "@/src/helpers/getImgSrc";
import type GeneratedImage from "@/src/types/GeneratedImage";

const props = defineProps<{
    images: GeneratedImage[];
    defaultImgId?: string;
    onClick?(img: GeneratedImage): void;
}>();

const activeImg = ref<GeneratedImage | undefined>(
    props.images.find((img) => img.id === props.defaultImgId),
);

watchEffect(() => {
    activeImg.value = props.images?.find(
        (img) => img.id === props.defaultImgId,
    );
});

const showPrompt = ref<boolean>(false);
const togglePrompt = () => {
    showPrompt.value = !showPrompt.value;
};
</script>

<template>
    <div
        class="d-flex flex-column align-items-center justify-content-center border rounded mb-2 flex-grow-1"
    >
        <div
            class="position-relative d-flex cursor-pointer"
            style="max-height: 40vh; max-width: 80vw"
            @click="togglePrompt"
        >
            <div
                :class="`
                    position-absolute
                    overflow-auto p-2 mx-2 rounded
                    bg-dark bg-opacity-75 text-white
                    ${showPrompt ? '' : 'd-none'}
                `"
            >
                <p class="m-0 lh-sm">
                    <!-- lh-sm = line height small -->
                </p>
            </div>
            <div
                class="d-flex flex-grow-1 align-items-center justify-content-center"
            >
                <img
                    v-if="activeImg"
                    :src="getImgSrc(activeImg.image)"
                    :alt="activeImg.prompt"
                    class="img-fluid mw-100 mh-100 rounded shadow"
                    style="width: 200px; height: 200px"
                />
                <div v-else>
                    <p class="text-muted">Nothing to show.</p>
                </div>
            </div>
        </div>

        <div
            class="mt-2 ps-1 d-flex flex-nowrap overflow-auto"
            style="max-width: calc((60px + 0.75rem) * 4 + 0.25rem)"
        >
            <div
                v-for="image in images"
                :class="`
                    p-1 rounded me-1
                    ${activeImg?.id === image.id ? 'bg-info' : 'bg-light-hover'}
                `"
            >
                <img
                    :src="getImgSrc(image.image)"
                    :alt="image.prompt"
                    class="rounded shadow-sm cursor-pointer"
                    style="width: 60px; height: auto"
                    @click="
                        () => {
                            if (props.onClick) props.onClick(image);
                        }
                    "
                />
            </div>
        </div>
    </div>
</template>
