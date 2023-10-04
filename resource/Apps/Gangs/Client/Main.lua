RegisterNUICallback('aspect_laptop:fetchInGang', function(data, cb)
    local InGang = RPC.execute('aspect_laptop:gangs:checkInGang')

    cb(InGang)
end)

RegisterNUICallback('aspect_laptop:gangs:fetchCharacterData', function(data, cb)
    local Data = RPC.execute('aspect_laptop:gangs:checkRank')

    cb(Data)
end)

RegisterNUICallback('aspect_laptop:gangs:fetchGang', function(data, cb)
    local Gang = RPC.execute('aspect_laptop:gangs:fetchGang')

    cb(Gang)
end)

RegisterNUICallback('aspect_laptop:gangs:getRoleData', function(data, cb)
    local Role = RPC.execute('aspect_laptop:gangs:fetchRole', data)

    cb(Role)
end)