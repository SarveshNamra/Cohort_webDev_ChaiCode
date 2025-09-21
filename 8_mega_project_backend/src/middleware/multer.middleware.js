import multer from "multer";

// See multer -> documentation

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './pubilc/images');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
})

export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1 * 1000 * 1000    // The max upload file size to 1 MB.
    }
});