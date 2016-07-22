(function() {
  // model.system().planets[0].name
  model.liPlanetNames = ko.computed(function() {
    if (model.system().planets) {
      return model.system().planets.map(function(p) {return p.name})
    } else {
      return []
    }
  })

  // model.armies()[0].slots()[0].playerName()
  model.liPlayerNames = ko.computed(function() {
    return _.flatten(model.armies().map(function(a) {
      return a.slots().map(function(s) {
        return s.playerName()
      })
    }))
  })

  // model.gameName()
  model.liLobbyInfo = ko.computed(function() {
    var name = model.gameName() || ''
    return {
      name: name,
      id: name.replace(/\W/g, '').toLowerCase(),
      players: model.liPlayerNames(),
      planets: model.liPlanetNames()
    }
  })

  model.liLobbyInfo.subscribe(function(x) {
    console.log(x)
  })
})()
