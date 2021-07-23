const fs = require('fs');

const deleteFile = (filePath) => {
    if (fs.existsSync(filePath)) {
        fs.unlink(filePath, (err) => {
            if (err) {
                console.log('error unlinking', filePath)
                // throw (err);
            }
        });
    }
}
exports.deleteFile = deleteFile;