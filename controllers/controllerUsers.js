const fs = require("fs");
const db = require("../database.json");

exports.getAllUsers = (req, res) => {
  res.status(200).json(db);
};

exports.getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  const user = db.find((user) => user.id === id);
  if (!user) {
    res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(user);
};

exports.createUsers = (req, res) => {
  const { name, age } = req.body;
  if (!name || !age) {
    res.status(400).json({ massage: "Data tidak lengkap" });
    return;
  }
  const dataNewUsers = {
    id: db.length + 1,
    name,
    age,
  };
  db.push(dataNewUsers);
  fs.writeFileSync("./database.json", JSON.stringify(db, null, 2));
  res.status(201).json({ massage: "data berhasil di tambahkan" });
};

exports.updateUsers = (req, res) => {
  const id = parseInt(req.params.id);
  if (!id) {
    res.status(400).json({ masssage: "id tidak ditemukan" });
    return;
  }
  const { name, age } = req.body;
  const index = db.findIndex((user) => user.id === id);
  if (index === -1) {
    res.status(404).json({ massage: "data tidak ditemukan" });
  }
  const prevData = db[index];
  db[index] = {
    id,
    name: name || prevData.name,
    age: age || prevData.age,
  };
  fs.writeFileSync("./database.json", JSON.stringify(db, null, 2));
  res.status(200).json({ massage: "data berhasil di update" });
};

exports.deleteUsers = (req, res) => {
  const id = parseInt(req.params.id);
  if (!id) {
    res.status(404).json({ massage: "id tidak ditemukan" });
    return;
  }
  const index = db.findIndex((user) => user.id === id);
  if (index === -1) {
    res.status(404).json({ massage: "data tidak ditemukan" });
    return;
  }
  db.splice(index, 1);
  fs.writeFileSync("./database.json", JSON.stringify(db, null, 2));
  res.status(200).json({ massage: "data berhasil di hapus" });
};
