'use strict'

const { default: mongoose } = require("mongoose");
const { countConnects } = require("../helpers/check.connect");

class Database {
  constructor() {
    this.connect();
  }


  connect(type = "mongodb") {
    if (true) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }

    mongoose
      .connect(process.env.MONGODB_URI)
      .then(() => console.log(`MongoDB connected ${countConnects()} connection(s)`))
      .catch((err) => console.log("MongoDB errored", err));
  }

  static getInstance() {
    if (!Database.instance) Database.instance = new Database();
    return Database.instance;
  }
}

const dbInstance = Database.getInstance();

module.exports = dbInstance;
