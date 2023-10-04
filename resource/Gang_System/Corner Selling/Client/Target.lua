Citizen.CreateThread(function()
    for k, v in ipairs(DrugConfig.Drugs) do
        exports['aspect_target']:AddTargetBone(CAR_BONES, {
            options = {
                {
                    label = "Start Cornering " .. v.label,
                    icon = "fas fa-handshake",
                    action = function(Entity)
                        Cornering.startCornering(Entity, v.itemId)
                    end,
                    canInteract = function()
                        local hasDrug = -- Check for v.itemId
                        return not Cornering.CurrentlyCornering and hasDrug and not IsPedInAnyVehicle(PlayerPedId(), false)
                    end,
                },
            },
            distance = 1.0
        })
    end

    exports['aspect_target']:AddTargetBone(CAR_BONES, {
        options = {
            {
                label = "Stop Cornering",
                icon = "fas fa-handshake-slash",
                action = function()
                    Cornering.stopCornering()
                end,
                canInteract = function()
                    return Cornering.CurrentlyCornering and not IsPedInAnyVehicle(PlayerPedId(), false)
                end,
            },
        },
        distance = 1.0
    })
end)