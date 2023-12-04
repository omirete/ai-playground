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
        privateKey: ((process.env.PRIVATE_KEY as string) ?? "").replaceAll(
            "\\n",
            "\n"
        ),

        // Public keys that are exposed to the client
        public: {
            URL_IMG: process.env.URL_IMG,
            publicKey: ((process.env.PUBLIC_KEY as string) ?? "").replaceAll(
                "\\n",
                "\n"
            ),
        },
    },
    app: {
        head: {
            link: [
                { rel: "manifest", href: "manifest.json" },
                { rel: "icon", type: "image/jpeg", href: "favicon.jpeg" },
            ],
            title: "AI Playground",
            meta: [
                {
                    name: "description",
                    content: "A space to play around with AI tools.",
                },
            ],
        },
    },
});
