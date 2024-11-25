import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Review = sequelize.define("Review", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, // Genera automáticamente un UUID único
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "Users", // Referencia al modelo de usuario
      key: "id",
    },
  },
  content: {
    type: DataTypes.TEXT, // Campo de texto largo
    allowNull: false,
  },
  mediaType: {
    type: DataTypes.ENUM("tv", "movie"), // Solo permite "tv" o "movie"
    allowNull: false,
  },
  mediaId: {
    type: DataTypes.STRING, // Puede ser un identificador o código único del medio
    allowNull: false,
  },
  mediaTitle: {
    type: DataTypes.STRING, // Título del medio
    allowNull: false,
  },
  mediaPoster: {
    type: DataTypes.STRING, // URL del póster del medio
    allowNull: false,
  },
}, {
  timestamps: true, // Incluye `createdAt` y `updatedAt`
  underscored: true, // Convierte nombres de columnas a snake_case
});

export default Review;
