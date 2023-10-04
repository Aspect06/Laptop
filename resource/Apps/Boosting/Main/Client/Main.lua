Boosting = {
    StartBoost = function(data)
        local Contract = RPC.execute('aspect_laptop:boosting:fetchContractData', data)

        if data.Type == 'Regular' then
            local Crypto = RPC.execute('aspect_laptop:boosting:payCrypto', Contract.cost / 2)
        end

        if data.Type == 'Vin Scratch' then
            local Crypto = RPC.execute('aspect_laptop:boosting:payCrypto', Contract.cost)
        end

        if Crypto then
            -- SET CONTRACT IN SQL TO BE INPROGRESS AND FETCH UI SIDE
            NUI.sendReactMessage('aspect_laptop:createNotification', {
                Label = 'You have started a new contract id ' .. data.contractId,
                App = 'Boosting'
            })

            -- Start Contract
        else
            NUI.sendReactMessage('aspect_laptop:createNotification', {
                Label = 'Not enough crypto to start this contract',
                App = 'Boosting'
            })
        end        
    end
}