import * as fs from 'fs';

export abstract class DiskDB<T> {
    protected metadata: T;
    protected dataPath: string;
    protected dataFilePath: string;
    protected fileExt = "json";
    constructor(protected fileName: string) {
        this.dataPath = './data';
        this.fileName = `${this.fileName}.${this.fileExt}`;
        this.dataFilePath = `${this.dataPath}/${this.fileName}`;
    }

    // 读取数据文件

    private async readDataFromFile(): Promise<T[]> {
        try {
            const data = fs.readFileSync(this.dataFilePath, 'utf8');
            return JSON.parse(data);
        } catch (err) {
            return [];
        }
    }

    // 写入数据到文件
    private async writeDataToFile(data: T[]): Promise<void> {
        const jsonData = JSON.stringify(data, null, 2);
        fs.writeFileSync(this.dataFilePath, jsonData, 'utf8');
    }

    // 过滤修改或新增的数据
    abstract fileterData(newData: T): T;

    async setmetaData(metadata: T): Promise<void> {
        this.metadata = metadata;
    }

    async getmetaData(): Promise<T> {
        return this.metadata;
    }

    // 添加数据
    async insert(data: T = this.metadata): Promise<boolean> {
        data = this.fileterData(data);
        const existingData = await this.readDataFromFile();
        existingData.push(data);
        this.writeDataToFile(existingData);
        this.setmetaData(data);
        return true;
    }

    // 存在就不添加
    async insertUnique(key: string, data: T = this.metadata): Promise<boolean> {
        data = this.fileterData(data);
        let exist = await this.findOne(key, data[key]);
        if (exist) {
            return false;
        }
        return this.insert(data)
    }

    // 删除数据
    async destroy(key: string, value: any): Promise<boolean> {
        const existingData = await this.readDataFromFile();
        const newData = existingData.filter((item: T) => item[key] !== value);
        if (newData.length !== existingData.length) {
            await this.writeDataToFile(newData);
            return true;
        }
        return false;
    }

    // 更新数据
    async update(key: string, value: any, newData: T = this.metadata): Promise<boolean> {
        const existingData = await this.readDataFromFile();
        const dataIndex = existingData.findIndex((item: T) => item[key] === value);
        if (dataIndex !== -1) {
            existingData[dataIndex] = { ...existingData[dataIndex], ...newData };
            await this.writeDataToFile(existingData);
            this.setmetaData(existingData[dataIndex]);
            return true;
        }
        return false;
    }

    // 查询一条数据
    async findOne(key: string, value: any): Promise<T | null> {
        const existingData: T[] = await this.readDataFromFile();
        const data = existingData.find((item: T) => item[key] === value);
        return data || null;
    }

    // 根据单个条件搜索
    async searchAll(key: string, value: any): Promise<T[]> {
        const existingData: T[] = await this.readDataFromFile();
        const data = existingData.filter((item: T) => item[key] === value);
        return data || [];
    }

    // 根据多个条件搜索（过滤空）
    async searchAllBy(conditions: Record<string, any>): Promise<T[]> {
        const existingData: T[] = await this.readDataFromFile();
        const data = existingData.filter((item: T) => {
            for (let k in conditions) {
                if (conditions[k] && item[k] !== conditions[k]) {
                    return false;
                }
            }
            return true;
        });
        return data || [];
    }

    // 获取所有数据
    async findAll(): Promise<T[] | null> {
        const allData = await this.readDataFromFile();
        return allData || null;
    }
}