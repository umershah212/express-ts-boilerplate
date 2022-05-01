class envHelper {
  static isDev() {
    return process.env.NODE_ENV === 'development';
  }
  static isProd() {
    return process.env.NODE_ENV === 'production';
  }
  static isTest() {
    return process.env.NODE_ENV === 'test';
  }

  static appName() {
    return process.env.APP_NAME || '';
  }
  static hashRounds() {
    return parseInt(process.env.HASH_ROUNDS || '10', 10);
  }

  static serverLink() {
    return process.env.SERVER_LINK;
  }

  static sendgridApiKey() {
    return process.env.SENDGRID_API_KEY;
  }

  static jwtSecret() {
    return process.env.JWT_SECRET;
  }

  static awsSecretAccessKey() {
    return process.env.AWS_SECRET_ACCESS_KEY;
  }

  static awsAccessKeyId() {
    return process.env.AWS_ACCESS_KEY_ID;
  }

  static awsRegion() {
    return process.env.AWS_REGION;
  }
}
export default envHelper;
