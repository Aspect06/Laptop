Sprays = {
    currentlyPlacing = false,
    Active = {}
}

RegisterCommand('spray', function()
    TriggerEvent('aspect_laptop:gangs:startSpraying')
end)

RegisterNetEvent("aspect_laptop:gangs:startSpraying")
AddEventHandler("aspect_laptop:gangs:startSpraying", function(item, object)
    local SprayObject = nil

    if not Sprays.currentlyplacing then
        local InGang = RPC.execute('aspect_laptop:gangs:checkInGang')
        if not InGang then TriggerEvent('aspect_ui:sentNotification', 'error', 'You have no use for this...', 5000) return end

        -- Check if gang flag is nearby or a spray is..
        if not GangSystem.Functions.SprayCheck() then

            local SprayModel = RPC.execute('aspect_laptop:gangs:getSprayModel')

            SprayObject = SprayModel

            TriggerEvent('aspect_ui:sentNotification', 'info', '[E] Place | ESC Cancel', 5000)
            Sprays.currentlyplacing = true
            local PlayerCoords = GetOffsetFromEntityInWorldCoords(GetPlayerPed(PlayerId()), 0.0, 0.0, -5.0)
            local propSpawned = CreateObject(SprayObject, PlayerCoords.x, PlayerCoords.y, PlayerCoords.z, 0, 1, 1)

            SetEntityDrawOutline(propSpawned, true)
            Wait(500)
            SetEntityCollision(propSpawned, false)
            SetEntityHeading(propSpawned, GetEntityHeading(GetPlayerPed(PlayerId())))
            SetEntityDrawOutlineShader(1)
            SetEntityDrawOutlineColor(0, 255, 0, 255)

            while Sprays.currentlyplacing do
                Wait(0)
                DisableControlAction(0, 200, true)
                x, y, z = table.unpack(SprayCoords())
                SetEntityCoordsNoOffset(propSpawned, x, y, z, false, false, false, false)

                if IsControlJustPressed(0, 15) then
                    SetEntityHeading(propSpawned, GetEntityHeading(propSpawned) + 0.5)
                elseif IsControlJustPressed(0, 14) then
                    SetEntityHeading(propSpawned, GetEntityHeading(propSpawned) - 0.5)
                end

                if IsControlJustPressed(0, 322) then
                    SetEntityDrawOutline(propSpawned, false)
                    DeleteEntity(propSpawned)
                    Sprays.currentlyplacing = false
                    break
                end

                if IsControlJustPressed(0, 38) then
                    if GetDistanceBetweenCoords(GetEntityCoords(PlayerPedId()), x, y, z, false) > 2.0 then
                        TriggerEvent('aspect_ui:sentNotification', 'error', 'Move closer to the place you are trying to spray and try again.', 5000)
                        DeleteEntity(propSpawned)
                        Sprays.currentlyplacing = false
                        return
                    end

                    if x == 0.0 or y == 0.0 or z == 0.0 then
                        Sprays.currentlyplacing = false

                        DeleteEntity(propSpawned)
                        return
                    end
                    if activeProp ~= nil then
                        DeleteEntity(activeProp)
                    end
                    Sprays.currentlyplacing = false
                    -- if item.name == "tool_gang_flag" then
                    --     local coords = GetEntityCoords(propSpawned)
                    --     local heading = GetEntityHeading(propSpawned)
                    --     DeleteEntity(propSpawned)
                    --     RPC.Execute('aspect_laptop:gangs:addGangflag', item.data.gangname, item.data.gangid, { x = coords.x, y = coords.y, z = coords.z, h = heading }, item.data.gangcolor, item.data.ganglogo, GetHashKey(SprayObject))
                    --     Remove gang flag from inventory
                    -- elseif item.name == "tool_spray_can" then

                        MainFuncs.LoadAnim('switch@franklin@lamar_tagging_wall')
                        TaskPlayAnim(PlayerPedId(), 'switch@franklin@lamar_tagging_wall', 'lamar_tagging_wall_loop_lamar', 15.0, 2.0, -1, 16, 0, 0, 0, 0)
                        
                        TaskPlayAnim(PlayerPedId(), 'switch@franklin@lamar_tagging_wall', 'lamar_tagging_wall_loop_lamar', 15.0, 2.0, -1, 16, 0, 0, 0, 0)
                        SetTimeout(5000, function()
                            doingAnim = true
                            Citizen.CreateThread(function()
                                while doingAnim do
                                    Wait(1)
                                    if not IsEntityPlayingAnim(PlayerPedId(), "switch@franklin@lamar_tagging_wall", "lamar_tagging_exit_loop_lamar", 3) then
                                        TaskPlayAnim(PlayerPedId(), 'switch@franklin@lamar_tagging_wall', 'lamar_tagging_exit_loop_lamar', 15.0, 2.0, -1, 16, 0, 0, 0, 0)
                                    end
                                end
                            end)
                        end)

                        local finished = exports['aspect_taskbar']:progressCircle({
                            duration = 40000,
                            position = 'bottom',
                            label = 'Spraying Wall...',
                            useWhileDead = false,
                            canCancel = true,
                            disable = {
                                combat = true,
                            },
                        })
                        
                        
                        if finished then
                            doingAnim = false
                            SetEntityDrawOutline(propSpawned, false)
                            ClearPedTasks(PlayerPedId())

                            RPC.execute("aspect_laptop:gangs:syncPlaceSpray", {
                                Spray = SprayObject,
                                Coords = {
                                    x = GetEntityCoords(propSpawned).x,
                                    y = GetEntityCoords(propSpawned).y,
                                    z = GetEntityCoords(propSpawned).z,
                                    Heading = GetEntityHeading(propSpawned)
                                }
                            })

                            DeleteEntity(propSpawned)

                            -- Remove the item
                        else
                            doingAnim = false
                            ClearPedTasks(PlayerPedId())
                            SetEntityDrawOutline(propSpawned, false)
                            DeleteEntity(propSpawned)
                        end
                    -- end
                end
            end
        else
            TriggerEvent('aspect_ui:sentNotification', 'error', 'You cant place a spray here.', 5000)
            Sprays.currentlyplacing = false
            SetEntityDrawOutline(propSpawned, false)
            DeleteEntity(propSpawned)

            FreezeEntityPosition(propSpawned, true)
            SetEntityCollision(propSpawned, true)
        end
    end
end)

