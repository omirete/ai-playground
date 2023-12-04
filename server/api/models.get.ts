import responseWithStatus from "@/server/helpers/responseWithStatus";

export default defineEventHandler(async (event) => {
    const url = "https://api.openai.com/v1/models";
    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_SECRET}`,
        },
    });
    return responseWithStatus(event, {
        status: response.status,
        ...(await response.json()),
    });
});
