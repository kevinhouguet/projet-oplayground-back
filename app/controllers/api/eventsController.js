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

    // if playground does already exists

    const playgroundExisting = await datamapper.getOnePlayground(terrain);

    if (!playgroundExisting) {
      // Start with insert playground in db
      const playground = await datamapper.addOnePlayground(terrain);
      event.playground_id = playground.id;
    } else {
      event.playground_id = playgroundExisting.id;
    }

    // after that, we add some property to event object and we insert event in db

    const startDateFormat = dayjs(event.start_date);

    event.member_id = id;
    event.start_date = startDateFormat.format();
    event.stop_date = startDateFormat.add(2, 'hour').format();

    const newEvent = await datamapper.addOneEvent(event);

    res.status(200).json(newEvent);
  },

  async updateOneEvent(req, res) {
    const { id } = req.params;
    const event = req.body;

    const startDateFormat = dayjs(event.start_date);
    event.start_date = startDateFormat.format();
    event.stop_date = startDateFormat.add(2, 'hour').format();

    const isCalendarNotFree = await datamapper.isCalendarNotFree(
      startDateFormat,
      event.stop_date,
      event.playground_id,
    );

    if (isCalendarNotFree) {
      throw new Error('calendar full at this date');
    }

    const updatedEvent = await datamapper.updateOneEvent(event);

    res.status(200).json(updatedEvent);
  },
};
