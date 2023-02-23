module.exports = {
  getTerrains(req, res) {
    res.json({ message: 'voici la liste des terrains' });
  },

  playgroundList:(req,res) => {
    res.json({message:'salut noob'})
  },

  playgroundById:(req,res) => {
  res.json({message:'salut terrain'})

  },

  playgroundEvent:(req,res) => {
  res.json({message:'bienvenue dans mon event'})
  
    }
}
