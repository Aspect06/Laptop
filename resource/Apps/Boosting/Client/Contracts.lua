RegisterNUICallback('aspect_laptop:fetchContracts', function(data, cb)
    local Contracts = RPC.execute('aspect_laptop:boosting:getContracts')

    if Contracts == nil then
        Contracts = {}
    end

    cb(Contracts)
end)

RegisterNUICallback('aspect_laptop:boosting:declineContract', function(data, cb)
    local Decline = RPC.execute('aspect_laptop:boosting:declineContract', data)
    
    cb(true)
end)

RegisterNUICallback('aspect_laptop:boosting:transferContract', function(data, cb)
    local Transfer = RPC.execute('aspect_laptop:boosting:transferContract', data)

    cb(true)
end)