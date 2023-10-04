
Drugs = {
    CreateLog = function(src, Gang, Amount, Drug, Price)
        local user = exports['aspect_framework']:GetModule('GetPlayer')(src)
        
        local Select = MySQL.query.await('SELECT * FROM gangs WHERE name = @Name', {
            ['@Name'] = Gang
        })
        
        local Sales = json.decode(Select[1].progression)
        
        table.insert(Sales[Drug], {
            name = user['PlayerData']['first_name'] .. ' ' .. user['PlayerData']['last_name'],
            amount = Amount,
            drug = Drug,
            date = os.date(),
            price = Price
        })
        
        
        MySQL.query.await('UPDATE gangs SET progression = @Progression WHERE name = @Name', {
            ['@Name'] = Gang,
            ['@Progression'] = json.encode(Sales)
        })
    end,

    CreateCornerPed = function(src, Coords, Ped)
        TriggerClientEvent("aspect_laptop:cornering:createdCornerPed", src, Ped, Coords)
    end
}

RPC.register("aspect_laptop:cornering:createPed", function(source, Coords, Ped)
    local src = source
    Drugs.CreateCornerPed(src, Coords, Ped)
end)