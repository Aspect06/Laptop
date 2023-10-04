RegisterNUICallback('aspect_laptop:gangs:createRank', function(data, cb)
    RPC.execute('aspect_laptop:gangs:createRank', data)

    Wait(500)
    NUI.sendReactMessage('aspect_laptop:gangs:fetchGang')

    cb(true)
end)

RegisterNUICallback('aspect_laptop:gangs:deleteRank', function(data, cb)
    RPC.execute('aspect_laptop:gangs:deleteRank', data)

    Wait(500)
    NUI.sendReactMessage('aspect_laptop:gangs:fetchGang')

    cb(true)
end)

RegisterNUICallback('aspect_laptop:gangs:updateRank', function(data, cb)
    RPC.execute('aspect_laptop:gangs:updateRank', data)

    Wait(500)
    NUI.sendReactMessage('aspect_laptop:gangs:fetchGang')

    cb(true)
end)