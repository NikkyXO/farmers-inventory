export const configuration = (): object => ({
  mongoDBURI: process.env.MONGODB_URI,
  emailHost: process.env.EMAIL_HOST,
  emailUsername: process.env.EMAIL_USERNAME,
  emailPassword: process.env.EMAIL_PASSWORD,
});
