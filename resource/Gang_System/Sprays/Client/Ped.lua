Citizen.CreateThread(function()
    exports['aspect_target']:SpawnPed({
        model = PedConfig.Model,
        coords = PedConfig.Coords,
        minusOne = true,
        freeze = true,
        invincible = true,
        blockevents = true,

        target = {
            options = {
                {
                    icon = "fa-solid fa-spray-can-sparkles",
                    label = "Purchase Spray",
                    action = function()
                        local Price = RPC.execute('aspect_laptop:gangs:sprayPrice')

                        print('This is price: ' .. Price .. 'k')
                    end,
                    canInteract = function()
                        local InGang = RPC.execute('aspect_laptop:gangs:checkInGang')
                        return InGang
                    end,
                },
                {
                    icon = 'fa-solid fa-brush',
                    label = 'Purchase Scrubbing Cloth',
                    action = function()
                        -- Todo [Cost 50k]
                    end,
                }
            },
            distance = 2.5,
        },
        spawnNow = true,
    })
end)