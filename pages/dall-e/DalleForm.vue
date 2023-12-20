<script setup lang="ts">
import SwitchButtons from "@/src/components/ui/SwitchButtons/index.vue";
import SubmitButton from "@/src/components/ui/SubmitButton/index.vue";
import { inject } from "vue";
import GeneratedImagesContext from "@/src/contexts/GeneratedImagesContextProvider/GeneratedImagesContext";
import getImgSrc from "@/src/helpers/getImgSrc";
const generatedImgsContext = inject(GeneratedImagesContext);

const prompt = ref<string | undefined>();
watchEffect(() => {
    prompt.value = generatedImgsContext?.value?.activeImg?.prompt;
});
const DEFAULT_MODEL = "dall-e-2";
const imageModels: { label: string; value: string }[] = [
    { label: "DALL-E 2", value: "dall-e-2" },
    { label: "DALL-E 3", value: "dall-e-3" },
];
const loading = ref<boolean>(false);
const handleSubmit: (payload: Event) => void = (e) => {
    e.preventDefault();
    loading.value = true;
    const form = e.target as HTMLFormElement;
    if (form) {
        const formData = new FormData(form);
        try {
            const prompt = formData.get("prompt")?.toString();
            const model = formData.get("model")?.toString();
            if (prompt) {
                const params = new URLSearchParams({ prompt });
                if (model) params.set("model", model);
                const token = localStorage ? localStorage.getItem("token") : "";
                fetch(`/api/dall-e?${params.toString()}`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then(async (res) => {
                        const data = await res.json();
                        const now = new Date().toISOString();
                        generatedImgsContext?.value?.addImages(
                            data.images.map((imgSrc: string, i: number) => ({
                                createdAt: now,
                                id: `temp_${i}_${now}`,
                                image: imgSrc,
                                prompt,
                                model: model ?? null,
                                updatedAt: now,
                                // Extra
                                src: getImgSrc(imgSrc),
                                alt: prompt,
                            }))
                        );
                        generatedImgsContext?.value?.setActiveImg(
                            `temp_0_${now}`
                        );
                    })
                    .finally(() => {
                        loading.value = false;
                    });
            } else {
                loading.value = false;
            }
        } catch (error) {
            console.error(error);
            loading.value = false;
        }
    } else {
        console.error("Could not parse form.");
    }
};
</script>
<template>
    <form @submit="handleSubmit" class="d-flex flex-column">
        <textarea
            name="prompt"
            v-model="prompt"
            rows="4"
            placeholder="Your prompt"
            class="form-control w-100"
            required
        ></textarea>
        <div class="d-flex flex-row">
            <SwitchButtons
                name="model"
                :options="imageModels"
                :defaultValue="
                    generatedImgsContext?.activeImg?.model ?? DEFAULT_MODEL
                "
                class="mt-2 mx-auto"
            />
            <SubmitButton
                :loading="loading"
                class="btn btn-success mt-2 col-4 ms-2"
                :text="loading ? 'Submitting' : 'Submit'"
            />
        </div>
    </form>
</template>
