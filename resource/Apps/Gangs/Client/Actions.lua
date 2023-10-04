Sprays = {
    Toggle = false,
    ActiveSprays = {},
    SprayColor = 0
}

RegisterNUICallback('aspect_laptop:gangs:addMember', function(data, cb)
    local InGang = RPC.execute('aspect_laptop:gangs:addMember', data)

    Wait(500)
    if InGang ~= 'In Gang' then
        NUI.sendReactMessage('aspect_laptop:gangs:fetchGang')

        NUI.sendReactMessage('aspect_laptop:createNotification', {
            Label = 'Successfully added ' .. data.stateId,
            App = 'Gangs'
        })
    else
        NUI.sendReactMessage('aspect_laptop:createNotification', {
            Label = 'This person is already in a gang.',
            App = 'Gangs'
        })
    end

    cb(true)
end)

RegisterNUICallback('aspect_laptop:gangs:kickMember', function(data, cb)
    RPC.execute('aspect_laptop:gangs:kickMember', data)

    NUI.sendReactMessage('aspect_laptop:createNotification', {
        Label = 'Successfully kicked member.',
        App = 'Gangs'
    })

    Wait(500)
    NUI.sendReactMessage('aspect_laptop:gangs:fetchGang')

    cb(true)
end)

RegisterNUICallback('aspect_laptop:gangs:setRank', function(data, cb)
    RPC.execute('aspect_laptop:gangs:setRank', data)

    Wait(500)
    NUI.sendReactMessage('aspect_laptop:gangs:fetchGang')

    cb(true)
end)

ActiveSprays = {}

RegisterNUICallback('aspect_laptop:gangs:toggleDiscoveredGraffiti', function(data, cb)
    Sprays.Toggle = not Sprays.Toggle

    if Sprays.Toggle then
        TriggerEvent('aspect_ui:sentNotification', 'info', 'Discovered graffitis marked', 5000)
        RPC.execute('aspect_laptop:gangs:toggleDiscoveredGraffitis')
    else
        TriggerEvent('aspect_ui:sentNotification', 'error', 'Discovered graffitis hidden', 5000)
        for k, v in pairs(ActiveSprays) do
            RemoveBlip(v.Blip)
            ActiveSprays[k] = nil
        end
    end
end)

RegisterNetEvent('aspect_laptop:gangs:addMapSpray')
AddEventHandler('aspect_laptop:gangs:addMapSpray', function(Spray, SprayModel)
    local ColorConfig = RPC.execute('aspect_laptop:gangs:passGangConfig', 'Spray Colors')

    for k, v in ipairs(ColorConfig) do
        if v.Model == SprayModel then
            Sprays.SprayColor = v.Color
        end
    end

    Blip = AddBlipForRadius(tonumber(Spray.Coords.x), tonumber(Spray.Coords.y), tonumber(Spray.Coords.z), 100.0)
    SetBlipHighDetail(Blip, true)
    SetBlipColour(Blip, Sprays.SprayColor)
    SetBlipAlpha (Blip, 128)

    ActiveSprays[#ActiveSprays + 1] = {
        Blip = Blip,
    }
end)

RegisterNUICallback('aspect_laptop:gangs:leaveGang', function(data, cb)
    RPC.execute('aspect_laptop:gangs:leaveGang', data)

    NUI.sendReactMessage('aspect_laptop:gangs:checkInGang')
    NUI.sendReactMessage('aspect_laptop:createNotification', {
        Label = 'Successfully left ' .. data.Gang,
        App = 'Gangs'
    })

    cb(true)
end)