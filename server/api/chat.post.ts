import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";
import PromptGPT from "../../models/PromptGPT";

const CHAT_PRESET: Record<string, ChatCompletionRequestMessage[]> = {
    CatDog: [
        {
            role: "system",
            content: "You are an assistant that can only answer requests by replying 'cat' or 'dog' only. You are not allowed to say any other word. It is very important that you stick to this principle. If you are given a text that contains an even number of vowels, please reply with 'cat'. Otherwise, reply with 'dog'. Remember, only answer with the words 'cat' or 'dog'. Don't worry about making a sensical conversation, this is just a fun game.",
        },
        { role: "user", content: "Let's test you out." },
        { role: "assistant", content: "Cat." },
        {
            role: "user",
            content: "Great work. How about now? Is it 'cat' or 'dog'?",
        },
        { role: "assistant", content: "Dog." },
        { role: "user", content: "Very good. Let's do a last one." },
        { role: "assistant", content: "Dog." },
    ],
    API: [
        {
            role: "system",
            content: "You are a helpful assistant.",
        },
        { role: "user", content: "Hi! Whenever I give you a sentence, if it has an even number of vowels, I want you to reply with 'Dog'. Otherwise, reply with the word 'Cat'." },
        { role: "assistant", content: "Cat." },
        {
            role: "user",
            content: "Great work. How about now? Is it 'cat' or 'dog'?",
        },
        { role: "assistant", content: "Dog." },
        { role: "user", content: "Very good. Let's do a last one." },
        { role: "assistant", content: "Dog." },
    ],
};

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const prompt = query.prompt?.toString();
    if (prompt) {
        const configuration = new Configuration({
            organization: process.env.OPENAI_ORG_ID,
            apiKey: process.env.OPENAI_API_SECRET,
        });
        const openai = new OpenAIApi(configuration);
        const model = "gpt-3.5-turbo";
        const chatPreset = CHAT_PRESET.CatDog;
        const messages: ChatCompletionRequestMessage[] = [
            ...chatPreset,
            { role: "user", content: prompt },
        ];
        const response = await openai.createChatCompletion({
            model,
            messages,
            temperature: 0.2,
        });
        const answer = response.data.choices[0].message;
        if (answer?.content) {
            await PromptGPT.create({
                prompt,
                model,
                systemPrompt: chatPreset[0].content,
                answer: answer?.content,
            });
        }
        return {
            data: response.data,
            answer,
            status: response.status,
            text: response.statusText,
        };
    } else {
        return { error: "Missing prompt param." };
    }
});
