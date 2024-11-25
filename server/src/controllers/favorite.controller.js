import responseHandler from "../handlers/response.handler.js";
import Favorite from "../models/favorite.model.js";

const addFavorite = async (req, res) => {
  try {
    const isFavorite = await Favorite.findOne({
      where: {
        userId: req.user.id,
        mediaId: req.body.mediaId
      }
    });

    if (isFavorite) return responseHandler.ok(res, isFavorite);

    const favorite = await Favorite.create({
      ...req.body,
      userId: req.user.id
    });

    responseHandler.created(res, favorite);
  } catch {
    responseHandler.error(res);
  }
};

const removeFavorite = async (req, res) => {
  try {
    const { favoriteId } = req.params;

    const favorite = await Favorite.findOne({
      where: {
        id: favoriteId,
        userId: req.user.id
      }
    });

    if (!favorite) return responseHandler.notfound(res);

    await favorite.destroy();

    responseHandler.ok(res);
  } catch {
    responseHandler.error(res);
  }
};

const getFavoritesOfUser = async (req, res) => {
  try {
    const favorites = await Favorite.findAll({
      where: { userId: req.user.id },
      order: [["createdAt", "DESC"]]
    });

    responseHandler.ok(res, favorites);
  } catch {
    responseHandler.error(res);
  }
};

export default { addFavorite, removeFavorite, getFavoritesOfUser };
