import Client, { FileInfo } from "ssh2-sftp-client";

export const uploadBlob = async (
    blob: Blob,
    directory: string,
    filename: string,
    overwrite: boolean = false
): Promise<boolean> => {
    const sftp = new Client();
    const conn = await sftp.connect({
        host: process.env.SSH_HOST,
        port: parseInt(process.env.SSH_PORT ?? "22"),
        username: process.env.SSH_USR,
        password: process.env.SSH_PWD,
    });
    try {
        await sftp.mkdir(directory, true);
        let filepath = directory;
        if (!directory.endsWith("/")) {
            filepath += "/";
        }
        filepath += filename;
        const result = await sftp.put(
            Buffer.from(await blob.arrayBuffer()),
            filepath
        );
        return true; // check
    } catch (err) {
        console.error(err);
        return false;
    } finally {
        conn.end();
        await sftp.end();
    }
};

export const getFiles = async (
    directory: string,
    recursive: boolean = false
): Promise<FileInfo[] | false> => {
    const sftp = new Client();

    const conn = await sftp.connect({
        host: process.env.SSH_HOST,
        port: parseInt(process.env.SSH_PORT ?? "22"),
        username: process.env.SSH_USR,
        password: process.env.SSH_PWD,
    });

    try {
        let files = await sftp.list(directory);

        let relevantFiles = await Promise.all(
            files.map(async (file) => {
                if (file.type === "d" && recursive) {
                    let recursiveFiles = await getFiles(
                        `${directory}${file.name}/`,
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
    } finally {
        conn.end();
        await sftp.end();
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
