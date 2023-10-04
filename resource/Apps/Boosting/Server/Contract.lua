Contracts = {}

RPC.register('aspect_laptop:boosting:getContracts', function(source)
    local src = source
    local user = exports['aspect_framework']:GetModule('GetPlayer')(src)

    local Data = MySQL.query.await('SELECT * FROM boosting_contracts WHERE stateId = @StateId', {
        ['@StateId'] = user['PlayerData']['id']
    })
    
    Contracts = {}

    for k, v in ipairs(Data) do
        table.insert(Contracts, {
            Id = v.id,
            Model = v.model,
            Cost = v.cost,
            Class = v.class
        })
    end

    return Contracts
end)

RPC.register('aspect_laptop:boosting:createContract', function(source, data)
    local src = source
    local user = exports['aspect_framework']:GetModule('GetPlayer')(src)

    exports.oxmysql:execute('INSERT INTO boosting_contracts (stateId, model, cost, class) VALUES (@StateId, @Model, @Cost, @Class)', {
        ['@StateId'] = user['PlayerData']['id'],
        ['@Model'] = data.Vehicle.Model,
        ['@Cost'] = data.Vehicle.Cost,
        ['@Class'] = data.Class
    })
end)

RPC.register('aspect_laptop:boosting:declineContract', function(source, data)
    MySQL.query.await('DELETE FROM boosting_contracts WHERE id = @Id', {
        ['@Id'] = data.Id
    })
end)

RPC.register('aspect_laptop:boosting:transferContract', function(source, data)
    MySQL.query.await('UPDATE boosting_contracts SET stateId = @stateId WHERE id = @Id', {
        ['@Id'] = data.contractId,
        ['@stateId'] = data.targetStateId
    })
end)