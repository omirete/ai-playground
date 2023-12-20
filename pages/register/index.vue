<script setup lang="ts">
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
    <div class="d-flex justify-content-center">
        <form
            @submit="submitHandler"
            :class="`
                col-12 col-sm-10 col-md-6 col-lg-4
                border-1 rounded shadow-sm surface-border
                d-flex flex-column gap-2
            `"
        >
            <div class="d-flex flex-column gap-2">
                <label for="name">Name</label>
                <input
                    required
                    id="name"
                    type="text"
                    name="name"
                    class="form-control"
                    placeholder="Name"
                />
            </div>
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
                    pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$"
                    title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                    minlength="8"
                />
            </div>
            <button type="submit" class="btn btn-primary">Register</button>
        </form>
    </div>
</template>
