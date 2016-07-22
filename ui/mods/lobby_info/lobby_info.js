(function() {
  "use strint"
  action_sets.general.lobby_info = function () {
    if (model.liSubmitLobbyInfo) model.liSubmitLobbyInfo()
  }
  api.settings.definitions.keyboard.settings.lobby_info = {
    title: 'submit lobby info',
    type: 'keybind',
    set: 'mods',
    display_group: 'mods',
    display_sub_group: 'lobby info',
    default: 'shift+ctrl+l'
  }

  if (model.settingDefinitions) {
    // force model.settingsLists to update
    model.settingDefinitions(api.settings.definitions)
  }

  api.Panel.message('', 'inputmap.reload');

  model.liLobbyInfo = function() {
    var name = model.gameName()
    return {
      name: name,
      id: name.replace(/\W/g, '').toLowerCase(),
      players: model.liPlayerNames(),
      planets: model.liPlanetNames()
    }
  }

  model.liSubmitLobbyInfo = function() {
    var info = model.liLobbyInfo()
    console.log(info)
    $.ajax({
      type: 'PUT',
      url: 'http://localhost:3000/games/'+info.id,
      data: JSON.stringify(info),
      contentType: 'application/json',
    })
  }
})()
