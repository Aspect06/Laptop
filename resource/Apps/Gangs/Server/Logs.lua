Logs = {
    CreateGangLog = function(src, Action)
        local user = exports['aspect_framework']:GetModule('GetPlayer')(src)
        local Gang = Gangs.FetchGang(src)

        local Select = MySQL.query.await('SELECT * FROM gangs WHERE name = @Name', {
            ['@Name'] = Gang.name
        })

        local Log = json.decode(Select[1].logs)

        table.insert(Log, {
            name = user['PlayerData']['first_name'] .. ' ' .. user['PlayerData']['last_name'],
            action = Action,
            timestamp = os.date()
        })
        
        MySQL.query.await('UPDATE gangs SET logs = @Logs WHERE name = @Name', {
            ['@Name'] = Gang.name,
            ['@Logs'] = json.encode(Log)
        })
    end
}