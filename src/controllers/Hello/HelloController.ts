import { Request, Response } from 'express';
import { Hello } from '@models/index';
import { IHello } from '@models/index';
import { logger as NodeLogger, to } from '@helpers/index';
class HelloController {
  public static async new(req: Request, res: Response) {
    const logger: NodeLogger = req.app.get('logger');
    const { name, message } = req.body;
    if (!name || !name.trim().length || !message || !message.trim().length) return res.status(400).json({ status: 500, data: 'bad request' });
    let images = [];
    if (req.files && req.files.length > 0) images = (req.files as Express.Multer.File[]).map((file) => file.location);
    if (req.files) console.log(req.files);
    const [hello_error]: [Error] | [null, IHello] = await to(
      Hello.create({
        name,
        message,
        images,
      }),
    );
    if (hello_error) {
      logger.error(hello_error, 'HelloService');
      return res.status(500).json({ status: 500, data: 'Internal server error' });
    }
    return res.status(200).json({ status: 200, data: 'success' });
  }

  public static async get(req: Request, res: Response) {
    const { page = 0, limit = 25 } = req.query;
    const skip = Number(page) * Number(limit);
    const [err, hellos]: [Error, IHello[]] = await to(Hello.find({}).skip(skip).limit(Number(limit)));
    if (err) return res.status(500).json({ status: 500, data: 'Internal server error' });
    return res.status(200).json({ status: 200, data: hellos });
  }
}

export default HelloController;
