import { diskStorage, StorageEngine } from "multer";
import { extname } from "path";
import { v4 as uuid } from "uuid";

export type MulterFile = Express.Multer.File;

export const storage: StorageEngine = diskStorage({
  destination: "./uploads",
  filename: (req, file: MulterFile, cb) => {
    const uniqueSuffix = Date.now() + "-" + uuid();
    cb(null, uniqueSuffix + extname(file.originalname));
  },
});
