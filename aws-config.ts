import AWS from "aws-sdk";

// Configure AWS SDK
AWS.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID, // Store in .env
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY, // Store in .env
  region: "us-east-1", // Change to your AWS region
});

const s3 = new AWS.S3();

export { s3 };
