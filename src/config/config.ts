import * as process from 'process';

export default () => ({
  log: {
    level: process.env.LOG_LEVEL,
  },
  neo4j: {
    uri: process.env.NEO4J_URI || 'bolt://localhost:7687',
    username: process.env.NEO4J_USERNAME || 'neo4j',
    password: process.env.NEO4J_PASSWORD || 'password',
    database: process.env.NEO4J_DATABASE || 'neo4j',
  },
  redis: {
    uri: process.env.REDIS_URI,
  },

  origins: process.env.ORIGINS,
  domain: process.env.DOMAIN,
  healthChecks: {
    httpEndPoint: process.env.HCHECK_HTTP_END_POINT,
    maxMemoryHeapInMo: parseInt(process.env.HCHECK_MAX_MEMORY_HEAP_IN_MB!, 10),
    maxMemoryRSSInMo: parseInt(process.env.HCHECK_MAX_MEMORY_RSS_IN_MB!, 10),
  },
  restApi: {
    port: parseInt(process.env.LISTEN_PORT!, 10),
    useCompression: process.env.USE_COMPRESSION === 'true',
    cookies: {
      parserSecret: process.env.COOKIE_PARSER_SECRET,
      secure: process.env.COOKIE_SECURE != 'false',
    },
    jwt: {
      secretKey: process.env.JWT_SECRET_KEY,
      expiresIn: process.env.JWT_EXPIRES_IN,
      refreshTokenSecretKey: process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
      refreshTokenExpiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
    },
  },
  clamav: {
    host: process.env.CLAMAV_HOST,
    port: parseInt(process.env.CLAMAV_PORT!, 10),
    maxScanSize: parseInt(process.env.CLAMAV_MAX_SCAN_SIZE!, 10),
    failSafe: process.env.CLAMAV_FAIL_SAFE === 'true',
  },
  aws: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    region: process.env.AWS_S3_REGION,
    bucketName: process.env.AWS_S3_BUCKET_NAME,
    presigned: {
      expires: parseInt(process.env.AWS_S3_PRESIGNED_EXPIRES_IN!, 10),
    },
  },
  nodeMailer: {
    smtp: {
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT!, 10),
      secure: process.env.SMTP_SECURE === 'true',
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    from: process.env.EMAIL_FROM,
  },
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY,
    webHookKey: process.env.STRIPE_WEBHOOK_SECRET,
  },
  encryptionKey: process.env.ENCRYPTION_KEY,
});
