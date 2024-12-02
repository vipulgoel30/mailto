// Core imports
import { randomUUID } from "crypto";

// User imports
import { CryptoHelper } from "../classes/CryptoHelper";

export const generateKey = (cryptoHelper: CryptoHelper): [string, string] => {
  const key: string = randomUUID() + Date.now();
  const encryptedKey: string = cryptoHelper.encrypter(key, "utf-8", "hex")!;
  return [key, encryptedKey];
};

export const encryptKey = (key: string, cryptoHelper: CryptoHelper): string | undefined => {
  return cryptoHelper.encrypter(key, "utf-8", "hex");
};
