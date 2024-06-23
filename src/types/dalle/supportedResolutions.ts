import type { DalleModels } from "./models";

export type AllSupportedResolutions =
    | "256x256"
    | "512x512"
    | "1024x1024"
    | "1792x1024"
    | "1024x1792";

export const supportedResolutions: Record<
    DalleModels,
    AllSupportedResolutions[]
> = {
    "dall-e-2": ["256x256", "512x512", "1024x1024"],
    "dall-e-3": ["1024x1024", "1792x1024", "1024x1792"],
};
