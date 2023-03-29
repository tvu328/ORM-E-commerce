const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product}],
    });
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryDataById = await Category.findByPk(req.params.id, {
      include: [{ model: Product}],
    });
    if (!categoryDataById) {
      res.status(404).json({ message: "Category with that id does not exist!" })
      return;
    }
    res.status(200).json(categoryDataById);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategoryData = await Category.create(req.body);
    res.status(200).json(newCategoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updatedCategoryData = await Category.update({
      category_name: req.body.category_name
    }, {
      where: {
        id: req.params.id
      },
    });
    if (!updatedCategoryData) {
      res.status(404).json({ message: "Category with that id does not exist!" });
      return;
    }
    res.status(200).json(updatedCategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteCategoryData) {
      res.status(404).json({ message: "Category with that id does not exist!" });
      return;
    }
    res.status(200).json(deleteCategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
