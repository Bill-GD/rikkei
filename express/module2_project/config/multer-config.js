import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, `${process.cwd()}/public/uploads`);
  },
  filename: (req, file, callback) => {
    if (!file.mimetype.includes('image/')) {
      // throw new Error('File uploaded is not an image');
      callback(new Error('File uploaded is not an image'), '');
      return;
    }

    const split = file.originalname.split('.'),
      ext = split[split.length - 1],
      originalName = split.slice(0, split.length - 1).join('.'),
      filename = `${originalName}_${Date.now()}.${ext}`;

    req.body.imagePath = `/uploads/${filename}`;
    callback(null, filename);
  },
});

const upload = multer({ storage });

export default upload;
