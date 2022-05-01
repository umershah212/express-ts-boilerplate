import multer from 'multer';
import aws from 'aws-sdk';
import multerS3 from 'multer-s3';
import envHelper from '@helpers/envHelper';

export const multerImageConfig = (function () {
  const s3 = new aws.S3();
  return {
    storage: multerS3({
      s3: s3,
      acl: 'public-read',
      bucket: envHelper.appName(),
      key: function (req, file, cb) {
        cb(null, new Date().toISOString() + '-' + file.originalname);
      },
    }),
    fileFilter: (req, file, cb) => {
      if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', 'Only .png, .jpg and .jpeg format allowed!'));
      }
    },
  };
})();
