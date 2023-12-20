<script setup lang="ts">
import updateToken from "@/src/helpers/token/updateToken";
import SubmitButton from "@/src/components/ui/SubmitButton/index.vue";
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
    <div class="d-flex justify-content-center align-items-center h-100">
        <form
            @submit="submitHandler"
            :class="`
                col-12 col-sm-10 col-md-6 col-lg-4
                border rounded shadow-sm p-2
                d-flex flex-column gap-2
                bg-white
            `"
        >
            <div class="d-flex flex-column gap-2">
                <label for="email">Email</label>
                <input
                    required
                    id="email"
                    type="text"
                    name="email"
                    class="form-control"
                    placeholder="Email"
                />
            </div>
            <div class="d-flex flex-column gap-2">
                <label for="password">Password</label>
                <input
                    required
                    id="password"
                    type="password"
                    name="password"
                    class="form-control"
                    placeholder="Password"
                />
            </div>
            <SubmitButton
                :loading="loading"
                text="Login"
                class="btn btn-primary mt-2"
            />
            <div v-if="loginError !== undefined" class="text-danger">
                {{ loginError }}
            </div>
        </form>
    </div>
</template>
