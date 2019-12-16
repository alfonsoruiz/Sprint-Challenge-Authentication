const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model');
const secrets = require('../config/secrets');

const validateInputs = require('../middlware/validate-inputs');
const usernameCheck = require('../middlware/username-check');

router.post('/register', validateInputs, usernameCheck, async (req, res) => {
  const userData = req.body;

  const hash = bcrypt.hashSync(userData.password, 12);

  userData.password = hash;

  try {
    const user = await Users.add(userData);

    if (user) {
      const token = generateToken(user);
      res.status(201).json({ user, token });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error adding user to database' });
  }
});

router.post('/login', validateInputs, async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Users.findBy({ username });

    // Checks inputed password matches hashed password in database
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);

      res.status(200).json({ message: 'Login successful', token });
    } else {
      res.status(401).json({ message: 'Invalid Credentials' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving user from database' });
  }
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };

  const options = {
    expiresIn: '1h',
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
