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

async function getAllEvent(userId) {
  const query = {
    text: 'SELECT * FROM "encounter" WHERE "member_id"=$1;',
    values: [userId],
  };
  const result = await db.query(query);
  return result.rows;
}

async function addOnePlayground(playground) {
  const query = {
    text: 'SELECT * FROM "insert_playground"($1);',
    values: [playground],
  };

  const result = await db.query(query);
  return result.rows[0];
}

async function addOneEvent(event) {
  const query = {
    text: 'SELECT * FROM "insert_encounter"($1);',
    values: [event],
  };
  const result = await db.query(query);
  return result.rows[0];
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
  addOnePlayground,
  addOneEvent,
};
