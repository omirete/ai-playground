export default defineEventHandler(async (event) => {
    const url = "https://api.openai.com/v1/models";
    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_SECRET}`,
        },
    });
    return await response.json();
});
