import CryptoJS from "crypto-js";

// 🔐 助記詞加密
export function encryptMnemonic(mnemonic: string, password: string): string {
  return CryptoJS.AES.encrypt(mnemonic, password).toString();
}

// 🔓 助記詞解密
export function decryptMnemonic(
  encryptedMnemonic: string,
  password: string
): string | null {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedMnemonic, password);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted || null; // 如果密碼錯誤，返回 null
  } catch (error) {
    console.error("解密失敗:", error);
    return null;
  }
}
