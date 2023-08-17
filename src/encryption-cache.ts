import Encryption from "./encryption";

export interface StorageAction {
    getCache(key: string): string | null;

    setCache(key: string, dataSource: any): void;
}


/**
 * 缓存加密解密快捷操作类
 */
class EncryptionCache {
    constructor(storageAction: StorageAction, encryption: Encryption) {
        this.storage = storageAction;
        this.encryption = encryption;
    }

    private storage;
    private encryption;


    getCache<T>(key: string): T | null {
        let item = this.storage.getCache(key);
        if (typeof item === "string") {
            item = this.encryption.decode(item);
            if (item) {
                item = JSON.parse(item);
                if (item) {
                    // @ts-ignore
                    return item;
                }
            }
        }
        return null;
    }

    setCache<T>(key: string, dataSource: T): void {
        const code = this.encryption.encrypt(JSON.stringify(dataSource));
        this.storage.setCache(key, code);
    }
}

export default EncryptionCache
