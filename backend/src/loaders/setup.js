import path from "path";
import fs from "fs";
import fileutils from "../utility/fileutils";
export default async function() {
    const folderPath = path.resolve(__dirname, "../..", "game_boards");
    const dirExists = await fileutils.dirExistsPromise(folderPath);
    if (!dirExists) {
        await fileutils.createDirectory(folderPath);
    }
}