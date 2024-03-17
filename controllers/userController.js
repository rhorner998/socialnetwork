const User = require('../models/user');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    // Convert each user document to JSON to ensure virtuals like friendCount are included
    const usersWithVirtuals = users.map(user => user.toJSON({ virtuals: true }));
    res.json(usersWithVirtuals);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Convert the document to a JSON object and ensure virtuals like friendCount are included
    res.json(user.toJSON({ virtuals: true, getters: true }));
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Update a user by id
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Delete a user by id
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// add a friend
exports.addFriend = async (req, res) => {
  const { userId, friendId } = req.params; // Assuming you're passing these in the URL
  
  try {
    // Adding friend to the user's friends list
    const updatedUser = await User.findByIdAndUpdate(userId,
      { $addToSet: { friends: friendId } }, // $addToSet prevents duplicates
      { new: true, runValidators: true }
    ).populate('friends'); // Optionally populate friends to return them in the response

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Remove a friend
exports.deleteFriend = async (req, res) => {
  const { userId, friendId } = req.params;

  try {
    // Removing a friend from the user's friends list
    const updatedUser = await User.findByIdAndUpdate(userId,
      { $pull: { friends: friendId } }, // $pull removes the friendId from the friends array
      { new: true }
    ).populate('friends'); // Optionally populate friends to return them in the response

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

