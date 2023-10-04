RPC.register('aspect_laptop:gangs:discoverSpray', function(source, Array)
    local src = source
    local Gang = Gangs.FetchGang(src)

    local Sprays = json.decode(Gang.DiscoveredSprays)

    table.insert(Sprays, {
        Id = Array.Id,
        Coords = Array.Coords,
    })

    MySQL.query.await('UPDATE gangs SET DiscoveredSprays = @DiscoveredSprays WHERE name = @Name', {
        ['@Name'] = Gang.name,
        ['@DiscoveredSprays'] = json.encode(Sprays)
    })
end)

RPC.register('aspect_laptop:gangs:alreadyDiscovered', function(source, Id)
    local src = source
    local Gang = Gangs.FetchGang(src)

    local Sprays = json.decode(Gang.DiscoveredSprays)
    local returnValue = false

    for k, v in ipairs(Sprays) do
        if tonumber(Id) == tonumber(v.Id) then
            returnValue = true
        end
    end

    return returnValue
end)

RPC.register('aspect_laptop:gangs:toggleDiscoveredGraffitis', function(source)
    local src = source
    local Gang = Gangs.FetchGang(src)

    local Sprays = json.decode(Gang.DiscoveredSprays)

    for k, v in ipairs(Sprays) do
        local SprayModel = MySQL.query.await('SELECT * FROM sprays WHERE id = @Id', {
            ['@Id'] = v.Id
        })

        TriggerClientEvent('aspect_laptop:gangs:addMapSpray', src, v, SprayModel[1].Model)
    end
end)

RPC.register('aspect_laptop:gangs:getSprayModelFromId', function(source, Id)
    local Spray = MySQL.query.await('SELECT * FROM sprays WHERE id = @Id', {
        ['@Id'] = Id
    })

    return Spray[1].Model
end)