module.exports = {

  playgroundList: (req, res) => {
    res.json({ message: 'salut noob' });
    // throw new Error('salut');
  },

  playgroundById: (req, res) => {
    res.json({ message: 'salut terrain' });
  },

  playgroundEvent: (req, res) => {
    res.json({ message: 'bienvenue dans mon event' });
  },
};
