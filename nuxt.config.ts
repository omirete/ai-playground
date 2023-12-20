// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: [
        // "/node_modules/primeflex/primeflex.css",
        // "primeicons/primeicons.css",
        // "primevue/resources/themes/saga-blue/theme.css",
        // "primevue/resources/primevue.min.css",
        "~/node_modules/bootstrap/dist/css/bootstrap.min.css",
    ],
    build: {
        // transpile: ["primevue"],
    },
    // plugins: [
    //     {
    //         src: "~/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js",
    //         mode: "client",
    //     },
    // ],
    devtools: { enabled: true },
    runtimeConfig: {
        // Private keys are only available on the server
        // apiSecret: '123',
        privateKey: ((process.env.PRIVATE_KEY as string) ?? "").replaceAll(
            "\\n",
            "\n",
        ),

        // Public keys that are exposed to the client
        public: {
            IMG_BASE_URL: process.env.IMG_BASE_URL,
            publicKey: ((process.env.PUBLIC_KEY as string) ?? "").replaceAll(
                "\\n",
                "\n",
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
    telemetry: {
        enabled: false,
    },
});
