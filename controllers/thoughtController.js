const Thought = require('../models/thought');

exports.getAllThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find({});
    console.log(thoughts); // Debug: Check if reactionCount is included
    res.json(thoughts);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// exports.getAllThoughts = async (req, res) => {
//   try {
//     let thoughts = await Thought.find({});
//     thoughts = thoughts.map(thought => thought.toJSON()); // Manually trigger toJSON
//     console.log(thoughts); // Debug: Now check if reactionCount is included
//     res.json(thoughts);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// };

// Get a single thought by id
exports.getThoughtById = async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.json(thought);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Create a new thought
exports.createThought = async (req, res) => {
  try {
    const newThought = new Thought(req.body);
    const savedThought = await newThought.save();
    res.status(201).json(savedThought);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Update a thought by id
exports.updateThought = async (req, res) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedThought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.json(updatedThought);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Delete a thought by id
exports.deleteThought = async (req, res) => {
  try {
    const deletedThought = await Thought.findByIdAndDelete(req.params.id);
    if (!deletedThought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// add a reaction
exports.addReaction = async (req, res) => {
  const { thoughtId } = req.params;
  const { reactionBody, username } = req.body;
  
  try {
    // Logic to add reaction to thought in database
    // This is a simplified example; adjust according to your schema
    const thought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $push: { reactions: { reactionBody, username } } },
      { new: true }
    );

    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    res.json(thought);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Delete a reaction
exports.deleteReaction = async (req, res) => {
  const { thoughtId, reactionId } = req.params;

  try {
    // Logic to remove a reaction from the thought in the database
    const thought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $pull: { reactions: { _id: reactionId } } }, // Use $pull to remove the reaction
      { new: true }
    );

    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    res.json(thought);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
