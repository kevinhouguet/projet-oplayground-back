const dayjs = require('dayjs');
const datamapper = require('../../db/datamapper');

const ApiError = require('../../errors/ApiError');
const NotFoundError = require('../../errors/NotFound');

module.exports = {
  async eventList(req, res) {
    const { eventId } = req.params;
    const events = await datamapper.getAllEvent(parseInt(eventId, 10));

    res.status(200).json(events);
  },
  async addOneEvent(req, res) {
    const { userId } = req.params;
    const { terrain, event } = req.body;

    // if playground does already exists

    const playgroundExisting = await datamapper.isPlaygroundAlreadyInDB(terrain);

    if (!playgroundExisting) {
      // Start with insert playground in db
      const playground = await datamapper.addOnePlayground(terrain);
      event.playground_id = playground.id;
    } else {
      event.playground_id = playgroundExisting.id;
    }

    // after that, we add some property to event object and we insert event in db

    const startDateFormat = dayjs(event.start_date);

    event.member_id = userId;
    event.start_date = startDateFormat.format();
    event.stop_date = startDateFormat.add(2, 'hour').format();

    const isCalendarNotFree = await datamapper.isCalendarNotFree(
      startDateFormat,
      event.stop_date,
      event.playground_id,
    );

    if (isCalendarNotFree) {
      throw new ApiError('Not Free', '', 'Schedule is full');
    }

    const newEvent = await datamapper.addOneEvent(event);

    res.status(200).json(newEvent);
  },

  async updateOneEvent(req, res) {
    const { eventId } = req.params;
    const event = req.body;

    const isEventInDb = await datamapper.getOneEvent(parseInt(eventId, 10));

    if (!isEventInDb) {
      throw new NotFoundError();
    }

    event.id = parseInt(eventId, 10);

    const startDateFormat = dayjs(event.start_date);
    event.start_date = startDateFormat.format();
    event.stop_date = startDateFormat.add(2, 'hour').format();

    const isCalendarNotFree = await datamapper.isCalendarNotFree(
      startDateFormat,
      event.stop_date,
      event.playground_id,
    );

    if (isCalendarNotFree) {
      throw new ApiError('Not Free', '', 'Schedule is full');
    }

    const updatedEvent = await datamapper.updateOneEvent(event);

    res.status(200).json(updatedEvent);
  },

  async deleteOneEvent(req, res) {
    const { eventId } = req.params;

    const isEventInDb = await datamapper.getOneEvent(parseInt(eventId, 10));

    if (!isEventInDb) {
      throw new NotFoundError();
    }

    await datamapper.deleteOneEvent(parseInt(eventId, 10));

    res.status(202).end();
  },
};
