import PromptGPT from "../../models/PromptGPT";

export default defineEventHandler(async (event) => {
    const promptsGPT = await PromptGPT.findAll();
    return {
        prompts: promptsGPT.map((p) => p.dataValues),
    };
});
