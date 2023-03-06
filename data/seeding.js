const { createData, insertData } = require('./buildData');
const getCommunes = require('./getCommunes');

(async () => {
  const communes = await getCommunes();

  Array.from({ length: 10 }, async () => {
    const member = await createData.createRandomMember(communes);
    console.log(member);
    const newMember = await insertData.insertMember(member);

    const playground = await createData.createRandomPlayground(communes);
    console.log(playground);
    const newPlayground = await insertData.insertPlayground(playground);

    const event = await createData.createRandomEvent();
    console.log(event);
    const newEvent = await insertData.insertEvent(event);
  });
})();
