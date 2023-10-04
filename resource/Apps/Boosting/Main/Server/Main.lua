Boosting = {
    fetchContractData = function(source, data)
        local Data = MySQL.query.await('SELECT * FROM boosting_contracts WHERE id = @Id', {
            ['@Id'] = data.contractId
        })

        return Data[1]
    end,

    checkCrypto = function(source)
        local user = exports['aspect_framework']:GetModule('GetPlayer')(source)

        local Select = MySQL.query.await('SELECT * FROM characters WHERE id = @Id', {
            ['@Id'] = user['PlayerData']['id']
        })

        return Select[1].aspect_coin
    end
}

RPC.register('aspect_laptop:boosting:fetchContractData', function(source, data)  
    return Boosting.fetchContractData(source, data)
end)

RPC.register('aspect_laptop:boosting:payCrypto', function(source, CryptoAmount)
    local user = exports['aspect_framework']:GetModule('GetPlayer')(source)
    local Crypto = Boosting.checkCrypto(source)

    if Crypto >= tonumber(CryptoAmount) then
        MySQL.query.await('UPDATE characters SET aspect_coin = @Aspect WHERE id = @Id', {
            ['@Id'] = user['PlayerData']['id'],
            ['@Aspect'] = Crypto - CryptoAmount
        })

        return true
    else
        return false
    end
end)