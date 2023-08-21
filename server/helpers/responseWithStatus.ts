import { H3Event } from "h3";

const responseWithStatus = (
    event: H3Event,
    data: Record<string, any> & { status: number }
) => {
    const { status, ...dataNoStatus } = data;
    setResponseStatus(event, status);
    return dataNoStatus;
};

export default responseWithStatus;
