import type { MetaFields } from "@/models";
import type { PromptDALLEFields } from "@/models/PromptDALLE";

type GeneratedImage = PromptDALLEFields &
    MetaFields & {
        // src: string;
        // alt: string;
    };

export default GeneratedImage;
