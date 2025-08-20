import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const fileName = `product-${Date.now()}${ext}`;
    cb(null, fileName);
  },
});

const fileFilter = (res, file, cb) => {
  const allowedTypes = ["images/jpeg", "images/jpg", "images/png"];
  if (allowedTypes.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Hanya file JPEG/JPG/PNG yang diperbolehkan"));
};

const upload = multer({ storage: storage, fileFilter });
