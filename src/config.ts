import dotenv from "dotenv";
import cloudinary from "cloudinary";

dotenv.config({});

if (process.env.ENABLE_APM === "1") {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require("elastic-apm-node").start({
    serviceName: "jobber-auth",
    serverUrl: process.env.ELASTIC_APM_SERVER_URL,
    secretToken: process.env.ELASTIC_APM_SECRET_TOKEN,
    environment: process.env.NODE_ENV,
    active: true,
    captureBody: "all",
    errorOnAbortedRequests: true,
    captureErrorLogStackTraces: "always"
  });
}

class Config {
  public NODE_ENV: string | undefined;
  public RABBITMQ_ENDPOINT: string | undefined;
  public MYSQL_DB: string | undefined;
  public JWT_TOKEN: string | undefined;
  public CLOUDINARY_NAME: string | undefined;
  public CLOUDINARY_API_KEY: string | undefined;
  public CLOUDINARY_API_SECRET: string | undefined;
  public GATEWAY_JWT_TOKEN: string | undefined;
  public API_GATEWAY_URL: string | undefined;
  public CLIENT_URL: string | undefined;
  public ELASTIC_SEARCH_URL: string | undefined;

  constructor() {
    this.NODE_ENV = process.env.NODE_ENV || "";
    this.JWT_TOKEN = process.env.JWT_TOKEN || "";
    this.GATEWAY_JWT_TOKEN = process.env.GATEWAY_JWT_TOKEN || "";
    this.RABBITMQ_ENDPOINT = process.env.RABBITMQ_ENDPOINT || "";
    this.MYSQL_DB = process.env.MYSQL_DB || "";
    this.CLOUDINARY_NAME = process.env.CLOUDINARY_NAME || "";
    this.CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY || "";
    this.CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET || "";
    this.API_GATEWAY_URL = process.env.API_GATEWAY_URL || "";
    this.CLIENT_URL = process.env.CLIENT_URL || "";
    this.ELASTIC_SEARCH_URL = process.env.ELASTIC_SEARCH_URL || "";
  }

  public cloudinaryConfig(): void {
    try {
      cloudinary.v2.config({
        cloud_name: this.CLOUDINARY_NAME,
        api_key: this.CLOUDINARY_API_KEY,
        api_secret: this.CLOUDINARY_API_SECRET
      });
    } catch (error) {
      console.log({ error });
    }
  }
}

export const config: Config = new Config();