function SprayCoords()
    local Cam = GetGameplayCamCoord()
    local _, _, Coords, _, _ = GetShapeTestResult(StartExpensiveSynchronousShapeTestLosProbe(Cam, GetCoordsFromCamDistance(10.0, Cam), -1, PlayerPedId(), 4))
    return Coords
end

function GetCoordsFromCamDistance(distance, coords)
    local rotation = GetGameplayCamRot()
    local adjustedRotation = vector3((math.pi / 180) * rotation.x, (math.pi / 180) * rotation.y, (math.pi / 180) * rotation.z)
    local direction = vector3(-math.sin(adjustedRotation[3]) * math.abs(math.cos(adjustedRotation[1])), math.cos(adjustedRotation[3]) * math.abs(math.cos(adjustedRotation[1])), math.sin(adjustedRotation[1]))
    return vector3(coords[1] + direction[1] * distance, coords[2] + direction[2] * distance, coords[3] + direction[3] * distance)
end

RegisterNetEvent('aspect_laptop:gangs:syncClientSpray')
AddEventHandler('aspect_laptop:gangs:syncClientSpray', function(Array)
    local Spray = CreateObject(Array.Spray, tonumber(Array.Coords.x), tonumber(Array.Coords.y), tonumber(Array.Coords.z) - 1.8, false, true, true)
    SetEntityHeading(Spray, tonumber(Array.Coords.Heading))
    SetEntityCollision(Spray, true)
    FreezeEntityPosition(Spray, true)

    table.insert(Sprays.Active, {
        Id = Array.Id,
        EntityId = Spray
    })

    SprayTarget.AddTarget(Spray, Array)
end)

RegisterNetEvent('aspect_spawnselect:SetEverything')
AddEventHandler('aspect_spawnselect:SetEverything', function()
    print('[Aspect Laptop] Fetching Sprays..')

    RPC.execute('aspect_laptop:gangs:getAllSprays')

    for k, v in pairs(ActiveSprays) do
        RemoveBlip(v.Blip)
        ActiveSprays[k] = nil
    end

    NUI.sendReactMessage('aspect_laptop:closeAllApps')
end)

RegisterNetEvent('aspect_laptop:gangs:updateAllSprays')
AddEventHandler('aspect_laptop:gangs:updateAllSprays', function()
    for k, v in ipairs(Sprays.Active) do
        if DoesEntityExist(v.EntityId) then
            DeleteEntity(v.EntityId)
        end
    end

    RPC.execute('aspect_laptop:gangs:getAllSprays')
end)

RegisterNetEvent('aspect_charselect:initiateCharSelect')
AddEventHandler('aspect_charselect:initiateCharSelect', function()
    for k, v in ipairs(Sprays.Active) do
        if DoesEntityExist(v.EntityId) then
            DeleteEntity(v.EntityId)
        end
    end

    for k, v in pairs(ActiveSprays) do
        RemoveBlip(v.Blip)
        ActiveSprays[k] = nil
    end
end)

AddEventHandler('onResourceStart', function(resource)
    if GetCurrentResourceName() == "aspect_framework" then
        for k, v in ipairs(Sprays.Active) do
            if DoesEntityExist(v.EntityId) then
                DeleteEntity(v.EntityId)
            end
        end
	end
end)

RegisterCommand('initsprays', function()
    RPC.execute('aspect_laptop:gangs:getAllSprays')
end)