<script setup lang="ts">
import { ref } from "vue";
import Textarea from "primevue/textarea";
import Button from "primevue/button";

const loading = ref<boolean>(false);
const prompt = ref<string>("");
const answer = ref<string>("");
const handleSubmit = (e: Event) => {
    e.preventDefault();
    loading.value = true;
    try {
        const form = e.target as HTMLFormElement;
        if (form) {
            const formData = new FormData(form);
            const prompt = formData.get("prompt")?.toString();
            if (prompt) {
                const params = new URLSearchParams({ prompt });
                fetch(`/api/chat?${params.toString()}`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                })
                    .then(async (res) => {
                        const data = await res.json();
                        answer.value = data.answer.content;
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
</script>

<template>
    <div class="flex">
        <form @submit="handleSubmit" class="col-6">
            <Textarea
                name="prompt"
                v-model="prompt"
                rows="4"
                placeholder="Your prompt"
                class="block w-full"
            />
            <Button type="submit" :disabled="loading" class="block mt-2 w-full">
                {{ !loading ? "Submit" : "Submitting..." }}
            </Button>
        </form>
        <div v-if="answer !== ''" class="col-6">
            <h3>Answer:</h3>
            <p>{{ answer }}</p>
        </div>
    </div>
</template>
