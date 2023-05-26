export interface UserInf {
    uuid?: string;
    name?: string;
    age?: number;
    email?: string;
    address?: string;
    status?: UserStatusEnum;
    createtime?: number;
    updatetime?: number;
}

export enum UserStatusEnum {
    ENABLE = 1,
    DISABLE = 0,
}
