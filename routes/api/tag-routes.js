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
      res.status(404).json({message: `Can't find any tags`});
      return
    }
    res.status(200).json(tagsData);
  } catch (error) {
      console.log(error);
      res.status(500).json({message: error.message});
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
      console.log(`Can't find a tag with an id of ${id}`);
      res.status(404).json({message: `Can't find a tag with an id of ${id}`});
      return
    }
    res.status(200).json(tag);
  } catch (error) {
      console.log(error);
      res.status(500).json({message: error.message});
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body);
    res.status(201).json(newTag);
  } catch (error) {
      console.log(error);
      res.status(500).json({message: error.message});
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const {id} = req.params;
  const {tag_name} = req.body
  try {
    const updateTag = await Tag.update({tag_name}, {where: {id}});
    if(updateTag[0] === 0){
      console.log(`Can't find tag with an id of ${id}`);
      res.status(404).json({message: `Can't find tag with an id of ${id}`});
      return
    }
    res.status(200).json(updateTag);
  } catch (error) {
      console.log(error);
      res.status(500).json({message: error.message});
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  const {id} = req.params;
  try {
    const deleteTag = await Tag.destroy({where: {id}});
    if(!deleteTag){
      console.log(`Tag not found with an id of ${id}`)
      res.status(404).json({message:`Tag not found with an id of ${id}`});
      return
    }
    res.status(200).json({ message: `Tag with id ${id} has been deleted.` })
  } catch (error) {
      console.log(error);
      res.status(500).json({message: `Server Error`});
  }
});

module.exports = router;
