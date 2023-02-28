const db = require('./index');

async function getAllMember() {
  const query = {
    text: 'SELECT * FROM "member";',
  };

  const result = await db.query(query);
  return result.rows;
}

async function getOneMember(id) {
  const query = {
    text: 'SELECT * FROM "member" WHERE id=$1;',
    values: [id],
  };

  const result = await db.query(query);
  return result.rows[0];
}

async function getOneMemberByEmail(email) {
  const query = {
    text: 'SELECT * FROM "member" WHERE email=$1;',
    values: [email],
  };

  const result = await db.query(query);
  return result.rows[0];
}

async function getOneMemberByUsername(username) {
  const query = {
    text: 'SELECT * FROM "member" WHERE username=$1;',
    values: [username],
  };

  const result = await db.query(query);
  return result.rows[0];
}

async function addOneMember(memberObject) {
  const query = {
    text: 'SELECT * FROM "insert_member"($1);',
    values: [memberObject],
  };

  const result = await db.query(query);
  return result.rows[0];
}

async function deleteOneMember(id) {
  const query = {
    text: 'DELETE FROM "member" WHERE id=$1',
    values: [id],
  };

  await db.query(query);
}

async function updateOneMember(userObject, id) {
  const query = {
    text: 'SELECT * FROM "update_member"($1,$2);',
    values: [userObject, id],
  };

  const result = await db.query(query);
  return result.rows[0];
}

async function getAllEvent() {
  const query = {
    text: 'SELECT * FROM "encounter";',
  };
  const result = db.query(query);
  return result.rows;
}

module.exports = {
  getAllMember,
  getOneMember,
  getOneMemberByEmail,
  addOneMember,
  getOneMemberByUsername,
  deleteOneMember,
  updateOneMember,
  getAllEvent,
};
