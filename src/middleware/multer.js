const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "src/uploads/")
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + "-" + file.orginalname)
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fieldSize: 1024 * 1024 * 3
    }
});

exports.upload = upload;