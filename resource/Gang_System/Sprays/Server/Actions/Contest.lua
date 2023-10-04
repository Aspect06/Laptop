SpraysContest = {
    startContesting = function(src, Id, NewModel, Name)
        local Gang = Gangs.FetchGang(src)
        local Spray = MySQL.query.await('SELECT * FROM sprays WHERE id = @Id', {
            ['@Id'] = Id
        })

        -- Inform all gang members of the location of spray and gang contesting.
        -- Check if people in that gang are in the server.

        Contest = {
            ContestedBy = Gang.name,
            BeingContested = true
        }

        MySQL.query.await('UPDATE sprays SET Contest = @Contested WHERE id = @Id', {
            ['@Id'] = Id,
            ['@Contested'] = json.encode(Contest)
        })

        SpraysContest.ContestThread(src, Id, NewModel, Gang.name, Spray[1].id, Name)
    end,

    ContestThread = function(src, Id, Model, GangName, SprayId, Name)
        -- Wait(600000)
        Wait(10000)

        local Select = MySQL.query.await('SELECT * FROM sprays WHERE id = @Id', {
            ['@Id'] = Id
        })

        local Contested = json.decode(Select[1].Contest)

        if Contested.BeingContested then
            Contest = {
                ContestedBy = '',
                BeingContested = false
            }

            MySQL.query.await('UPDATE sprays SET Model = @Model, Contest = @Contested, Gang = @Gang WHERE id = @Id', {
                ['@Id'] = Id,
                ['@Model'] = Model,
                ['@Contested'] = json.encode(Contest),
                ['@Gang'] = GangName
            })

            local MyGang = MySQL.query.await('SELECT * FROM gangs WHERE name = @Name', {
                ['@Name'] = GangName
            })

            local OtherGang = MySQL.query.await('SELECT * FROM gangs WHERE name = @Name', {
                ['@Name'] = Name
            })

            local OtherGangSprays = json.decode(OtherGang[1].GangSprays)
            
            for k, v in ipairs(OtherGangSprays) do
                if tonumber(Id) == v.Id then
                    table.remove(OtherGangSprays, k)

                    MySQL.query.await('UPDATE gangs SET GangSprays = @GangSprays WHERE name = @Name', {
                        ['@Name'] = Name,
                        ['@GangSprays'] = json.encode(OtherGangSprays)
                    })
                end
            end

            local MyGangSprays = json.decode(MyGang[1].GangSprays)
            
            local SpraySelect = MySQL.query.await('SELECT * FROM sprays WHERE id = @Id', {
                ['@Id'] = Id
            })

            foundId = false

            for k, v in ipairs(MyGangSprays) do
                if tonumber(Id) == v.Id then
                    foundId = true
                end
            end

            if not foundId then
                table.insert(MyGangSprays, {
                    Id = tonumber(Id),
                    Coords = {
                        x = SpraySelect[1].x,
                        y = SpraySelect[1].y,
                        z = SpraySelect[1].z,
                    },
                })

                MySQL.query.await('UPDATE gangs SET GangSprays = @GangSprays WHERE name = @Name', {
                    ['@Name'] = GangName,
                    ['@GangSprays'] = json.encode(MyGangSprays)
                })
            end
        end

        TriggerClientEvent('aspect_laptop:gangs:updateAllSprays', -1)
    end,

    cancelContest = function(src, Id)
        -- Inform the opposing gang that it has being cancelled.

        Contest = {
            ContestedBy = '',
            BeingContested = false
        }

        MySQL.query.await('UPDATE sprays SET Contest = @Contested WHERE id = @Id', {
            ['@Id'] = Id,
            ['@Contested'] = json.encode(Contest)
        })
    end,

    IsBeingContested = function(src, Id)
        local Select = MySQL.query.await('SELECT * FROM sprays WHERE id = @Id', {
            ['@Id'] = Id
        })

        local Contested = json.decode(Select[1].Contest)

        return Contested.BeingContested, Select[1].Model
    end
}

RPC.register('aspect_laptop:sprays:startContesting', function(source, Id, Spray, Name)
    local src = source
    SpraysContest.startContesting(src, Id, Spray, Name)
end)

RPC.register('aspect_laptop:sprays:cancelContest', function(source, Id)
    local src = source
    SpraysContest.cancelContest(src, Id)
end)

RPC.register('aspect_laptop:sprays:beingContested', function(source, Id)
    local src = source
    local Contested, Model = SpraysContest.IsBeingContested(src, Id)

    return Contested, Model
end)