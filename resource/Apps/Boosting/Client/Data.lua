RegisterNUICallback('aspect_laptop:boostingData', function(data ,cb)
    local Progression, Reputation = RPC.execute('aspect_laptop:boosting:fetchClass')

    Data = {
        Level = Progression.leftSide,
        ProgLevel = Progression.rightSide,
        Progress = Reputation
    }

    cb(Data)
end)