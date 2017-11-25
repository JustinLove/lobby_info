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
    var name = model.gameName() || ''
    var id = api.settings.isSet('ui', 'donation_panel_current_match', true) || name.replace(/\W/g, '').toLowerCase()
    return {
      name: name,
      id: id,
      players: model.liPlayerNames(),
      planets: model.liPlanetNames()
    }
  }

  model.liMessage = function(callback) {
    var info = model.liLobbyInfo()
    console.log(info)
    var sinfo = JSON.stringify(info)
    nacl_factory.instantiate(function(nacl) {
      var binfo = nacl.encode_utf8(sinfo)
      var signed = nacl.crypto_sign(binfo, nacl.from_hex(model.liSecretKey))
      callback({
        id: info.id,
        data: nacl.to_hex(signed),
      })
    })
  }

  model.liSubmitLobbyInfo = function() {
    model.liMessage(function(message) {
      console.log(message)
      $.ajax({
        type: 'PUT',
        //url: 'http://localhost:5000/games/'+message.id,
        url: 'https://ablegamers2017.herokuapp.com/games/'+message.id,
        data: JSON.stringify(message),
        contentType: 'application/json',
      })
    })
  }
})()
