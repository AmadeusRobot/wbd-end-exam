import { mkdir, readdir as readDir, writeFile } from "fs/promises";
import { dirname, join as joinPath } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const downloadFile = async (filename, root, content) => {
    const baseDir = joinPath(__dirname, "..", "..", "public");
    if (root.length) {
        if (!(await readDir(baseDir)).includes(root)) {
            await mkdir(joinPath(__dirname, "..", "..", "public", root));
        }
    }
    try {
        await writeFile(joinPath(baseDir, root, filename), content);
        return joinPath(baseDir, root, filename)
            .replace(baseDir, "/static/files")
            .replace(/\\/g, "/");
    } catch (e) {
        console.warn(e);
        return null;
    }
};
