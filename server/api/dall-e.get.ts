import PromptDALLE from "../../models/PromptDALLE";

export default defineEventHandler(async (event) => {
    const promptsDalle = await PromptDALLE.findAll();
    return {
        prompts: promptsDalle.map((p)=>p.dataValues),
    };
});
