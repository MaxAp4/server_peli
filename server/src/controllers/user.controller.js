import User from "../models/user.model.js";
import jsonwebtoken from "jsonwebtoken";
import responseHandler from "../handlers/response.handler.js";

const signup = async (req, res) => {
  try {
    const { username, password, displayName } = req.body;

    const checkUser = await User.findOne({ where: { username } });

    if (checkUser) return responseHandler.badrequest(res, "username already used");

    const user = User.build({
      username,
      displayName
    });

    user.setPassword(password);

    await user.save();

    const token = jsonwebtoken.sign(
      { data: user.id },
      process.env.TOKEN_SECRET,
      { expiresIn: "24h" }
    );

    responseHandler.created(res, {
      token,
      id: user.id,
      username: user.username,
      displayName: user.displayName
    });
  } catch {
    responseHandler.error(res);
  }
};

const signin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({
      where: { username },
      attributes: ["username", "password", "salt", "id", "displayName"]
    });

    if (!user) return responseHandler.badrequest(res, "User not exist");

    if (!user.validPassword(password)) return responseHandler.badrequest(res, "Wrong password");

    const token = jsonwebtoken.sign(
      { data: user.id },
      process.env.TOKEN_SECRET,
      { expiresIn: "24h" }
    );

    responseHandler.created(res, {
      token,
      id: user.id,
      username: user.username,
      displayName: user.displayName
    });
  } catch {
    responseHandler.error(res);
  }
};

export default {
  signup,
  signin,
  getInfo,
  updatePassword
};
