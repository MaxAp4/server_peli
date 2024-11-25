import responseHandler from "../handlers/response.handler.js";
import Review from "../models/review.model.js";

const create = async (req, res) => {
  try {
    const { movieId } = req.params;

    const review = await Review.create({
      userId: req.user.id,
      movieId,
      ...req.body
    });

    responseHandler.created(res, review);
  } catch {
    responseHandler.error(res);
  }
};

const remove = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await Review.findOne({
      where: { id: reviewId, userId: req.user.id }
    });

    if (!review) return responseHandler.notfound(res);

    await review.destroy();

    responseHandler.ok(res);
  } catch {
    responseHandler.error(res);
  }
};

const getReviewsOfUser = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      where: { userId: req.user.id },
      order: [["createdAt", "DESC"]]
    });

    responseHandler.ok(res, reviews);
  } catch {
    responseHandler.error(res);
  }
};

export default { create, remove, getReviewsOfUser };
