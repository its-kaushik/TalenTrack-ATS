require('dotenv').config();

const config = {
  AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
  AWS_BUCKET_REGION: process.env.AWS_BUCKET_REGION,
  AWS_ARN: process.env.AWS_ARN,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  DEFAULT_PROFILE_URL:
    'https://kaushik-poc-s3.s3.ap-south-1.amazonaws.com/profile-1690740755623-377599469.png',
};

module.exports = config;
