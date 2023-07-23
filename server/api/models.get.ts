export default defineEventHandler(async (event) => {
    const url = "https://api.openai.com/v1/models";
    const response = await fetch(url, {
        headers: {
            Authorization:
                "Bearer ***REMOVED***",
        },
    });
    return await response.json();
});
