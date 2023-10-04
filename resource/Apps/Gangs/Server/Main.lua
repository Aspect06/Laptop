Gangs = {
    FetchGang = function(src)
        local user = exports['aspect_framework']:GetModule('GetPlayer')(src)
        local Select = MySQL.query.await('SELECT * FROM gangs')
        data = nil

        for k, v in pairs(Select) do
            for z, x in pairs(json.decode(v.members)) do
                if tonumber(x.StateId) == user['PlayerData']['id'] then
                    data = v
                end
            end
        end

        return data
    end,

    CheckInGang = function(src, stateId)
        local user = exports['aspect_framework']:GetModule('GetPlayer')(src)
        local Select = MySQL.query.await('SELECT * FROM gangs')
        data = false

        if stateId == nil then
            for k, v in pairs(Select) do
                for z, x in pairs(json.decode(v.members)) do
                    if tonumber(x.StateId) == user['PlayerData']['id'] then
                        data = true
                    end
                end
            end
        else
            for k, v in pairs(Select) do
                for z, x in pairs(json.decode(v.members)) do
                    if tonumber(x.StateId) == tonumber(stateId) then
                        data = true
                    end
                end
            end
        end

        return data
    end,

    RankCheck = function(src)
        local Gang = Gangs.FetchGang(src)

        local user = exports['aspect_framework']:GetModule('GetPlayer')(src)
        local Rank = nil

        for k, v in pairs(json.decode(Gang.members)) do
            if tonumber(v.StateId) == user['PlayerData']['id'] then
                Rank = v
            end
        end

        return Rank
    end,

    GangData = function(src)
        local Gang = Gangs.FetchGang(src)
        
        MembersTable = {}

        for k, v in pairs(json.decode(Gang.members)) do
            local CharData = MySQL.query.await('SELECT * FROM characters WHERE id = @Id', {
                ['@Id'] = v.StateId
            })

            table.insert(MembersTable, {
                StateId = v.StateId,
                Rank = v.Rank,
                Name = CharData[1].first_name .. ' ' .. CharData[1].last_name
            })
        end

        GangData = {
            GangName = Gang.name,
            Members = MembersTable,
            Ranks = json.decode(Gang.ranks),
            Progression = {
                Logs = {
                    Actions = ProgressionFunc.ReverseTable(json.decode(Gang.logs)),

                    WeedProfit = ProgressionFunc.calculateProfit(src, 'Weed'),
                    MethProfit = ProgressionFunc.calculateProfit(src, 'Meth'),

                    Weed = ProgressionFunc.ReverseTable(json.decode(Gang.progression)['Weed']),
                    Meth = ProgressionFunc.ReverseTable(json.decode(Gang.progression)['Meth'])
                },

                Sprays = {
                    Placed = json.decode(Gang.GangSprays),
                    ToPlace = ProgressionFunc.calculateSprays(src).max,
                    Level = ProgressionFunc.calculateSprays(src).level,
                },

                Weed = {
                    BaggiesSold = json.decode(Gang.progression)['Weed'],
                    BaggiesToSell  = ProgressionFunc.calculateWeed(src).max,
                    Level = ProgressionFunc.calculateWeed(src).level,
                },

                Meth = {
                    BaggiesSold = json.decode(Gang.progression)['Meth'],
                    BaggiesToSell = ProgressionFunc.calculateMeth(src).max,
                    Level = ProgressionFunc.calculateMeth(src).level,
                }
            },
        }

        return GangData
    end,

    RoleData = function(src, data)
        local Gang = Gangs.FetchGang(src)
        Role = false

        for k, v in ipairs(json.decode(Gang.ranks)) do
            if v.label == data.Role then
                if v.managePermissions then
                    Role = true
                end
            end
        end

        return Role
    end
}

RPC.register('aspect_laptop:gangs:checkInGang', function(source)
    local src = source
    local Gang = Gangs.CheckInGang(src)
    return Gang
end)

RPC.register('aspect_laptop:gangs:checkRank', function(source)
    local src = source

    return Gangs.RankCheck(src)
end)

RPC.register('aspect_laptop:gangs:fetchGang', function(source)
    local src = source

    return Gangs.GangData(src)
end)

RPC.register('aspect_laptop:gangs:fetchRole', function(source, data)
    return Gangs.RoleData(source, data)
end)