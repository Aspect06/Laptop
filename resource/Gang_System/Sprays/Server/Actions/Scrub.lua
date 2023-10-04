RPC.register('aspect_laptop:gangs:scrubSpray', function(source, Id)
    MySQL.query.await('DELETE FROM sprays WHERE id = @Id', {
        ['@Id'] = Id
    })

    TriggerClientEvent('aspect_laptop:gangs:updateAllSprays', -1)

    local Gangs = MySQL.query.await('SELECT * FROM gangs')

    for k, v in ipairs(Gangs) do
        Discovered = json.decode(v.DiscoveredSprays)
        
        for Sniped, Aspect in ipairs(Discovered) do
            if tonumber(Aspect.Id) == Id then
                table.remove(Discovered, Sniped)
                
                MySQL.query.await('UPDATE gangs SET DiscoveredSprays = @DiscoveredSprays WHERE name = @Name', {
                    ['@Name'] = v.name,
                    ['@DiscoveredSprays'] = json.encode(Discovered)
                })
            end
        end

        GangSprays = json.decode(v.GangSprays)

        for Aspect, Sniped in ipairs(GangSprays) do
            if tonumber(Sniped.Id) == Id then
                table.remove(GangSprays, Aspect)

                MySQL.query.await('UPDATE gangs SET GangSprays = @GangSprays WHERE name = @Name', {
                    ['@Name'] = v.name,
                    ['@GangSprays'] = json.encode(GangSprays)
                })

                -- Alert all gang members online that spray is being scrubbed.
            end
        end
    end
end)