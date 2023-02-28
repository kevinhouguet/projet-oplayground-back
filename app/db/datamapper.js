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

async function isCalendarNotFree(startDate, stopDate, playgroundId) {
  const query = {
    text: ` SELECT * FROM "encounter" 
            WHERE "playground_id"=$1 AND "start_date" BETWEEN $2 AND $3;`,
    values: [playgroundId, startDate, stopDate],
  };

  const result = await db.query(query);
  return result.rows[0];
}

async function updateOneEvent(eventObject) {
  const query = {
    text: 'SELECT * FROM "update_encounter"($1);',
    values: [eventObject],
  };

  const result = await db.query(query);
  return result.rows[0];
}

async function getOnePlayground(playgroundObject) {
  const query = {
    text: ` SELECT * FROM "playground"
            WHERE "name" = $1
            AND "surface" = $2
            AND "address" = $3
            AND "zip_code" = $4
            AND "city" = $5;`,
    values: [
      playgroundObject.name,
      playgroundObject.surface,
      playgroundObject.address,
      playgroundObject.zip_code,
      playgroundObject.city,
    ],
  };

  const result = await db.query(query);
  return result.rows[0];
}

async function getOneEvent(id) {
  const query = {
    text: ' SELECT * FROM "encounter" WHERE id=$1',
    values: [id],
  };

  const result = await db.query(query);
  return result.rows[0];
}

async function deleteOneEvent(id) {
  const query = {
    text: ' DELETE FROM "encounter" WHERE id=$1',
    values: [id],
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
  isCalendarNotFree,
  updateOneEvent,
  getOneEvent,
  deleteOneEvent,
};
