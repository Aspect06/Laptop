GangSprays = {
    Functions = {
        GetSprays = function(src)
            local Gang = Gangs.FetchGang(src)

            return json.decode(Gang.GangSprays)
        end,
    }
}

RPC.register('aspect_laptop:gangs:fetchSprays', function(source)
    local src = source
    local Sprays = GangSprays.Functions.GetSprays(src)

    return Sprays
end)

RPC.register('aspect_laptop:gangs:fetchAllSprays', function()
    local Sprays = MySQL.query.await('SELECT * FROM sprays')

    return Sprays
end)