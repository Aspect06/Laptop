RPC.register('aspect_laptop:settings:setBackground', function(source, data)
    local src = source
    local user = exports['aspect_framework']:GetModule('GetPlayer')(src)

    local Select = MySQL.query.await('SELECT * FROM characters WHERE id = @Id', {
        ['@Id'] = user['PlayerData']['id']
    })

    local Data = json.decode(Select[1].laptopData)

    Data.background = data.Wallpaper

    MySQL.query.await('UPDATE characters SET laptopData = @laptopData WHERE id = @Id', {
        ['@Id'] = user['PlayerData']['id'],
        ['@laptopData'] = json.encode(Data)
    })
end)

RPC.register('aspect_laptop:settings:setDarkMode', function(source, data)
    local src = source
    local user = exports['aspect_framework']:GetModule('GetPlayer')(src)

    local Select = MySQL.query.await('SELECT * FROM characters WHERE id = @Id', {
        ['@Id'] = user['PlayerData']['id']
    })

    local Data = json.decode(Select[1].laptopData)

    Data.darkMode = data.DarkMode

    MySQL.query.await('UPDATE characters SET laptopData = @laptopData WHERE id = @Id', {
        ['@Id'] = user['PlayerData']['id'],
        ['@laptopData'] = json.encode(Data)
    })
end)

RPC.register('aspect_laptop:getSettings', function(source)
    local src = source
    local user = exports['aspect_framework']:GetModule('GetPlayer')(src)
    local Query = MySQL.query.await('SELECT * FROM characters WHERE id = @STATE_ID', {
        ['@STATE_ID'] = user['PlayerData']['id']
    })

    return json.decode(Query[1].laptopData)
end)