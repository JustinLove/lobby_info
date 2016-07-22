(function() {
  "use strint"

  // model.celestialViewModels()[0].name(), not last
  model.liPlanetNames = function() {
    return _.compact(model.celestialViewModels().map(function(p) {return p.name()}))
  }

  // model.players()[0].name
  model.liPlayerNames = function() {
    return model.players().map(function(a) { return a.name })
  }

  model.gameName = function() {return "Current Game"}
})()
