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
    values: [parseInt(id)]
  };

  const result = await db.query(query);
  if(result.rows.length){
    console.log('pas de data');
  }
  return result.rows;
}

module.exports = {
  getAllMember,
  getOneMember
};

// (async () =>{
//   console.log(await getOneMember(1))
// })()
