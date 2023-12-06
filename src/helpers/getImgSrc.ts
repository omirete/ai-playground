const getImgSrc = (image: string): string => {
    const config = useRuntimeConfig();
    return image.startsWith("data:")
        ? image
        : `${config.public.IMG_BASE_URL}/${image}`;
};

export default getImgSrc;
