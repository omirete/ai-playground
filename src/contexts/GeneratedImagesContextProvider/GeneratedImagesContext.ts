import type GeneratedImage from "@/src/types/GeneratedImage";
import type { InjectionKey } from "vue";

export interface GeneratedImagesContextType {
    images: GeneratedImage[];
    setImages(newImages: GeneratedImage[]): void;
    addImages(newImages: GeneratedImage[]): void;
    activeImg: GeneratedImage | undefined;
    setActiveImg(id: string): void;
    loading: boolean;
}

const GeneratedImagesContext = Symbol() as InjectionKey<
    Ref<GeneratedImagesContextType | undefined>
>;

export default GeneratedImagesContext;
