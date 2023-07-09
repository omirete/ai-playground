<script setup lang="ts">
import { PromptDALLEFields } from "~/models/PromptDALLE";
import { MetaFields } from "~/models";
import getImgSrc from "~/src/helpers/getImgSrc";

export type Generation = Omit<PromptDALLEFields & MetaFields, "userId">;

const { imageGenerations, onSelect } = defineProps<{
    imageGenerations: Generation[];
    onSelect: (generation: Generation) => void;
}>();
</script>

<template>
    <div
        v-for="item in imageGenerations"
        class="flex align-items-start p-3 gap-4 hover:surface-100 cursor-pointer"
        @click="() => onSelect(item)"
    >
        <img
            class="shadow-2 block border-round"
            :src="getImgSrc(item.image)"
            :alt="item.prompt"
            width="80"
            height="80"
            loading="lazy"
        />
        <div class="flex-1 flex flex-column gap-3">
            <div class="text-900">
                {{ item.prompt }}
            </div>
            <div class="flex align-items-center gap-2">
                <i class="pi pi-calendar"></i>
                <span class="">{{
                    new Date(item.createdAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })
                }}</span>
            </div>
        </div>
    </div>
</template>
