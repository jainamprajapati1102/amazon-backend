import { randomBytes } from "crypto";
import multer, { diskStorage } from "multer";
import { extname } from "path";
const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/upload");
  },
  filename: function (req, file, cb) {
    randomBytes(12, (err, bytes) => {
      const fn = bytes.toString("hex") + extname(file.originalname);
      cb(null, fn);
    });
  },
});

export const upload = multer({ storage: storage });
