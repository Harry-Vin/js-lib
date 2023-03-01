import CryptoJS from 'crypto-js'

/**
 * AES加解密工具
 */
export default class Encryption {
    constructor(key?: string, iv?: string) {
        this.key = CryptoJS.enc.Utf8.parse(key || "DAB1877CF9D73962");
        this.iv = CryptoJS.enc.Utf8.parse(iv || "BFF338ECB48F3BD4");
    }

    private readonly key;  //十六位十六进制数作为密钥
    private readonly iv;   //十六位十六进制数作为密钥偏移量

    /**
     * 加密
     * @param word
     */
    public encrypt(word: string) {
        const src = CryptoJS.enc.Utf8.parse(word);
        const encrypted = CryptoJS.AES.encrypt(src, this.key, {
            iv: this.iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        return encrypted.ciphertext.toString().toUpperCase();
    }

    /**
     * 解密
     * @param word
     */
    public decode(word: string) {
        const encryptedHexStr = CryptoJS.enc.Hex.parse(word);
        const src = CryptoJS.enc.Base64.stringify(encryptedHexStr);
        const decrypt = CryptoJS.AES.decrypt(src, this.key, {
            iv: this.iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
        return decryptedStr.toString();
    }
}
