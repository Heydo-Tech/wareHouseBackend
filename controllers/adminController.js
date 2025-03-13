const User = require('../models/User');
const bcrypt = require('bcryptjs');
  
const createUser = async (req, res) => {
  const { name, password, role } = req.body;
console.log("Name :",name);
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, password: hashedPassword, role });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await User.findByIdAndDelete(id);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createUser, deleteUser };