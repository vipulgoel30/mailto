// Core imports
import { Cipher, createCipheriv, createDecipheriv, Decipher, Encoding } from "crypto";

export class CryptoHelper {
  CRYPTO_KEY: Buffer;
  CRYPTO_INIT_VECTOR: Buffer;
  constructor(private readonly algorithm: string, cryptoKey: string, iv: string) {
    this.CRYPTO_KEY = Buffer.from(cryptoKey);
    this.CRYPTO_INIT_VECTOR = Buffer.from(iv);
  }

  encrypter(payload: string, inputEncoding: Encoding, outputEncoding: Encoding): string | undefined {
    try {
      const cipher: Cipher = createCipheriv(this.algorithm, this.CRYPTO_KEY, this.CRYPTO_INIT_VECTOR);
      let encryptedData = cipher.update(payload, inputEncoding, outputEncoding);
      return (encryptedData += cipher.final(outputEncoding));
    } catch (err) {
      return undefined;
    }
  }

  decrypter(payload: string, inputEncoding: Encoding, outputEncoding: Encoding): string | undefined {
    try {
      const decipher: Decipher = createDecipheriv(this.algorithm, this.CRYPTO_KEY, this.CRYPTO_INIT_VECTOR);
      let decryptedData = decipher.update(payload, inputEncoding, outputEncoding);
      return (decryptedData += decipher.final(outputEncoding));
    } catch (err) {
      return undefined;
    }
  }
}
