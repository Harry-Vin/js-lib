import Encryption from "./encryption";

export interface CacheAction {
    getCache<T>(key: string): T | null;

    setCache<T>(key: string, dataSource: T): void;
}

export class BrowserCache implements CacheAction {
    constructor(storage: Storage, encryption: Encryption) {
        this.storage = storage;
        this.encryption = encryption;
    }

    private storage;
    private encryption;

    getCache<T>(key: string): T | null {
        let item = this.storage.getItem(key);
        if (item) {
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
        this.storage.setItem(key, code);
    }

}

export default {
    BrowserCache
}
