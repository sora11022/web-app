const ErrorResponse = require('../helpers/ErrorResponse');
const commentModel = require('../models/comments.model');

module.exports = {
  createComment: async (req, res) => {
    const productId = req.params.productId;
    const content = req.body.content;
    if (req.user) {
      const comment = await commentModel.create({
        content: content,
        productId: productId,
        userId: req.user._id,
      });
      return res.status(201).json(comment);
    }
  },
  getCommentsFromProduct: async (req, res) => {
    const { productId } = req.params.productId;
    const perPage = 10;
    let page = parseInt(req.query.page) || 1;
    const getComments = await commentModel
      .find(productId)
      .populate('productId')
      .populate('userId', 'username')
      .sort('-createAt')
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    return res.status(200).json(getComments);
  },
  deleteComment: async (req, res) => {
    const commentId = req.body.commentId;
    const userId = req.user._id;
    const findComment = await commentModel.findById(commentId);
    if (!findComment) {
      throw new ErrorResponse(404, 'Comment not found');
    }
    if (userId.equals(findComment.userId)) {
      await commentModel.findByIdAndDelete(commentId);
      return res.status(200).json('Success');
    } else {
      throw new ErrorResponse(403, 'Unauthorized');
    }
  },
};
