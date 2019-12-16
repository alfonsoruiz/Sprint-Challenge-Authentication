const db = require('../database/dbConfig');

module.exports = {
  add,
  findBy,
  findById,
};

// Returns an array with one element containing the primary key of the item inserted into databse
async function add(user) {
  const [id] = await db('users').insert(user);

  return findById(id);
}

// Returns first item in database with the same key value pairs as object being passed in
function findBy(filter) {
  return db('users')
    .where(filter)
    .first();
}

// Returns first item in database with the same key value pair as object being passed in
function findById(id) {
  return db('users')
    .where({ id })
    .first();
}
