import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import crypto from "crypto";

const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  displayName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  salt: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
  underscored: true,
});

// Métodos personalizados
User.prototype.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.password = crypto.pbkdf2Sync(
    password,
    this.salt,
    1000,
    64,
    "sha512"
  ).toString("hex");
};

User.prototype.validPassword = function (password) {
  const hash = crypto.pbkdf2Sync(
    password,
    this.salt,
    1000,
    64,
    "sha512"
  ).toString("hex");
  return this.password === hash;
};

export default User;
