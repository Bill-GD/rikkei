const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controllers");
const { authenticate, authorize } = require("../middlewares/auth.middlewares");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${__dirname}/../public`);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    let { originalname } = file;
    originalname = originalname.split(".");
    let extension = originalname[originalname.length - 1];
    let fileName = file.fieldname + "-" + uniqueSuffix + `.${extension}`;
    cb(null, fileName);
    req.fileName = fileName;
  },
});

const mulStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${__dirname}/../public`);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    let { originalname } = file;
    originalname = originalname.split(".");
    let extension = originalname[originalname.length - 1];
    let fileName = file.fieldname + "-" + uniqueSuffix + `.${extension}`;
    cb(null, fileName);
    req.fileName = fileName;
  },
});

const upload = multer({ storage });
// middleware dành cho việc upload nhiều file cùng 1 lúc
const uploadMulti = multer({ storage: mulStorage });

// authorization - phân quyền

// chỉ dành cho admin
router.get("/", authenticate, authorize(["ADMIN"]), userController.getAll);

// dành cho cả admin và user
router.get(
  "/:id",
  // authenticate,
  // authorize(["ADMIN", "USER"]),
  userController.getOne
);

router.post("/", upload.single("avatar"), userController.createOne);

router.put("/:id", userController.updateOne);

router.delete("/:id", userController.deleteOne);

module.exports = router;
