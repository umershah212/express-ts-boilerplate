import express, { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { multerImageConfig } from '@handlers/';
import { HelloController } from '@controllers/index';
import authenticateJWT from '@middlewares/authenticateJWT';
const routes = express.Router();

const uploadImages = (req: Request, res: Response, next: NextFunction) => {
  const uploadImage = multer(multerImageConfig).array('images', 3);
  uploadImage(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({
          status: 400,
          data: 'Only .png, .jpg and .jpeg format allowed!',
        });
      }
      return res.status(500).json({
        status:500,
        data: 'Internal server error',
      });
    }
    next();
  });
};

routes.post('/new', [authenticateJWT, uploadImages], HelloController.new);
routes.get('/test', authenticateJWT, HelloController.get);
routes.get('/', HelloController.get);

export default routes;
