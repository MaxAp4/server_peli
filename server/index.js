import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";
import sequelize from "./config/db.js"; // Configuración de Sequelize
import routes from "./src/routes/index.js";

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Rutas
app.use("/api/v1", routes);

// Puerto definido en el .env o 5000 por defecto
const port = process.env.PORT || 5000;

// Servidor HTTP
const server = http.createServer(app);

// Conexión a PostgreSQL
sequelize
  .authenticate()
  .then(() => {
    console.log("PostgreSQL conectado con éxito.");
    // Sincronizar modelos con la base de datos
    return sequelize.sync({ alter: true }); // Cambia `alter: true` a `force: true` para reiniciar tablas
  })
  .then(() => {
    server.listen(port, () => {
      console.log(`El servidor está escuchando en el puerto ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error al conectar a PostgreSQL:", err.message);
    process.exit(1); // Salir si la conexión falla
  });

export default app;
