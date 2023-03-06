const db = require('./index');

/**
 * A member
 * @typedef {Object} Member
 * @property {number} id - The member id
 * @property {string} email - The member email
 * @property {string} username - The member username
 * @property {string} password - The member password
 * @property {string} firstname - The member firstname
 * @property {string} avatar - The member avatar
 * @property {string} username - The member username
 * @property {number} age - The member age
 * @property {string} sexe - The member gender
 * @property {string} city - The member city location
 */

/**
 * An Event
 * @typedef {Object} Event
 * @property {number} id - The event id
 * @property {string} name - The event name
 * @property {TIMESTAMPTZ} start_date - The event start date
 * @property {TIMESTAMPTZ} start_date - The event stop date
 * @property {number} max_player - The event maximum player
 * @property {number} member_id - The member id of creator
 * @property {number} playground_id - The playground where the event is
 */

/**
 * Function that retrieve all members in db
 * @returns {Member[]}
 */
async function getAllMember() {
  const query = {
    text: 'SELECT * FROM "member";',
  };

  const result = await db.query(query);
  return result.rows;
}
/**
 * Retrieve one member in db by his id
 * @param {number} id
 * @returns {Object}
 */
async function getOneMember(id) {
  const query = {
    text: 'SELECT * FROM "member" WHERE id=$1;',
    values: [id],
  };

  const result = await db.query(query);
  return result.rows[0];
}
/**
 * Retrieve one member in db by his email
 * @param {string} email
 * @returns {Object}
 */
async function getOneMemberByEmail(email) {
  const query = {
    text: 'SELECT * FROM "member" WHERE email=$1;',
    values: [email],
  };

  const result = await db.query(query);
  return result.rows[0];
}
/**
 * Retrieve one member in db by his usename
 * @param {string} username
 * @returns {Object}
 */
async function getOneMemberByUsername(username) {
  const query = {
    text: 'SELECT * FROM "member" WHERE username=$1;',
    values: [username],
  };

  const result = await db.query(query);
  return result.rows[0];
}
/**
 * Add one member by his own object
 * @param {Member} memberObject - the member object to add
 * @returns {Member}
 */
async function addOneMember(memberObject) {
  const query = {
    text: 'SELECT * FROM "insert_member"($1);',
    values: [memberObject],
  };

  const result = await db.query(query);
  return result.rows[0];
}
/**
 * Delete one member by his id
 * @param {number} id - id of member to delete
 */
async function deleteOneMember(id) {
  const query = {
    text: 'DELETE FROM "member" WHERE id=$1',
    values: [id],
  };

  await db.query(query);
}
/**
 * Update one member by his own object and his id
 * @param {Member} userObject - member object to update
 * @param {number} id - id of member that need to update
 * @returns {Member}
 */
async function updateOneMember(userObject, id) {
  const query = {
    text: 'SELECT * FROM "update_member"($1,$2);',
    values: [userObject, id],
  };

  const result = await db.query(query);
  return result.rows[0];
}
/**
 * Retrieve all event in db
 * @param {*} userId
 * @returns
 */
async function getAllEvent(userId) {
  const query = {
    text: 'SELECT * FROM "encounter" WHERE "member_id"=$1;',
    values: [userId],
  };
  const result = await db.query(query);
  return result.rows;
}

async function getAllEventByPlaygroundId(playgroundId) {
  const query = {
    text: ` SELECT "encounter".*, "member"."email" as "author_email"  FROM "encounter"
            INNER JOIN "member" ON "member"."id" = "encounter"."member_id"
            WHERE "encounter"."playground_id"=$1`,
    values: [playgroundId],
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

async function isCalendarNotFree(startDate, stopDate, playgroundId, eventId) {
  const query = {
    text: ` SELECT * FROM "encounter" 
            WHERE "playground_id"=$1 
            AND "encounter"."id" <> $4
            AND "start_date" BETWEEN $2 AND $3;`,
    values: [playgroundId, startDate, stopDate, eventId],
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

async function isPlaygroundAlreadyInDB(playgroundId) {
  const query = {
    text: ` SELECT * FROM "playground"
            WHERE "id"=$1;`,
    values: [
      playgroundId,
    ],
  };
  const result = await db.query(query);
  // console.log(result.rows[0]);
  return result.rows[0];
}

async function isPlaygroundAlreadyInDBByPlaygroundObj(playgroundObject) {
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
      playgroundObject.zipCode,
      playgroundObject.city,
    ],
  };
  const result = await db.query(query);
  // console.log(result.rows[0]);
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

async function getOneEventWithAuthor(id) {
  const query = {
    text: ` SELECT "encounter".*, "member"."email"  FROM "encounter"
            INNER JOIN "member" ON "member"."id" = "encounter"."member_id"
            WHERE id=$1`,
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
  isPlaygroundAlreadyInDB,
  getAllEventByPlaygroundId,
  getOneEventWithAuthor,
};
