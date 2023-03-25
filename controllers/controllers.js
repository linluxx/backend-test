const db = require("../db");

const { customAlphabet } = require("nanoid");

const nanoid = customAlphabet("1234567890", 18);

async function getUsers(req, res) {
  try {
    const role = req.query.role;

    let query = `SELECT users.id, users.username, users.email, users.username, users.role, profiles.first_name, profiles.last_name, profiles.state
                 FROM users
                 JOIN profiles ON users.profileid = profiles.id`;

    if (role) {
      query += ` WHERE users.role = '${role}'`;
    }

    const result = await db.query(query);
    const users = result.rows;

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error");
  }
}

async function addUser(req, res) {
  const { username, email, firstName, lastName, state, role } = req.body;
  const randomUserId = nanoid();
  const randomProfileId = nanoid();
  try {
    const result = await db.query(
      "INSERT INTO profiles ( id, first_name, last_name, state) VALUES ($1, $2, $3, $4) RETURNING *",
      [randomProfileId, firstName, lastName, state]
    );
    const profileId = result.rows[0].id;
    await db.query(
      "INSERT INTO users (id, username, email, role, profileid) VALUES ($1, $2, $3, $4, $5)",
      [randomUserId, username, email, role, profileId]
    );

    res.status(201).json(`User ${email} was successfully added`);
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error");
  }
}

async function updateUser(req, res) {
  try {
    const userId = req.params.id;
    const { username, email, firstName, lastName, state, role } = req.body;

    await db.query(
      "UPDATE users SET username=$1, email=$2, role=$3 WHERE id=$4",
      [username, email, role, userId]
    );

    const result = await db.query("SELECT profileid FROM users WHERE id=$1", [
      userId,
    ]);
    const profileId = result.rows[0].profile_id;

    await db.query(
      "UPDATE profiles SET first_name=$1, last_name=$2, state=$3 WHERE id=$4",
      [firstName, lastName, state, profileId]
    );

    res.status(200).json(`User was successfully updated`);
  } catch (error) {
    console.error(error);

    res.status(500).json("Server error");
  }
}

async function deleteUser(req, res) {
  const userId = req.params.id;

  try {
    const result = await db.query("SELECT profileid FROM users WHERE id = $1", [
      userId,
    ]);

    const profileId = result.rows[0].profileid;

    await db.query("DELETE FROM users WHERE id = $1", [userId]);
    await db.query("DELETE FROM profiles WHERE id = $1", [profileId]);

    res.status(200).json(`User was successfully deleted`);
  } catch (error) {
    console.error(error);

    res.status(500).json("Server error");
  }
}

module.exports = { getUsers, updateUser, addUser, deleteUser };
