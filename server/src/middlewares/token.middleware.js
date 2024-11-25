import jsonwebtoken from "jsonwebtoken";
import responseHandler from "../handlers/response.handler.js";
import User from "../models/user.model.js"; // Usando Sequelize

const tokenDecode = (req) => {
  try {
    const bearerHeader = req.headers["authorization"];

    if (bearerHeader) {
      const token = bearerHeader.split(" ")[1];

      return jsonwebtoken.verify(
        token,
        process.env.TOKEN_SECRET
      );
    }

    return false;
  } catch {
    return false;
  }
};

const auth = async (req, res, next) => {
  const tokenDecoded = tokenDecode(req);

  if (!tokenDecoded) return responseHandler.unauthorize(res);

  try {
    const user = await User.findByPk(tokenDecoded.data); // Cambiado a Sequelize

    if (!user) return responseHandler.unauthorize(res);

    req.user = user;

    next();
  } catch {
    responseHandler.error(res);
  }
};

export default { auth, tokenDecode };
