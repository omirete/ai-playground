<script setup lang="ts">
import InputText from "primevue/inputtext";
import InlineMessage from "primevue/inlinemessage";
import updateToken from "~/src/helpers/token/updateToken";
import SubmitButton from "~/src/components/ui/SubmitButton/index.vue";
const router = useRouter();

const loading = ref<boolean>(false);
const loginError = ref<string | undefined>(undefined);

const submitHandler = (e: Event): void => {
    e.preventDefault();
    const form = e.target;
    if (form) {
        loading.value = true;
        const formData = new FormData(form as HTMLFormElement);
        const email = formData.get("email")?.toString();
        const password = formData.get("password")?.toString();
        if (email && password) {
            fetch("auth/login", {
                method: "POST",
                body: JSON.stringify({
                    email,
                    password,
                }),
            })
                .then(async (res) => {
                    if (res.status === 200) {
                        const token = (await res.json()).token;
                        updateToken(token);
                        router.push("/");
                    } else {
                        loginError.value = (await res.json()).text;
                    }
                })
                .catch((error) => {
                    console.error(error);
                })
                .finally(() => {
                    loading.value = false;
                });
        } else {
            loading.value = false;
        }
    }
};
</script>

<template>
    <div class="flex justify-content-center">
        <form
            @submit="submitHandler"
            :class="`
                col-12 sm:col-10 md:col-6 lg:col-4
                border-1 border-round shadow-1 surface-border
                flex flex-column gap-2
            `"
        >
            <div class="flex flex-column gap-2">
                <label for="email">Email</label>
                <InputText
                    required
                    id="email"
                    type="text"
                    name="email"
                    placeholder="Email"
                />
            </div>
            <div class="flex flex-column gap-2">
                <label for="password">Password</label>
                <InputText
                    required
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Password"
                />
            </div>
            <SubmitButton :loading="loading" text="Login" />
            <InlineMessage v-if="loginError !== undefined" severity="error">
                {{ loginError }}
            </InlineMessage>
        </form>
    </div>
</template>
