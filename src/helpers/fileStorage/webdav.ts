import { createClient, FileStat } from "webdav";

export interface FileUploadInfo {
    blob: Blob;
    directory: string;
    filename: string;
}

export const uploadBlob = async (
    blob: Blob,
    directory: string,
    filename: string,
    overwrite: boolean = false
): Promise<boolean> => {
    const client = createClient(process.env.WEBDAV_HOST as string, {
        username: process.env.WEBDAV_USR,
        password: process.env.WEBDAV_PWD,
    });
    try {
        await client.createDirectory(directory, { recursive: true });
        let filepath = directory;
        if (!directory.endsWith("/")) {
            filepath += "/";
        }
        filepath += filename;
        const result = await client.putFileContents(
            filepath,
            Buffer.from(await blob.arrayBuffer()),
            {
                overwrite,
            }
        );
        return result;
    } catch (err) {
        console.error(err);
        return false;
    }
};

// export const uploadBlobs = async (
//     files: FileUploadInfo[],
//     overwrite: boolean = false
// ): Promise<boolean> => {
//     const client = createClient(process.env.WEBDAV_HOST as string, {
//         username: process.env.WEBDAV_USR,
//         password: process.env.WEBDAV_PWD,
//     });
//     try {
//         await client.createDirectory(directory, { recursive: true });
//         let filepath = directory;
//         if (!directory.endsWith("/")) {
//             filepath += "/";
//         }
//         filepath += filename;
//         const result = await client.putFileContents(
//             filepath,
//             Buffer.from(await blob.arrayBuffer()),
//             {
//                 overwrite,
//             }
//         );
//         return result;
//     } catch (err) {
//         console.error(err);
//         return false;
//     }
// };

export const getFiles = async (
    directory: string,
    recursive: boolean = false
): Promise<FileStat[] | false> => {
    const client = createClient(process.env.WEBDAV_HOST as string, {
        username: process.env.WEBDAV_USR,
        password: process.env.WEBDAV_PWD,
    });
    try {
        let files = (await client.getDirectoryContents(
            directory
        )) as FileStat[];

        let relevantFiles = await Promise.all(
            files.map(async (file) => {
                if (file.type === "directory" && recursive) {
                    let recursiveFiles = await getFiles(
                        `${directory}${file.basename}/`,
                        true
                    );
                    if (recursiveFiles !== false) {
                        return recursiveFiles;
                    } else {
                        return [];
                    }
                } else {
                    return [file];
                }
            })
        );
        return relevantFiles.flat();
    } catch (err) {
        console.error(err);
        return false;
    }
};

export const dataUrlToFile = (
    dataUrl: string,
    filename: string
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
