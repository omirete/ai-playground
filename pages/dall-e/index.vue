<script setup lang="ts">
import { ref } from "vue";
import Textarea from "primevue/textarea";
import Button from "primevue/button";
import { PromptDALLEFields } from "~/models/PromptDALLE";
import { MetaFields } from "~/models";
import getImgSrc from "~/src/helpers/getImgSrc";
import GenerationsGallery from "~/src/components/GenerationsGallery/index.vue";

interface GeneratedImage {
    src: string;
    alt: string;
}

const prompt = ref<string>("");
const loading = ref<boolean>(false);
const loadingPreviousGenerations = ref<boolean>(false);
const images = ref<GeneratedImage[]>([]);
const imageIndex = ref<number>(0);
const previousGenerations = ref<(PromptDALLEFields & MetaFields)[]>([]);
const handleSubmit: (e: Event) => void = (e) => {
    e.preventDefault();
    loading.value = true;
    try {
        const form = e.target as HTMLFormElement;
        if (form) {
            const formData = new FormData(form);
            const prompt = formData.get("prompt")?.toString();
            if (prompt) {
                const params = new URLSearchParams({ prompt });
                fetch(`/api/dall-e?${params.toString()}`, { method: "POST" })
                    .then(async (res) => {
                        const data = await res.json();
                        images.value = data.images.map((i: string) => ({
                            src: getImgSrc(i),
                            alt: prompt,
                        }));
                        const now = new Date().toISOString();
                        data.images.forEach((img: string, i: number) => {
                            previousGenerations.value = [
                                {
                                    createdAt: now,
                                    id: `temp_${i}_${now}`,
                                    image: img,
                                    prompt,
                                    updatedAt: now,
                                },
                                ...previousGenerations.value,
                            ];
                        });
                    })
                    .finally(() => {
                        loading.value = false;
                    });
            } else {
                loading.value = false;
            }
        }
    } catch (error) {
        console.error(error);
        loading.value = false;
    }
};
const getPreviousGenerations: () => void = () => {
    loadingPreviousGenerations.value = true;
    try {
        fetch(`/api/dall-e`, { method: "GET" })
            .then(async (res) => {
                const data = await res.json();
                previousGenerations.value = (
                    data.prompts as (PromptDALLEFields & MetaFields)[]
                ).sort(
                    (a, b) =>
                        new Date(b.createdAt).valueOf() -
                        new Date(a.createdAt).valueOf()
                );
            })
            .finally(() => {
                loadingPreviousGenerations.value = false;
            });
    } catch (error) {
        console.error(error);
        loadingPreviousGenerations.value = false;
    }
};

const findPreviousImagesByPrompt = (prompt: string): GeneratedImage[] => {
    return previousGenerations.value
        .filter((p) => p.prompt === prompt)
        .map((p) => ({ src: getImgSrc(p.image), alt: prompt }));
};

watchEffect(() => {
    getPreviousGenerations();
});
const updatePrompt = (newPrompt: string, img_src?: string) => {
    prompt.value = newPrompt;
    images.value = findPreviousImagesByPrompt(newPrompt);
    if (img_src) {
        imageIndex.value = images.value.findIndex((i) => {
            return i.src === img_src;
        });
        console.log(imageIndex.value);
    }
};
</script>

<template>
    <div class="flex flex-1">
        <div class="col-12 sm:col-6 flex flex-column">
            <div class="card flex flex-column align-items-center flex-1">
                <template v-if="images.length > imageIndex">
                    <div>
                        <img
                            :src="images[imageIndex].src"
                            :alt="images[imageIndex].alt"
                            width="300"
                            height="300"
                            max-height="40%"
                            max-width="40%"
                            class="border-round shadow-2"
                        />
                    </div>
                    <div
                        class="flex gap-2 mt-2 p-2 border-1 surface-border border-round shadow-2"
                    >
                        <img
                            v-for="image in images"
                            :src="image.src"
                            :alt="image.alt"
                            width="50"
                            height="50"
                            class="cursor-pointer border-round shadow-1"
                            @click="() => updatePrompt(image.alt, image.src)"
                        />
                    </div>
                </template>
            </div>
            <form @submit="handleSubmit">
                <Textarea
                    name="prompt"
                    v-model="prompt"
                    rows="4"
                    placeholder="Your prompt"
                    class="block w-full"
                    required
                />
                <Button
                    type="submit"
                    :disabled="loading"
                    class="block mt-2 w-full"
                >
                    {{ !loading ? "Submit" : "Submitting..." }}
                </Button>
            </form>
        </div>
        <div
            class="col-6 flex-1 hidden sm:flex"
            style="max-height: calc(100vh - 5rem)"
        >
            <div
                class="border-1 border-round surface-border p-2 flex flex-column w-full h-full"
            >
                <h3
                    class="mt-0 mb-2 mx-0 px-3 py-2 surface-ground border-round"
                >
                    Previous generations
                </h3>
                <div class="flex-1 overflow-auto">
                    <GenerationsGallery
                        :imageGenerations="previousGenerations"
                        :onSelect="(generation: (PromptDALLEFields & MetaFields))=>{
                        updatePrompt(generation.prompt, getImgSrc(generation.image))
                    }"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
