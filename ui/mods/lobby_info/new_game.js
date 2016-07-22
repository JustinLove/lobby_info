(function() {
  "use strict"

  // model.system().planets[0].name
  model.liPlanetNames = function() {
    if (model.system().planets) {
      return model.system().planets.map(function(p) {return p.name})
    } else {
      return []
    }
  }

  // model.armies()[0].slots()[0].playerName()
  model.liPlayerNames = function() {
    return _.flatten(model.armies().map(function(a) {
      return a.slots().map(function(s) {
        return s.playerName()
      })
    }))
  }
})()
