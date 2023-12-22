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
        class="d-flex flex-column p-2 align-items-center justify-content-center"
    >
        <div
            class="position-relative cursor-pointer"
            style="max-height: 40vh; max-width: 80vw"
            @click="togglePrompt"
        >
            <div
                :class="`
                    position-absolute mw-100 mh-100
                    overflow-auto p-2 rounded
                    bg-dark bg-opacity-75 text-white
                    ${showPrompt ? '' : 'd-none'}
                `"
            >
                <p class="m-0 lh-sm">
                    <small>{{
                        activeImg?.revisedPrompt ?? activeImg?.prompt
                    }}</small>
                </p>
                <button type="button" @click=""></button>
            </div>
            <img
                v-if="activeImg"
                :src="getImgSrc(activeImg.image)"
                :alt="activeImg.prompt"
                class="mw-100 mh-100 rounded shadow"
            />
            <div v-else>
                <p class="text-muted">Nothing to show.</p>
            </div>
        </div>
        <div
            :class="`
                d-flex flex-wrap
                mt-3
            `"
        >
            <div
                v-for="(image, i) in images"
                :class="`
                rounded p-1
                ${
                    activeImg?.id === image.id
                        ? 'bg-info mx-1'
                        : 'bg-light-hover'
                }
            `"
            >
                <img
                    :src="getImgSrc(image.image)"
                    :alt="image.prompt"
                    style="max-height: 55px; max-width: 55px"
                    :class="`
                        rounded shadow
                        p-0
                        cursor-pointer
                    `"
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
