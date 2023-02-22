const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoriesData = await Category.findAll({include: [{model: Product}]})
    if(!categoriesData){
      console.log(`Can't find any catergories`);
      res.status(404).json({message: `Can't find any catergories`});
      return
    }
    res.status(200).json(categoriesData);
  } catch (error) {
    console.log(error);
    res.status(500).json({message: error.message});
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const {id} = req.params;
  try {
    const category = await Category.findOne({
      where: {id},
      include: [{model: Product}]
    })

    if(!category){
      console.log(`Can't find a catergory with an id of ${id}`);
      res.status(404).json({message: `Can't find a catergory with an id of ${id}`});
      return
    }
    res.status(200).json(category);
  } catch (error) {
      console.log(error);
      res.status(500).json({message: error.message});
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCatergory = await Category.create(req.body);
    res.status(201).json(newCatergory);
  } catch (error) {
      console.log(error);
      res.status(500).json({message: error.message});
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const {id} = req.params;
  const {category_name} = req.body;

  try {
    const updateCategory = await Category.update({category_name}, {where: {id}});
    if (updateCategory[0] === 0){
      console.log(`Can't find category with an id of ${id}`);
      res.status(404).json({message: `Can't find category with an id of ${id}`});
      return
    }
    res.status(200).json(updateCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({message: error.message});
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const {id} = req.params;
  try {
    const deleteCategory = await Category.destroy({where: {id}});
    if(!deleteCategory){
      console.log(`Category not found with an id of ${id}`)
      res.status(404).json({message:`Category not found with an id of ${id}`});
      return
    }
    res.status(200).json({ message: `Category with id ${id} has been deleted.` })
  } catch (error) {
      console.log(error);
      res.status(500).json({message: `Server Error`});
  }
});

module.exports = router;
