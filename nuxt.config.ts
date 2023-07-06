// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: [
        "primevue/resources/themes/saga-blue/theme.css",
        "primevue/resources/primevue.css",
        "primeicons/primeicons.css",
        "primeflex/primeflex.css",
    ],
    build: {
        transpile: ["primevue"],
    },
    devtools: { enabled: true },
    runtimeConfig: {
        // Private keys are only available on the server
        // apiSecret: '123',

        // Public keys that are exposed to the client
        public: {
            URL_IMG: process.env.URL_IMG,
        },
    },
});
