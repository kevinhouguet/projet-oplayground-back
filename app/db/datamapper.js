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
    values: [parseInt(id)],
  };

  const result = await db.query(query);
  if (result.rows.length) {
    console.log('pas de data');
  }
  return result.rows[0];
}

async function getOneMemberByEmail(email) {
  const query = {
    text: 'SELECT * FROM "member" WHERE email=$1;',
    values: [email],
  };

  const result = await db.query(query);
  if (result.rows.length) {
    console.log('pas de data');
  }
  return result.rows[0];
}

async function getOneMemberByUsername(username) {
  const query = {
    text: 'SELECT * FROM "member" WHERE username=$1;',
    values: [username],
  };

  const result = await db.query(query);
  if (result.rows.length) {
    console.log('pas de data');
  }
  return result.rows[0];
}

async function addOneMember(memberObject) {
  console.log(memberObject);
  const query = {
    text: 'SELECT * FROM "insert_member"($1);',
    values: [memberObject],
  };
  console.log(query);

  const result = await db.query(query);
  if (result.rows.length) {
    console.log('pas de data');
  }
  return result.rows[0];
}

module.exports = {
  getAllMember,
  getOneMember,
  getOneMemberByEmail,
  addOneMember,
  getOneMemberByUsername,
};
