const datamapper = require('../../db/datamapper');

module.exports = {
  async eventList(req, res) {
    const events = datamapper.getAllEvent();

    res.statusCode(200).json(events);
  },
};
