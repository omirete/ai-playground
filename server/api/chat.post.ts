import OpenAI from "openai";
import PromptGPT from "@/models/PromptGPT";
import authenticateRequest from "@/server/helpers/authenticateRequest";
import responseWithStatus from "@/server/helpers/responseWithStatus";
import { authErrorUnauthorized } from "@/server/errors";

const CHAT_PRESET: Record<string, OpenAI.ChatCompletionMessageParam[]> = {
    CatDog: [
        {
            role: "system",
            content:
                "You are backend server that receives a string and returns a json object that shows for each character how many times they were used in the string received. For example, if you receive the message 'Hello, I am Jim', you must respond with '{h: 1, e: 1, l: 2, o: 1, i: 2, a: 1, m: 2, j: 1, m: 2}'. Do not answer like this was a conversation, only answer with a json object as you have just been advised.",
        },
        { role: "user", content: "Let's test you out." },
        {
            role: "assistant",
            content: "{l: 1, e: 2, t: 4, s: 2, y: 1, o: 2, u: 2}",
        },
    ],
    API: [
        {
            role: "system",
            content: "You are a helpful assistant.",
        },
    ],
};

export default defineEventHandler(async (event) => {
    const user = authenticateRequest(getHeader(event, "Authorization"));
    if (user) {
        const query = getQuery(event);
        const prompt = query.prompt?.toString();
        if (prompt) {
            const openai = new OpenAI({
                organization: process.env.OPENAI_ORG_ID,
                apiKey: process.env.OPENAI_API_SECRET,
            });
            const model = "gpt-3.5-turbo";
            const chatPreset = CHAT_PRESET.API;
            const messages: OpenAI.ChatCompletionMessageParam[] = [
                ...chatPreset,
                { role: "user", content: prompt },
            ];
            const response = await openai.chat.completions.create({
                model,
                messages,
                temperature: 0.2,
            });
            const answer = response.choices[0].message;
            if (answer?.content) {
                const systemPrompt = chatPreset[0].content as string;
                await PromptGPT.create({
                    userId: user.id,
                    prompt,
                    model,
                    systemPrompt,
                    answer: answer?.content,
                });
            }
            return responseWithStatus(event, {
                data: response,
                answer,
                status: response.choices.length > 0 ? 200 : 500,
            });
        } else {
            return responseWithStatus(event, {
                status: 400,
                error: "Missing prompt param.",
            });
        }
    } else {
        return responseWithStatus(event, authErrorUnauthorized);
    }
});
