import fs from "fs";
async function writeFilePromise(filePah, content) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePah, content, (err) => {
            if (err) {
                return reject(err);
            }
            return resolve(true);
        })
    })
}

async function readFilePromise(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                return reject(err);
            }
            return resolve(data);
        })
    })
}

async function existsFilePromise(filePath) {
    return new Promise((resolve) => {
        fs.access(filePath, (err) => {
            if (err) {
                return resolve(false);
            }
            return resolve(true);
        })
    })
}

async function dirExistsPromise(dirPath) {
    return new Promise((resolve, reject) => {
        fs.stat(dirPath, (err) => {
            if (!err) {
                return resolve(true);
            } else if (err && err.code == "ENOENT") {
                return resolve(false);
            }
            return reject(err);
        })
    })
}

async function createDirectory(dirPath) {
    return new Promise((resolve, reject) => {
        fs.mkdir(dirPath, (err) => {
            if (err) {
                return reject(true);
            }
            return resolve(true);
        })
    })
}
export default { writeFilePromise, readFilePromise, existsFilePromise, dirExistsPromise, createDirectory };