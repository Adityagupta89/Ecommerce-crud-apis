const util = require("util");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const { DB } = require("../config/index");

var storage = new GridFsStorage({
  url: DB + "test",
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg"];
    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-test-${file.originalname}`;
      return filename;
    }
    return {
      bucketName: "file2",
      filename: `${Date.now()}-test-${file.originalname}`,
    };
  },
});
var uploadFiles = multer({ storage: storage }).single("file");
var uploadFilesMiddleware = util.promisify(uploadFiles);
module.exports = uploadFilesMiddleware;
