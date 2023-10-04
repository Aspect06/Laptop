RPC.register('aspect_laptop:gangs:getSprayModel', function(source)
    local src = source
    return Gangs.FetchGang(src).sprayModel
end)

RPC.register('aspect_laptop:gangs:syncPlaceSpray', function(source, Array)
    local src = source
    local Gang = Gangs.FetchGang(src)

    MySQL.query.await('INSERT INTO sprays (Gang, Model, x, y, z, Heading) VALUES (@Gang, @Model, @X, @Y, @Z, @Heading)', {
        ['@Gang'] = Gang.name,
        ['@Model'] = Array.Spray,
        ['@X'] = Array.Coords.x,
        ['@Y'] = Array.Coords.y,
        ['@Z'] = Array.Coords.z,
        ['@Heading'] = Array.Coords.Heading,
    })

    local Select = MySQL.query.await('SELECT * FROM sprays ORDER BY id DESC LIMIT 1')

    Spray = {
        Name = Select[1].Gang,
        Id = Select[1].id,
        Spray = Select[1].Model,
        Coords = {
            x = Select[1].x,
            y = Select[1].y,
            z = Select[1].z,
            Heading = Select[1].Heading
        }
    }

    TriggerClientEvent('aspect_laptop:gangs:syncClientSpray', -1, Spray)

    local Sprays = json.decode(Gang.DiscoveredSprays)

    table.insert(Sprays, {
        Id = Select[1].id,
        Coords = {
            x = Select[1].x,
            y = Select[1].y,
            z = Select[1].z,
        },
    })

    MySQL.query.await('UPDATE gangs SET DiscoveredSprays = @DiscoveredSprays WHERE name = @Name', {
        ['@Name'] = Gang.name,
        ['@DiscoveredSprays'] = json.encode(Sprays)
    })

    local SpraysSprayed = json.decode(Gang.GangSprays)

    table.insert(SpraysSprayed, {
        Id = Select[1].id,
        Coords = {
            x = Select[1].x,
            y = Select[1].y,
            z = Select[1].z,
        },
    })

    MySQL.query.await('UPDATE gangs SET GangSprays = @GangSprays WHERE name = @Name', {
        ['@Name'] = Gang.name,
        ['@GangSprays'] = json.encode(SpraysSprayed)
    })
end)

RPC.register('aspect_laptop:gangs:getAllSprays', function(source)
    local src = source
    local Select = MySQL.query.await('SELECT * FROM sprays')

    Sprayz = {}

    for k, v in ipairs(Select) do
        Sprayz = {
            Name = v.Gang,
            Id = v.id,
            Spray = v.Model,
            Coords = {
                x = v.x,
                y = v.y,
                z = v.z,
                Heading = v.Heading
            }
        }

        TriggerClientEvent('aspect_laptop:gangs:syncClientSpray', src, Sprayz)
    end
end)