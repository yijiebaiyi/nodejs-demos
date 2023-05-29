import * as sqlite3 from "sqlite3";
const dbpath = '../data/testsqlite.db';
const db = new sqlite3.Database(dbpath);
let prepareDate: userInf[] = [
    {
        id: 1,
        name: "John",
        address: "Japan"
    },
    {
        id: 2,
        name: "Lily",
        address: "US"
    }
];
interface userInf {
    id: number;
    address: string;
    name: string;
}
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS users (id INTGER PRIMARY KEY, name TEXT, address TEXT)");

    let insertStatment = db.prepare("INSERT INTO users(id, name, address) VALUES (?, ?, ?)");
    for (let v of prepareDate) {
        insertStatment.run(v.id, v.name, v.address);
    }
    insertStatment.finalize();

    db.all("SELECT * FROM users", (err: Error | null, rows: userInf[]) => {
        if (err) {
            console.error(err);
            throw new Error(err.message);
        } else {
            rows.forEach((row: userInf) => {
                console.log("id: %s; 姓名: %s; 地址: %s; ", row.id, row.name, row.address)
            })
        }
    });
});

db.close();