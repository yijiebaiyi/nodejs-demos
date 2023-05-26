import { DiskDB } from "../diskdb";
import { UserInf, UserStatusEnum } from "./user-inf";

export class UserTB extends DiskDB<UserInf> {
    constructor() {
        super("user-tb");
    };

    private setDefaultValues(data: UserInf): UserInf {
        return {
            uuid: "",
            name: "",
            age: 0,
            address: "",
            email: "",
            status: UserStatusEnum.DISABLE,
            createtime: Date.now(),
            updatetime: Date.now(),
            ...data,
        };
    }

    fileterData(data: UserInf): UserInf {
        return this.setDefaultValues(data);
    }
}