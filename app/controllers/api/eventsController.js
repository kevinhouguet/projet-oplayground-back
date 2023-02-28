const dayjs = require('dayjs');
const datamapper = require('../../db/datamapper');

module.exports = {
  async eventList(req, res) {
    const { id } = req.params;
    const events = await datamapper.getAllEvent(parseInt(id, 10));

    res.status(200).json(events);
  },
  async addOneEvent(req, res) {
    const { id } = req.params;
    const { terrain, event } = req.body;

    // Start with insert playground in db

    const playground = await datamapper.addOnePlayground(terrain);

    // after that, we add some property to event object and we insert event in db

    const startDateFormat = dayjs(event.start_date);

    event.member_id = id;
    event.start_date = startDateFormat.format();
    event.stop_date = startDateFormat.add(2, 'hour').format();
    event.playground_id = playground.id;

    const newEvent = await datamapper.addOneEvent(event);

    res.status(200).json(newEvent);
  },
};
