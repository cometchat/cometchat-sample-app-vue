const fs = require('fs-extra');
const request = require('request');
const extract = require('extract-zip')
const rimraf = require("rimraf");
const path = require('path');


const fileName = "cometchat-uikit-vue";
const filePath = __dirname + "/src/" + fileName;

const zipFileName = "cometchat-uikit-vue-2";

const zipName = zipFileName + ".zip";
const source = "cometchat-uikit-vue";
const destination = filePath;//__dirname + "/src/cometchat-chat-uikit-vue";

const downloadUrl = "https://github.com/cometchat/cometchat-uikit-vue/archive/v3.zip";


const download = (uri, filename, callback) => {
    request.head(uri, (err, res, body) => {
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};

const checkIfFolderExists = (path) => {
    if (fs.existsSync(path)) {

        console.log("File exists", path);
        return true;
    }
    return false;
}

const deleteFileFolder = (target) => {

    console.log("deleting file", target);
    rimraf.sync(target);
}



if (checkIfFolderExists(filePath)) {
    deleteFileFolder(filePath);
}

download(downloadUrl, zipName, (props) => {

    try {
        extract(zipName, { dir: __dirname }).then(response => {

            const extractedDirs = fs.readdirSync(__dirname).filter(file =>
                fs.statSync(path.join(__dirname, file)).isDirectory() && file.startsWith(source));

            if (extractedDirs.length === 0) {
                throw new Error('Extracted directory not found');
            }

            const extractedFolderName = extractedDirs[0]; // Assuming only one folder matches
            const extractedFolderPath = path.join(__dirname, extractedFolderName);


            fs.move(extractedFolderPath, destination, error => {

                if(error) {
                    return console.error('move file error!', error);
                }
                const oldFilePath = __dirname + "/src/cometchat-uikit-vue";
                const newFilePath = __dirname + "/src/cometchat-chat-uikit-vue";

                fs.rename(oldFilePath, newFilePath, function (err) {
                    if (err) {
                        console.log('ERROR: ' + err);
                        return;
                    }
                    console.log("Renamed file successfully!");
                });
                console.log('move file success!');
            });

            const zipFile = __dirname + "/" + zipName;
            if (checkIfFolderExists(zipFile)) {
                deleteFileFolder(zipFile);
            }
        });

    } catch (error) {
        console.log("File extraction error", zipName);
    }
});
