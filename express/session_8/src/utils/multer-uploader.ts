import multer from 'multer';

const storage: multer.StorageEngine = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, `public/uploads`);
  },
  filename: (req, file, callback) => {
    const uniqueSuffix: string = Date.now() + '-' + Math.round(Math.random() * 1E9),
      split: string[] = file.originalname.split('.'),
      ext: string = split[split.length - 1];
    const filename: string = `${file.fieldname}-${uniqueSuffix}.${ext}`;
    req.body.avatar = `upload/${filename}`;
    callback(null, filename);
  },
});

const upload: multer.Multer = multer({ storage });
export default upload;
