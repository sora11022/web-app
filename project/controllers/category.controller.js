const categoryModel = require('../models/categories.model');
const ErrorResponse = require('../helpers/ErrorResponse');

module.exports = {
  createCategory: async (req, res) => {
    const body = req.body;
    body.img = 'uploads/images/' + req.file.filename;
    const newCategory = await categoryModel.create(body);
    return res.status(201).json(newCategory);
  },
  getCategory: async (req, res) => {
    const categories = await categoryModel.find();
    return res.status(200).json(categories);
  },
  getCategoryById: async (req, res) => {
    const categoryId = req.params.id;
    const category = await categoryModel.findById(categoryId);
    return res.status(200).json(category)
  },
  updateCategory: async (req, res) => {
    const categoryId = req.params.id;
    const body = req.body;
    body.img = '/images/' + req.file.filename;
    const updatedCategory = await categoryModel.findByIdAndUpdate(
      categoryId,
      body,
      {
        new: true,
      },
    );
    return res.status(200).json(updatedCategory);
  },
  deleteCategory: async (req, res) => {
    const categoryId = req.params.id;
    // check id co trong db k?
    const existingItem = await categoryModel.findById(categoryId);
    if (!existingItem) {
      return res.status(404).json({ error: 'Không tìm thấy dữ liệu' });
    }
    //delete cate
    await categoryModel.findByIdAndDelete(categoryId);
    return res.status(204).json();
  },
};
