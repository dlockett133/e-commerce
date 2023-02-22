const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagsData = await Tag.findAll({include: [{model: Product}]})
    if (!tagsData){
      console.log(`Can't find any tags`);
      res.status(404).json({message: `Can't find any tags`})
    }
    res.status(200).json(tagsData);
  } catch (error) {
    console.log(error);
    res.status(500).json({message: error.message})
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const {id} = req.params;
  try {
    const tag = await Tag.findOne({
      where: {id},
      include: [{model: Product}]
    })

    if(!tag){
      console.log(`Can't find tag with an id of ${id}`);
      res.status(404).json({message: `Can't find tag with an id of ${id}`})
    }
    res.status(200).json(tag);
  } catch (error) {
    console.log(error);
    res.status(500).json({message: error.message})
  }
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
