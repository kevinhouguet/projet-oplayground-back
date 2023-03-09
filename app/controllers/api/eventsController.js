const dayjs = require('dayjs');
const datamapper = require('../../db/datamapper');

const ApiError = require('../../errors/ApiError');
const NotFoundError = require('../../errors/NotFound');
const ApiForbiddenError = require('../../errors/ApiForbiddenError');

module.exports = {
  async eventList(req, res) {
    const { id: userId } = req.user;
    const events = await datamapper.getAllEvent(parseInt(userId, 10));
    if (!events) throw new NotFoundError();

    events.map((element) => {
      element.startDate = dayjs(element.start_date).format('DD-MM-YYYY');
      element.startHour = dayjs(element.start_date).format('HH:mm');
      element.stopDate = dayjs(element.stop_date).format('DD-MM-YYYY');
      element.stopHour = dayjs(element.stop_date).format('HH:mm');

      element.start_date = dayjs(element.start_date).format('DD/MM/YYYY - HH:mm');
      element.stop_date = dayjs(element.stop_date).format('DD/MM/YYYY - HH:mm');
      return true;
    });

    res.status(200).json(events);
  },
  async addOneEvent(req, res) {
    const { id: userId } = req.user;
    const event = req.body;

    // if playground does already exists

    const playgroundExisting = await datamapper.isPlaygroundAlreadyInDB(event.playgroundId);

    if (!playgroundExisting) {
      const url = `https://equipements.sports.gouv.fr/api/records/1.0/search/?dataset=data-es&q=recordid%3D${event.playgroundId}`;
      const httpResponse = await fetch(url);
      const data = await httpResponse.json();

      await Promise.all(data.records.map(async (playground) => {
        const playgroundFormat = {
        // Voir doc api data-es : https://equipements.sports.gouv.fr/explore/dataset/data-es/information/
          name: playground.fields.nomequipement,
          surface: playground.fields.caract167,
          type: playground.fields.typequipement,
          address: playground.fields.adresse,
          zipCode: playground.fields.codepostal,
          city: playground.fields.commune,
          public: playground.fields.caract159,
          playgroundId: playground.recordid,
        };
        await datamapper.addOnePlayground(playgroundFormat);
      }));
    }

    // after that, we add some property to event object and we insert event in db

    const startDateFormat = dayjs(event.start_date);

    event.member_id = parseInt(userId, 10);
    event.start_date = startDateFormat.format();
    event.stop_date = startDateFormat.add(2, 'hour').format();

    const isCalendarNotFree = await datamapper.isCalendarNotFree(
      event.start_date,
      event.stop_date,
      event.playgroundId,
    );

    if (isCalendarNotFree) throw new ApiError('Not Free', '', 'Schedule is full');

    const newEvent = await datamapper.addOneEvent(event);

    const newEventToSend = await datamapper.getOneEventWithAuthor(newEvent.id);

    newEventToSend.startDate = dayjs(newEventToSend.start_date).format('DD-MM-YYYY');
    newEventToSend.startHour = dayjs(newEventToSend.start_date).format('HH:mm');
    newEventToSend.stopDate = dayjs(newEventToSend.stop_date).format('DD-MM-YYYY');
    newEventToSend.stopHour = dayjs(newEventToSend.stop_date).format('HH:mm');

    newEventToSend.start_date = dayjs(newEventToSend.start_date).format('DD/MM/YYYY - HH:mm');
    newEventToSend.stop_date = dayjs(newEventToSend.stop_date).format('DD/MM/YYYY - HH:mm');

    res.status(200).json(newEventToSend);
  },

  async updateOneEvent(req, res) {
    const { eventId } = req.params;
    const { id: userId } = req.user;
    const event = req.body;

    const isEventInDb = await datamapper.getOneEvent(parseInt(eventId, 10));
    if (!isEventInDb) throw new NotFoundError();
    if (isEventInDb.member_id !== parseInt(userId, 10)) throw new ApiForbiddenError('Token id and Member id in event are not the same');

    event.id = parseInt(eventId, 10);

    const startDateFormat = dayjs(event.start_date || isEventInDb.start_date);
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

    const eventFilled = { ...isEventInDb, ...event };

    const updatedEvent = await datamapper.updateOneEvent(eventFilled);

    updatedEvent.startDate = dayjs(updatedEvent.start_date).format('DD-MM-YYYY');
    updatedEvent.startHour = dayjs(updatedEvent.start_date).format('HH:mm');
    updatedEvent.stopDate = dayjs(updatedEvent.stop_date).format('DD-MM-YYYY');
    updatedEvent.stopHour = dayjs(updatedEvent.stop_date).format('HH:mm');

    updatedEvent.start_date = dayjs(updatedEvent.start_date).format('DD/MM/YYYY - HH:mm');
    updatedEvent.stop_date = dayjs(updatedEvent.stop_date).format('DD/MM/YYYY - HH:mm');

    res.status(200).json(updatedEvent);
  },

  async deleteOneEvent(req, res) {
    const { eventId } = req.params;
    const { id: userId } = req.user;

    const isEventInDb = await datamapper.getOneEvent(parseInt(eventId, 10));

    if (!isEventInDb) throw new NotFoundError();
    if (isEventInDb.member_id !== parseInt(userId, 10)) throw new ApiForbiddenError('Token id and Member id in event are not the same');

    await datamapper.deleteOneEvent(parseInt(eventId, 10));

    res.status(202).end();
  },
};
