import multer from 'multer';

const storage: multer.StorageEngine = multer.diskStorage({
  destination: (req, file, callback): void => {
    callback(null, `${process.cwd()}/public/uploads`);
  },
  filename: (req, file, callback): void => {
    const uniqueSuffix: string = Date.now() + '-' + Math.round(Math.random() * 1E9),
      split: string[] = file.originalname.split('.'),
      ext: string = split[split.length - 1];
    const filename: string = `${file.fieldname}-${uniqueSuffix}.${ext}`;
    req.body.avatar = `/uploads/${filename}`;
    // console.log(req.body.avatar);
    callback(null, filename);
  },
});

const uploader: multer.Multer = multer({ storage });
export default uploader;
