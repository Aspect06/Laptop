Cornering = {
    CorneringDrug = '',
    CurrentlyCornering = false,
    CurrentCornerCoords = nil,
    CurrentCornerZone = nil,

    startCornering = function(Entity, Drug)
        if Cornering.CurrentlyCornering then return end
        Cornering.CurrentlyCornering = true
        Cornering.CorneringDrug = Drug

        Cornering.CurrentCornerCoords = GetEntityCoords(PlayerPedId())
        Cornering.CurrentCornerZone = GetNameOfZone(Cornering.CurrentCornerCoords)

        TriggerEvent('aspect_ui:sentNotification', 'info', 'Corner Active', 5000)

        Citizen.CreateThread(function()
            while Cornering.CurrentlyCornering and DrugConfig.PopulateRate ~= -1 do
                PopulateNow()
                Wait(DrugConfig.PopulateRate)
            end
        end)

        Citizen.CreateThread(function()
            local notFoundCount = 0
            while Cornering.CurrentlyCornering do
                local plyCoords = GetEntityCoords(PlayerPedId())
                if #(Cornering.CurrentCornerCoords - plyCoords) > 50.0 then
                    TriggerEvent('aspect_ui:sentNotification', 'error', 'No longer selling...', 5000)
                    Cornering.stopCornering()
                    return
                end

                local foundPed
                for _, ped in ipairs(GetGamePool("CPed")) do
                    if not IsPedDeadOrDying(ped, true) and not IsPedAPlayer(ped) and not IsPedFleeing(ped) and IsPedOnFoot(ped) and 
                    not IsPedInAnyVehicle(ped, true) and IsPedHuman(ped) and NetworkGetEntityIsNetworked(ped) and not IsPedInMeleeCombat(ped) and #(Cornering.CurrentCornerCoords - GetEntityCoords(ped)) < 100.0 then
                        foundPed = ped
                        notFoundCount = 0
                        break
                    end
                end

                if not foundPed then
                    notFoundCount = notFoundCount + 1
                else
                    local retval, coords = GetPointOnRoadSide(Cornering.CurrentCornerCoords.x, Cornering.CurrentCornerCoords.y, Cornering.CurrentCornerCoords.z, 1)
                    RPC.execute("aspect_laptop:cornering:createPed", coords, NetworkGetNetworkIdFromEntity(foundPed))
                end

                if notFoundCount > 7 then
                    TriggerEvent('aspect_ui:sentNotification', 'error', 'Looks like this spot has dried up.', 5000)
                    Cornering.stopCornering()
                    return
                end

                Wait(DrugConfig.TimeBetweenAcquisition)
            end
        end)
    end,

    stopCornering = function()
        TriggerEvent('aspect_ui:sentNotification', 'error', 'No longer selling.', 5000)

        Cornering.CorneringDrug = ''
        Cornering.CurrentlyCornering = false
        Cornering.CurrentCornerCoords = nil
        Cornering.CurrentCornerZone = nil
    end,

    doSale = function(pEntity)
        exports['aspect_target']:RemoveTargetEntity(pEntity, "Sell")
        local DrugAmount = math.random(1, 5)

        local hasBaggies = exports['aspect_inventory']:hasEnoughOfItem(Cornering.CorneringDrug, DrugAmount, true)
        if not hasBaggies then
            TriggerEvent('aspect_ui:sentNotification', 'error', 'You need more baggies to sell.', 5000)
            return
        end
    
        if exports['aspect_inventory']:hasEnoughOfItem(Cornering.CorneringDrug, DrugAmount) then
            TriggerEvent('inventory:removeItem', Cornering.CorneringDrug, DrugAmount)
            RPC.execute('aspect_crime:weed:syncCornerHandOff', Cornering.CurrentCornerCoords, NetworkGetNetworkIdFromEntity(pEntity), DrugAmount)
            cleanMoney()
        end

        local InGang = RPC.execute('aspect_laptop:gangs:checkInGang')

        if InGang then
            if GangSystem.Functions.InSprayRadius() then
                -- Progression shit.
            end
        end
    
        if not DoesEntityExist(pEntity) == 1 or IsPedDeadOrDying(pEntity) then return end
    
        SetPedCanRagdoll(PlayerPedId(), false)
        PlayAmbientSpeech1(pEntity, 'Generic_Hi', 'Speech_Params_Force')
        TaskTurnPedToFaceEntity(PlayerPedId(), pEntity, 1000)
        TaskPlayAnim(PlayerPedId(), 'mp_safehouselost@', 'package_dropoff', 8.0, -8.0, -1, 4096, 0, false, false, false)

        Wait(2000)
        SetPedCanRagdoll(PlayerPedId(), true)

        PlayAmbientSpeech1(pEntity, 'Chat_State', 'Speech_Params_Force')
        -- local RNG = math.random(1, 3)
        -- if RNG == 2 then
        --     RPC.execute("aspect_dispatch:addCall", "10-31A", "Investigate Suspicious Actitity", {}, {GetEntityCoords(PlayerPedId())[1], GetEntityCoords(PlayerPedId())[2], GetEntityCoords(PlayerPedId())[3]}, 102, 480, 0)
        -- end
    end
}

RegisterNetEvent("aspect_laptop:cornering:createdCornerPed")
AddEventHandler("aspect_laptop:cornering:createdCornerPed", function(Ped, Coords)
    if NetworkHasControlOfEntity(NetworkGetEntityFromNetworkId(Ped)) then

        exports['aspect_target']:AddTargetEntity(NetworkGetEntityFromNetworkId(Ped), {
            options = {
                {
                    label = "Sell",
                    icon = "fas fa-comment-dollar",
                    action = function(pEntity)
                        Cornering.doSale(pEntity)
                    end,
                    canInteract = function()
                        return CurrentlyCornering and not IsPedInAnyVehicle(PlayerPedId(), false)
                    end,
                },
            },
            distance = 2.5
        })

        TaskWalkToCorner(NetworkGetEntityFromNetworkId(Ped), Coords)
    end
end)