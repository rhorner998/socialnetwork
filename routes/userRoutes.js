const router = require('express').Router();
const { 
  getAllUsers,
  getUserById, 
  createUser, 
  updateUser, 
  deleteUser,
  addFriend,
  deleteFriend
} = require('../controllers/userController');

// Get all users
router.get('/', getAllUsers);

// Get a single user by id
router.get('/:id', getUserById);

// Create a new user
router.post('/', createUser);

// Update a user by id
router.put('/:id', updateUser);

// Delete a user by id
router.delete('/:id', deleteUser);

// Route to add a friend to a user
router.post('/:userId/friends/:friendId', addFriend);

// Route to delete a friend to a user
router.delete('/:userId/friends/:friendId', deleteFriend);

module.exports = router;
