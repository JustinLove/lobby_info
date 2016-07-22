(function() {
  // model.celestialViewModels()[0].name(), not last
  model.liPlanetNames = ko.computed(function() {
    return _.compact(model.celestialViewModels().map(function(p) {return p.name()}))
  })

  // model.players()[0].name
  model.liPlayerNames = ko.computed(function() {
    return model.players().map(function(a) { return a.name })
  })

  model.liLobbyInfo = ko.computed(function() {
    var name = 'Current Game'
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
