<script setup lang="ts">
import { ref } from "vue";
import PrivateSection from "@/src/components/PrivateSection/index.vue";

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
                            "token",
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
    <PrivateSection>
        <div class="d-flex flex-wrap">
            <form @submit="handleSubmit" class="col-12 col-sm-6">
                <textarea
                    name="prompt"
                    v-model="prompt"
                    rows="4"
                    placeholder="Your prompt"
                    class="form-control w-100"
                />
                <button
                    type="submit"
                    :disabled="loading"
                    class="btn btn-primary mt-2 w-100"
                >
                    {{ !loading ? "Submit" : "Submitting..." }}
                </button>
            </form>
            <div v-if="answer !== ''" class="col-12 col-sm-6">
                <h3>Answer:</h3>
                <p>{{ answer }}</p>
            </div>
        </div>
    </PrivateSection>
</template>
