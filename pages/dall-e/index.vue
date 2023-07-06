<script setup lang="ts">
import { ref } from "vue";
import Textarea from "primevue/textarea";
import Button from "primevue/button";
import Galleria from "primevue/galleria";
import OrderList from "primevue/orderlist";
import { PromptDALLEFields } from "~/models/PromptDALLE";
import { MetaFields } from "~/models";

const prompt = ref<string>("");
const loading = ref<boolean>(false);
const loadingPreviousGenerations = ref<boolean>(false);
const images = ref<{ src: string; alt: string }[]>([]);
const previousGenerations = ref<(PromptDALLEFields & MetaFields)[]>([]);
const config = useRuntimeConfig();
const baseUrlImages = config.public.URL_IMG;
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
                            src: i,
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
watchEffect(() => {
    getPreviousGenerations();
});
const updatePrompt = (newPrompt: string, img?: string) => {
    console.log("a");
    prompt.value = newPrompt;
    console.log("b");
    if (img) {
        console.log("c");
        images.value = [{ src: img, alt: newPrompt }];
    }
    console.log("d");
};
</script>

<template>
    <div class="flex flex-1">
        <div class="col-6 flex flex-column">
            <div class="card md:flex md:justify-content-center flex-1">
                <Galleria
                    :value="images"
                    :numVisible="5"
                    containerStyle="max-width: 640px"
                    :responsiveOptions="[
                        {
                            breakpoint: '991px',
                            numVisible: 4,
                        },
                        {
                            breakpoint: '767px',
                            numVisible: 3,
                        },
                        {
                            breakpoint: '575px',
                            numVisible: 1,
                        },
                    ]"
                >
                    <template #item="slotProps">
                        <img
                            :src="slotProps.item.src"
                            :alt="slotProps.item.alt"
                            style="width: 100%"
                        />
                    </template>
                    <template #thumbnail="slotProps">
                        <img
                            :src="slotProps.item.src"
                            :alt="slotProps.item.alt"
                            width="70"
                            height="70"
                        />
                    </template>
                </Galleria>
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
        <div class="col-6 flex flex-column">
            <OrderList
                v-model="previousGenerations"
                dataKey="id"
                @update:selection="
                    (p) =>
                        updatePrompt(
                            p[0].prompt,
                            `${baseUrlImages}/${p[0].image}`
                        )
                "
                :listProps="{ style: 'max-height:calc(100vh - 60px - 6rem)' }"
                :pt="{ controls: { style: 'display:none' } }"
                
            >
                <template #header>Recent generations</template>
                <template #item="slotProps">
                    <div class="flex-1">
                        <div class="flex align-items-start p-4 gap-4">
                            <img
                                class="shadow-2 block border-round"
                                :src="
                                    slotProps.item.image.startsWith('data:')
                                        ? slotProps.item.image
                                        : `${baseUrlImages}/${slotProps.item.image}`
                                "
                                :alt="slotProps.item.prompt"
                                width="80"
                                height="80"
                                loading="lazy"
                            />
                            <div class="flex-1 flex flex-column gap-3">
                                <div class="text-900">
                                    {{ slotProps.item.prompt }}
                                </div>
                                <div class="flex align-items-center gap-2">
                                    <i class="pi pi-calendar"></i>
                                    <span class="">{{
                                        new Date(
                                            slotProps.item.createdAt
                                        ).toLocaleDateString(undefined, {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })
                                    }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </OrderList>
        </div>
    </div>
</template>
