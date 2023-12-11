module.exports = {
    apps: [
        {
            name: "ai-playground",
            port: "3000",
            exec_mode: "cluster",
            instances: "max",
            script: "./.output/server/index.mjs",
        },
    ],
};
