// User imports
import { CryptoHelper } from "@mono/utils";

export const cryptoHelper = new CryptoHelper("aes-256-cbc", process.env.CRYPTO_KEY, process.env.CRYPTO_IV);
