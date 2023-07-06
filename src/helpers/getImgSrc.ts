const getImgSrc = (image: string): string => {
    const config = useRuntimeConfig();
    return image.startsWith("data:")
        ? image
        : `${config.public.URL_IMG}/${image}`;
};

export default getImgSrc;
