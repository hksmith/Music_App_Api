const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    // Choose the appropriate destination folder for each file type
    const uploadFolder = "src/uploads";

    // Check if the "uploads" folder exists
    fs.access(uploadFolder, (error) => {
      if (error) {
        // "uploads" folder doesn't exist, create it
        fs.mkdir(uploadFolder, { recursive: true }, (error) => {
          if (error) {
            callback(error);
          } else {
            // "uploads" folder created, proceed to the appropriate subfolder
            proceedToSubfolder();
          }
        });
      } else {
        // "uploads" folder already exists, proceed to the appropriate subfolder
        proceedToSubfolder();
      }
    });

    function proceedToSubfolder() {
      // Choose the appropriate subfolder based on the file fieldname
      if (file.fieldname === "image") {
        callback(null, `${uploadFolder}`);
      } else if (file.fieldname === "audio") {
        callback(null, `${uploadFolder}`);
      } else {
        callback(new Error("Invalid fieldname"));
      }
    }
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + "-" + file.originalname);
  },
});


const upload = multer({
  storage: storage,
  limits: {
      fileSize: 10 * 1024 * 1024 // 10MB size limit
  }
});

module.exports = upload;
