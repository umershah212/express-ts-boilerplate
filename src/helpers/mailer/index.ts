import { envHelper, to } from '@helpers/index';
import sgMail from '@sendgrid/mail';
export interface IMailer {
  to: string;
  from: string;
  subject: string;
  text: string;
  html: string;
}
const mailer = async (data: IMailer): Promise<any> => {
  sgMail.setApiKey(envHelper.sendgridApiKey());

  return new Promise(async (resolve, reject) => {
    const [error, result] = await to(sgMail.send(data));
    if (error) {
      reject(error);
    } else {
      resolve(result);
    }
  });
};

export default mailer;
