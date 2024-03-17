const router = require('express').Router();
const { 
  getAllThoughts,
  getThoughtById, 
  createThought, 
  updateThought, 
  deleteThought,
  addReaction,
  deleteReaction
} = require('../controllers/thoughtController');

// Get all thoughts
router.get('/', getAllThoughts);

// Get a single thought by id
router.get('/:id', getThoughtById);

// Create a new thought
router.post('/', createThought);

// Update a thought by id
router.put('/:id', updateThought);

// Delete a thought by id
router.delete('/:id', deleteThought);

// Add a reaction to a thought
router.post('/:thoughtId/reactions', addReaction);

// Delete a reaction from a thought
router.delete('/:thoughtId/reactions/:reactionId', deleteReaction);

module.exports = router;
