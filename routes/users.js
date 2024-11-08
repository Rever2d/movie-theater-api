const express = require('express');
const router = express.Router();
const { User, Show } = require('../models');

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET one user
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET all shows watched by a user
router.get('/:id/shows', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: Show
    });
    if (user) {
      res.json(user.Shows);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT associate a user with a show they have watched
router.put('/:id/shows/:showId', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    const show = await Show.findByPk(req.params.showId);
    if (user && show) {
      await user.addShow(show);
      res.status(200).json({ message: 'Show associated with user' });
    } else {
      res.status(404).json({ error: 'User or Show not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;