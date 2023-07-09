<script setup lang="ts">
import InputText from "primevue/inputtext";
import Button from "primevue/button";
const submitHandler = (e: Event): void => {
    e.preventDefault();
    const form = e.target;
    if (form) {
        const formData = new FormData(form as HTMLFormElement);
        const email = formData.get("email")?.toString();
        const name = formData.get("name")?.toString();
        const password = formData.get("password")?.toString();
        if (email && password) {
            fetch("auth/register", {
                method: "POST",
                body: JSON.stringify({
                    email,
                    name,
                    password,
                }),
            })
                .then(async (res) => {
                    if (res.status === 201) {
                        alert("User created successfully. Please log in now.");
                    } else {
                        alert(await res.text());
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
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
                <label for="name">Name</label>
                <InputText
                    required
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Name"
                />
            </div>
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
                    pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$"
                    title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                    minlength="8"
                />
            </div>
            <Button type="submit">Register</Button>
        </form>
    </div>
</template>
