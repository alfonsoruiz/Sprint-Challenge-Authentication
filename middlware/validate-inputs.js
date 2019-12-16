module.exports = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username && !password) {
    res
      .status(400)
      .json({ message: 'Username and Password required' })
      .end();
  } else if (!username) {
    res
      .status(400)
      .json({ message: 'Username required' })
      .end();
  } else if (!password) {
    res
      .status(400)
      .json({ message: 'Password required' })
      .end();
  } else {
    next();
  }
};
