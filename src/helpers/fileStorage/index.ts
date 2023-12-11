import fs from "fs/promises";

export const uploadBlob = async (
    blob: Blob,
    directory: string,
    filename: string,
    overwrite: boolean = false,
): Promise<boolean> => {
    try {
        await fs.mkdir(directory, { recursive: true });
        let filepath = directory;
        if (!directory.endsWith("/")) {
            filepath += "/";
        }
        filepath += filename;
        const result = await fs.writeFile(
            filepath,
            Buffer.from(await blob.arrayBuffer()),
        );
        return true; // check
    } catch (err) {
        console.error(err);
        return false;
    } finally {
        // conn.end();
        // await sftp.end();
    }
};

export const dataUrlToFile = (
    dataUrl: string,
    filename: string,
): File | undefined => {
    if (dataUrl.startsWith("data:")) {
        const arr = dataUrl.split(",");
        const mime = arr[0].match(/:(.*?);/)?.[1];
        if (mime) {
            const bstr = atob(arr[arr.length - 1]);
            let n = bstr.length;
            const u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, { type: mime });
        } else {
            console.error("Invalid url");
            return undefined;
        }
    } else {
        console.error("Unsupported url");
        return undefined;
    }
};
