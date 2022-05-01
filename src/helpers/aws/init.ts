import { envHelper } from '@helpers/index';
import NodeLogger from '@helpers/logger';
import aws from 'aws-sdk';
export const setupAWS = (logger: NodeLogger) => {
  logger.info('Setting up AWS', 'AWSInit');
  aws.config.update({ secretAccessKey: envHelper.awsSecretAccessKey(), accessKeyId: envHelper.awsAccessKeyId(), region: envHelper.awsRegion() });
};

export default setupAWS;
