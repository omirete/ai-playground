<script setup lang="ts">
import SwitchButtons from "@/src/components/ui/SwitchButtons/index.vue";
import SubmitButton from "@/src/components/ui/SubmitButton/index.vue";
import { inject } from "vue";
import GeneratedImagesContext from "@/src/contexts/GeneratedImagesContextProvider/GeneratedImagesContext";
import type { DallEPostReturn } from "@/server/api/dall-e.post";
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
const loadingVariations = ref<boolean>(false);

const handleCreate: (payload: Event) => void = (e) => {
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
                        const responseJson: DallEPostReturn = await res.json();
                        const now = new Date().toISOString();
                        generatedImgsContext?.value?.addImages(
                            responseJson.data,
                        );
                        generatedImgsContext?.value?.setActiveImg(
                            responseJson.data[0].id,
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
        loading.value = false;
    }
};
const handleVariation: () => void = () => {
    loadingVariations.value = true;
    const originalImg = generatedImgsContext?.value?.activeImg;
    if (originalImg) {
        const promptId = originalImg.id;
        try {
            const params = new URLSearchParams({ promptId });
            const model = "dall-e-2"; // Only dall-e-2 supported for now.
            if (model) params.set("model", model);
            const token = localStorage ? localStorage.getItem("token") : "";
            fetch(`/api/dall-e/variations?${params.toString()}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(async (res) => {
                    const responseJson: DallEPostReturn = await res.json();
                    generatedImgsContext?.value?.addImages(responseJson.data);
                    generatedImgsContext?.value?.setActiveImg(
                        responseJson.data[0].id,
                    );
                })
                .finally(() => {
                    loadingVariations.value = false;
                });
        } catch (error) {
            console.error(error);
            loadingVariations.value = false;
        }
    } else {
        console.error("Could not parse form.");
        loadingVariations.value = false;
    }
};
</script>
<template>
    <form @submit="handleCreate" class="">
        <textarea
            name="prompt"
            v-model="prompt"
            rows="3"
            placeholder="Your prompt"
            class="form-control"
            required
        ></textarea>
        <div class="row mt-2 gx-2">
            <div class="col-12 col-sm-6 mb-2 mb-sm-0">
                <SwitchButtons
                    name="model"
                    :options="imageModels"
                    :defaultValue="
                        generatedImgsContext?.activeImg?.model ?? DEFAULT_MODEL
                    "
                />
            </div>
            <div class="col-6 col-sm-3">
                <SubmitButton
                    :loading="loading"
                    class="btn btn-success form-control"
                    :text="loading ? 'Submitting' : 'Submit'"
                />
            </div>
            <div class="col-6 col-sm-3">
                <SubmitButton
                    type="button"
                    class="btn btn-warning form-control"
                    :text="loadingVariations ? 'Variating' : 'Variation'"
                    :loading="loadingVariations"
                    @click="handleVariation"
                />
            </div>
        </div>
    </form>
</template>
