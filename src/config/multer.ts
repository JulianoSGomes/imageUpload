import multer from "multer";
import path from "path";
import crypto from "crypto";

const dest = path.resolve(__dirname, "..", "..", "tmp", "uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, "..", "..", "tmp", "uploads"));
  },

  filename: (_req, file, cb) => {
    crypto.randomBytes(16, (err, hash) => {
      if (err) cb(err);
      const btoaName = Buffer.from(file.fieldname).toString("base64");
      const fileName = `${hash.toString("hex")}-${btoaName}${path.extname(
        file.originalname
      )}`;
      cb(null, fileName);
    });
  },
});
const limits = {
  fileSize: 2 * 2014 * 1024,
};

const fileFilter = (_req, file, cb) => {
  const allowedMimes = ["image/jpeg", "image/pjpeg", "image/png", "image/gif"];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalaid file type."));
  }
};

export default multer({
  dest: dest,
  storage: storage,
  limits: limits,
  fileFilter: fileFilter,
});
