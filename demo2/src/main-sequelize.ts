import { Sequelize, Model, DataTypes } from "sequelize";
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "../data/testsequelize.db"
})

interface UserAttributes {
    id?: number;
    name: string;
    address: string;
    age: number;
}


class User extends Model<UserAttributes> implements UserAttributes {
    public id !: number;
    public name: string;
    public address: string;
    public age: number;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        age: {
            type: DataTypes.INTEGER,
        },
        address: {
            type: DataTypes.STRING,
        }
    },
    {
        sequelize,
        modelName: "User"
    }
)

sequelize.sync().then(() => {
    console.log("数据库创建成功了");

    // 创建数据
    let data: UserAttributes = {
        name: "wangmazi",
        address: "shanghai",
        age: 12
    }
    User.create({ name: "张三", address: "上海" }).then((userdata) => {
        console.log("创建的数据：", userdata.toJSON())
    }).catch((err) => {
        console.log(err);
    })

    User.findAll().then((users) => {
        let jsonusers = users.map((user) => user.toJSON())
        console.log("users: ", jsonusers);
        return
    }).catch((err) => {
        console.log(err);
    })
}).catch((err) => {
    console.log(err);
})