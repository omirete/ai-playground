import Client, { type FileInfo } from "ssh2-sftp-client";

export const uploadBlob = async (
    blob: Blob,
    directory: string,
    filename: string,
    overwrite: boolean = false,
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
            filepath,
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
    recursive: boolean = false,
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
                        true,
                    );
                    if (recursiveFiles !== false) {
                        return recursiveFiles;
                    } else {
                        return [];
                    }
                } else {
                    return [file];
                }
            }),
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
