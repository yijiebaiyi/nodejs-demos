import { UserInf } from "./entity/user/user-inf";
import { UserTB } from "./entity/user/user-tb";



let user = new UserTB();
let data: UserInf = {
    name: "里斯",
    address: "大城市铁岭"
}
user.insert(data).then((res) => {
    console.log("插入结果：", res);
    user.findAll().then((data) => {
        console.log("数据:", data)
    });
});