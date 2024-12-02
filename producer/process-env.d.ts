
declare global {
  namespace NodeJS {
    interface ProcessEnv {
        [key: string]: string;
        NODE_ENV: string
PORT: string
MONGO_USER: string
MONGO_PASS: string
CLOUDAMQP_CLIENT: string
MONGO_CONN: string
CRYPTO_KEY: string
CRYPTO_IV: string
    }
  }
}
export {};
