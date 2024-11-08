const express = require('express');
const router = express.Router();
const { Show, User } = require('../models'); 
// GET all shows
router.get('/', async (req, res) => {
  try {
    const shows = await Show.findAll();
    res.json(shows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET one show
router.get('/:id', async (req, res) => {
  try {
    const show = await Show.findByPk(req.params.id);
    if (show) {
      res.json(show);
    } else {
      res.status(404).json({ error: 'Show not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET all users who watched a show
router.get('/:id/users', async (req, res) => {
  try {
    const show = await Show.findByPk(req.params.id, {
      include: User
    });
    if (show) {
      res.json(show.Users);
    } else {
      res.status(404).json({ error: 'Show not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update the available property of a show
router.put('/:id', async (req, res) => {
  try {
    const show = await Show.findByPk(req.params.id);
    if (show) {
      show.available = req.body.available;
      await show.save();
      res.json(show);
    } else {
      res.status(404).json({ error: 'Show not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE a show
router.delete('/:id', async (req, res) => {
  try {
    const show = await Show.findByPk(req.params.id);
    if (show) {
      await show.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Show not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET shows of a particular genre
router.get('/genre/:genre', async (req, res) => {
  try {
    const shows = await Show.findAll({
      where: { genre: req.params.genre }
    });
    res.json(shows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;