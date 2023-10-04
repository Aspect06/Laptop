Actions = {
    AddMember = function(src, data)
        local user = exports['aspect_framework']:GetModule('GetPlayer')(src)
        
        local Select = MySQL.query.await('SELECT * FROM gangs WHERE name = @Name', {
            ['@Name'] = data.GangName
        })

        local Char = MySQL.query.await('SELECT * FROM characters WHERE id = @Id', {
            ['@Id'] = data.stateId
        })
        
        if not Char[1] then return end
        
        Members = json.decode(Select[1].members)
        
        table.insert(Members, {
            StateId = data.stateId,
            Rank = data.Rank
        })
        
        MySQL.query.await('UPDATE gangs SET members = @Members WHERE name = @Name', {
            ['@Members'] = json.encode(Members),
            ['@Name'] = data.GangName
        })

        Logs.CreateGangLog(src, user['PlayerData']['first_name'] .. ' ' .. user['PlayerData']['last_name'] .. ' added state id ' .. data.stateId .. ' to the gang app.')
    end,

    KickMember = function(src, data)
        local user = exports['aspect_framework']:GetModule('GetPlayer')(src)
        
        local Select = MySQL.query.await('SELECT * FROM gangs WHERE name = @Name', {
            ['@Name'] = data.GangName
        })

        Members = {}
        
        for k, v in ipairs(json.decode(Select[1].members)) do
            if v.StateId ~= data.stateId then
                table.insert(Members, {
                    StateId = v.StateId,
                    Rank = v.Rank
                })
            end
        end
        
        MySQL.query.await('UPDATE gangs SET members = @Members WHERE name = @Name', {
            ['@Members'] = json.encode(Members),
            ['@Name'] = data.GangName
        })
        Logs.CreateGangLog(src, user['PlayerData']['first_name'] .. ' ' .. user['PlayerData']['last_name'] .. ' kicked state id ' .. data.stateId .. ' from the gang app.')
    end,

    SetRank = function(src, data)
        local user = exports['aspect_framework']:GetModule('GetPlayer')(src)
        
        if user['PlayerData']['id'] == data.StateId then return end
        
        local Select = MySQL.query.await('SELECT * FROM gangs WHERE name = @Name', {
            ['@Name'] = data.GangName
        })
        
        Members = {}
        
        for k, v in ipairs(json.decode(Select[1].members)) do
            if v.StateId ~= data.StateId then
                table.insert(Members, {
                    StateId = v.StateId,
                    Rank = v.Rank
                })
            else
                table.insert(Members, {
                    StateId = v.StateId,
                    Rank = data.Rank
                })
            end
        end
        
        MySQL.query.await('UPDATE gangs SET members = @Members WHERE name = @Name', {
            ['@Name'] = data.GangName,
            ['@Members'] = json.encode(Members),
        })
        
        Logs.CreateGangLog(src, user['PlayerData']['first_name'] .. ' ' .. user['PlayerData']['last_name'] .. ' set state id ' .. data.stateId .. ' rank to ' .. data.Rank)
    end,

    LeaveGang = function(src, stateId, Gang)
        local Select = MySQL.query.await('SELECT * FROM gangs WHERE name = @Name', {
            ['@Name'] = Gang
        })

        local Members = json.decode(Select[1].members)

        for k, v in ipairs(Members) do
            if tonumber(v.StateId) == tonumber(stateId) then
                table.remove(Members, k)
            end
        end

        MySQL.query.await('UPDATE gangs SET members = @Members WHERE name = @Name', {
            ['@Name'] = Gang,
            ['@Members'] = json.encode(Members)
        })
    end
}

RPC.register('aspect_laptop:gangs:addMember', function(source, data)
    local src = source
    if Gangs.CheckInGang(src, data.stateId) then return 'In Gang' end
    Actions.AddMember(src, data)
end)

RPC.register('aspect_laptop:gangs:kickMember', function(source, data)
    Actions.KickMember(source, data)
end)

RPC.register('aspect_laptop:gangs:setRank', function(source, data)
    Actions.SetRank(source, data)
end)

RPC.register('aspect_laptop:gangs:leaveGang', function(source, data)
    local src = source
    local user = exports['aspect_framework']:GetModule('GetPlayer')(src)

    Actions.LeaveGang(src, user['PlayerData']['id'], data.Gang)
end)