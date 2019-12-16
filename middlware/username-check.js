const Users = require('../users/users-model');

module.exports = async (req, res, next) => {
  const { username } = req.body;

  try {
    const user = await Users.findBy({ username }).first();

    if (user) {
      res.status(400).json({ message: 'Username is already taken' });
    } else {
      next();
    }
  } catch (err) {
    res.status(500).json({ error: 'Error registring user' });
  }
};
