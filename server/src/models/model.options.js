import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Review = sequelize.define("Review", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "Users",
      key: "id",
    },
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
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
}, {
  timestamps: true,
  underscored: true,
});

export default Review;
