import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Favorite = sequelize.define("Favorite", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "Users", // Nombre de la tabla Users
      key: "id",
    },
  },
  mediaType: {
    type: DataTypes.ENUM("tv", "movie"),
    allowNull: false,
  },
  mediaId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mediaTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mediaPoster: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mediaRate: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  timestamps: true, // Equivalente a `timestamps` en MongoDB
  underscored: true, // Convierte nombres a snake_case
});

export default Favorite;
