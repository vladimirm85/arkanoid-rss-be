import { Request, Express } from 'express';
import * as multer from 'multer';
import * as moment from 'moment';

const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) => {
    cb(null, './uploads/');
  },

  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) => {
    const date = moment().format('YYYYMMDD-HHmmss-SSS');

    cb(null, `${date}-${file.originalname}`);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: (error: Error | null, isFiltered: boolean) => void
) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

const limits = {
  fileSize: 1024 * 1024,
};

export const upload = multer({ storage, fileFilter, limits });
