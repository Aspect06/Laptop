local Classes = {
    {
        leftSide = 'S+',
        rightSide = 'X',

        max = 1000,
        min = 900
    },
    {
        leftSide = 'S',
        rightSide = 'S+',
        
        max = 900,
        min = 800
    },
    {
        leftSide = 'A',
        rightSide = 'S',

        max = 700,
        min = 600
    },
    {
        leftSide = 'B',
        rightSide = 'A',

        max = 500,
        min = 400
    },
    {
        leftSide = 'C',
        rightSide = 'B',

        max = 300,
        min = 200
    },
    {
        leftSide = 'C',
        rightSide = 'B',

        max = 200,
        min = 100,
    },
    {
        leftSide = 'D',
        rightSide = 'C',

        max = 100,
        min = 0
    },
}

RPC.register('aspect_laptop:boosting:fetchClass', function(source)
    local src = source
    local user = exports['aspect_framework']:GetModule('GetPlayer')(src)

    local Data = MySQL.query.await('SELECT * FROM characters WHERE id = @Id', {
        ['@Id'] = user['PlayerData']['id']
    })
    
    for Aspect, Amity in ipairs(Classes) do
        if Data[1].boostRep >= Amity.min and Data[1].boostRep <= Amity.max then
            return Amity, Data[1].boostRep
        end
    end
end)