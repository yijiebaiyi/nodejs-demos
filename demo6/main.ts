/*
 * @Author: tuojinxin
 * @Date: 2024-02-21 15:53:30
 * @LastEditTime: 2024-02-21 16:26:35
 * @LastEditors: tuojinxin
 * @Description: 自定义实现缓存类
 */
export class SimpleCache {
    // 缓存实例
    private cache: Map<string, any>;

    // 缓存时间， 毫秒
    private expirationTime: number;

    constructor(expirationTime) {
        this.cache = new Map();
        this.expirationTime = expirationTime;
    }

    // 设置缓存
    set(key, value) {
        const expiration = Date.now() + this.expirationTime;
        this.cache.set(key, { value, expiration });
    }

    // 获取缓存
    get(key) {
        const item = this.cache.get(key);
        if (item && Date.now() < item.expiration) {
            return item.value;
        } else {
            this.cache.delete(key);
            return null;
        }
    }

    // 清空所有缓存
    clear() {
        this.cache.clear();
    }
}


async function test() {
    const cache = new SimpleCache(6000);
    cache.set('key', 'value');
    while (1) {
        console.log(cache.get('key'));
        await sleep(1000)
    }
}

async function sleep(time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("");
        }, time);
    });
}
test();