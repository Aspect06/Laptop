Ranks = {
    CreateRank = function(src, data)
        local user = exports['aspect_framework']:GetModule('GetPlayer')(src)
        local Select = MySQL.query.await('SELECT * FROM gangs WHERE name = @Name',  {
            ['@Name'] = data.GangName
        })

        local Ranks = json.decode(Select[1].ranks)

        table.insert(Ranks, {
            label = data.Name,
            managePermissions = data.Checked,
            disabled = false
        })

        MySQL.query.await('UPDATE gangs SET ranks = @Ranks WHERE name = @Name', {
            ['@Name'] = data.GangName,
            ['@Ranks'] = json.encode(Ranks)
        })

        Logs.CreateGangLog(src, user['PlayerData']['first_name'] .. ' ' .. user['PlayerData']['last_name'] .. ' created rank with name ' .. data.Name .. ' and manage permissions = ' .. data.Checked)
    end,

    DeleteRank = function(src, data)
        local user = exports['aspect_framework']:GetModule('GetPlayer')(src)
        local Select = MySQL.query.await('SELECT * FROM gangs WHERE name = @Name',  {
            ['@Name'] = data.GangName
        })

        local Ranks = {}

        for k, v in ipairs(json.decode(Select[1].ranks)) do
            if v.label ~= data.Rank then
                table.insert(Ranks, {
                    label = v.label,
                    managePermissions = v.managePermissions,
                    disabled = v.disabled
                })
            end
        end

        MySQL.query.await('UPDATE gangs SET ranks = @Ranks WHERE name = @Name', {
            ['@Name'] = data.GangName,
            ['@Ranks'] = json.encode(Ranks)
        })

        Logs.CreateGangLog(src, user['PlayerData']['first_name'] .. ' ' .. user['PlayerData']['last_name'] .. ' deleted rank with name ' .. data.Rank)
    end,

    UpdateRank = function(src, data)
        local user = exports['aspect_framework']:GetModule('GetPlayer')(src)
        local Select = MySQL.query.await('SELECT * FROM gangs WHERE name = @Name',  {
            ['@Name'] = data.GangName
        })

        local Ranks = {}

        for k, v in ipairs(json.decode(Select[1].ranks)) do
            if v.label ~= data.Rank then
                table.insert(Ranks, {
                    label = v.label,
                    managePermissions = v.managePermissions,
                    disabled = v.disabled
                })
            else
                table.insert(Ranks, {
                    label = v.label,
                    managePermissions = data.Checked,
                    disabled = false
                })
            end
        end

        MySQL.query.await('UPDATE gangs SET ranks = @Ranks WHERE name = @Name', {
            ['@Name'] = data.GangName,
            ['@Ranks'] = json.encode(Ranks)
        })

        Logs.CreateGangLog(src, user['PlayerData']['first_name'] .. ' ' .. user['PlayerData']['last_name'] .. ' updated rank with name ' .. data.Rank)
    end
}

RPC.register('aspect_laptop:gangs:createRank', function(source, data)
    Ranks.CreateRank(source, data)
end)

RPC.register('aspect_laptop:gangs:deleteRank', function(source, data)
    Ranks.DeleteRank(source, data)
end)

RPC.register('aspect_laptop:gangs:updateRank', function(source, data)
    Ranks.UpdateRank(source, data)
end)