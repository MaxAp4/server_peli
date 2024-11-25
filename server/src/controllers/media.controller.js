import responseHandler from "../handlers/response.handler.js";
import tmdbApi from "../tmdb/tmdb.api.js";
import userModel from "../models/user.model.js";
import favoriteModel from "../models/favorite.model.js";
import reviewModel from "../models/review.model.js";
import tokenMiddlerware from "../middlewares/token.middleware.js";

const getList = async (req, res) => {
  try {
    const { page } = req.query;
    const { mediaType, mediaCategory } = req.params;

    const response = await tmdbApi.mediaList({ mediaType, mediaCategory, page });

    return responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

const getGenres = async (req, res) => {
  try {
    const { mediaType } = req.params;

    const response = await tmdbApi.mediaGenres({ mediaType });

    return responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

const search = async (req, res) => {
  try {
    const { mediaType } = req.params;
    const { query, page } = req.query;

    const response = await tmdbApi.mediaSearch({
      query,
      page,
      mediaType: mediaType === "people" ? "person" : mediaType
    });

    responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

const getDetail = async (req, res) => {
  try {
    const { mediaType, mediaId } = req.params;

    const params = { mediaType, mediaId };

    const media = await tmdbApi.mediaDetail(params);

    media.credits = await tmdbApi.mediaCredits(params);

    const videos = await tmdbApi.mediaVideos(params);

    media.videos = videos;

    const recommend = await tmdbApi.mediaRecommend(params);

    media.recommend = recommend.results;

    media.images = await tmdbApi.mediaImages(params);

    const tokenDecoded = tokenMiddlerware.tokenDecode(req);

    if (tokenDecoded) {
      const user = await User.findByPk(tokenDecoded.data);

      if (user) {
        const isFavorite = await Favorite.findOne({
          where: { userId: user.id, mediaId }
        });
        media.isFavorite = !!isFavorite;
      }
    }

    media.reviews = await Review.findAll({
      where: { mediaId },
      include: [{ model: User, attributes: ["username"] }],
      order: [["createdAt", "DESC"]]
    });

    responseHandler.ok(res, media);
  } catch (e) {
    console.log(e);
    responseHandler.error(res);
  }
};

export default { getList, getGenres, search, getDetail };