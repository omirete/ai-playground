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
    env: {
        "OPENAI_ORG_ID": process.env.OPENAI_ORG_ID,
        "OPENAI_API_SECRET": process.env.OPENAI_API_SECRET,
        "DB_CONNECTION_STRING": process.env.DB_CONNECTION_STRING,
        "IMG_SAVE_DIR": process.env.IMG_SAVE_DIR,
        "IMG_BASE_URL": process.env.IMG_BASE_URL,
        "PRIVATE_KEY": process.env.PRIVATE_KEY,
        "PUBLIC_KEY": process.env.PUBLIC_KEY
    }
};
