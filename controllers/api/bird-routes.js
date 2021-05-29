const router = require('express').Router();
const { Bird, Location, User } = require('../../models');

router.get('/', async (req, res) => {
    try {
      const dbBirdData = await Bird.findAll({
          include: [{ model: Location }]
      });

        res.status(200).json(dbBirdData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

router.get('/:id', async (req, res) => {
try {
    const dbBirdData = await Bird.findByPk(req.params.id, {
    include: [{ model: Location }],
    });

    if (!dbBirdData) {
    res.status(404).json({ message: 'No bird found with that id!' });
    return;
    }

    res.status(200).json(dbBirdData);
} catch (err) {
    res.status(500).json(err);
}
});

router.post('/', async (req, res) => {
    try { 
      const birdData = await Bird.create({
        bird_type: req.body.bird_type,
        bird_name: req.body.bird_name,
        latin_name: req.body.latin_name,
        max_age: req.body.max_age,
        weight: req.body.weight,
        description: req.body.description,
      });
      res.status(200).json(birdData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const birdData = await Bird.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      if (!birdData) {
        res.status(404).json({ message: 'No bird found with that id!' });
        return;
      }
  
      res.status(200).json(categoryData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;