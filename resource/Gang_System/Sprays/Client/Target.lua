SprayTarget = {
    AddTarget = function(Entity, Array)
        exports['aspect_target']:AddTargetEntity(Entity, {
            options = {
                {
                    label = "Scrub",
                    icon = "fa-solid fa-soap",
                    action = function()
                        local Gang = RPC.execute('aspect_laptop:gangs:fetchGang')
                        if Gang.GangName == Array.Name then
                            TriggerEvent('aspect_ui:sentNotification', 'error', 'Im not sure you want to scrub your own gang spray.', 5000)
                            return
                        end

                        -- Check if they have a scrubbing cloth item.

                        TaskStartScenarioInPlace(PlayerPedId(), 'WORLD_HUMAN_MAID_CLEAN', 0, true)

                        FreezeEntityPosition(PlayerPedId(), true)
                        local Finished = exports['aspect_taskbar']:progressCircle({
                            duration = 300000,
                            position = 'bottom',
                            label = 'Scrubbing Graffiti...',
                            useWhileDead = false,
                            canCancel = true,
                            disable = {
                                combat = true,
                            },
                        })

                        if Finished then
                            RPC.execute('aspect_laptop:gangs:scrubSpray', Array.Id)
                        end
                        ClearPedTasks(PlayerPedId())
                        FreezeEntityPosition(PlayerPedId(), false)
                    end,
                },
                {
                    label = "Contest Graffiti",
                    icon = "fa-solid fa-hand-holding",
                    action = function()
                        local SprayModel = RPC.execute('aspect_laptop:gangs:getSprayModel')
                        RPC.execute('aspect_laptop:sprays:startContesting', Array.Id, SprayModel, Array.Name)
                    end,
                    canInteract = function()
                        local InGang = RPC.execute('aspect_laptop:gangs:checkInGang')
                        local Contested, Model = RPC.execute('aspect_laptop:sprays:beingContested', Array.Id)
                        local SprayModel = RPC.execute('aspect_laptop:gangs:getSprayModel')

                        return InGang and not Contested and SprayModel ~= Model
                    end,
                },
                {
                    label = "Cancel Contest",
                    icon = "fa-solid fa-hand-holding",
                    action = function()
                        -- Animation
                        FreezeEntityPosition(PlayerPedId(), true)
                        local Finished = exports['aspect_taskbar']:progressCircle({
                            duration = 420000,
                            position = 'bottom',
                            label = 'Canceling Contest...',
                            useWhileDead = false,
                            canCancel = true,
                            disable = {
                                combat = true,
                            },
                        })
                        if Finished then
                            RPC.execute('aspect_laptop:sprays:cancelContest', Array.Id)
                        end
                        FreezeEntityPosition(PlayerPedId(), false)
                    end,
                    canInteract = function()
                        local InGang = RPC.execute('aspect_laptop:gangs:checkInGang')
                        local Contested, Model = RPC.execute('aspect_laptop:sprays:beingContested', Array.Id)
                        local SprayModel = RPC.execute('aspect_laptop:gangs:getSprayModel')

                        return InGang and Contested and SprayModel == Model
                    end,
                },
                {
                    label = "Discover Graffiti",
                    icon = "fa-solid fa-eye",
                    action = function(Entity)
                        local Discovered = RPC.execute('aspect_laptop:gangs:alreadyDiscovered', Array.Id)
                        if Discovered then
                            TriggerEvent('aspect_ui:sentNotification', 'error', 'Your gang has already discovered this spray.', 5000)
                            return
                        end

                        FreezeEntityPosition(PlayerPedId(), true)
                        local Finished = exports['aspect_taskbar']:progressCircle({
                            duration = 300000,
                            position = 'bottom',
                            label = 'Discovering Graffiti...',
                            useWhileDead = false,
                            canCancel = true,
                            disable = {
                                combat = true,
                            },
                        })

                        if Finished then
                            TriggerEvent('aspect_ui:sentNotification', 'info', 'Graffiti discovered.', 5000)

                            RPC.execute('aspect_laptop:gangs:discoverSpray', {
                                Id = Array.Id,
                                Spray = Array.Spray,
                                Coords = GetEntityCoords(Entity),
                                Heading = GetEntityHeading(Entity)
                            })
                        end
                        FreezeEntityPosition(PlayerPedId(), false)
                    end,
                    canInteract = function()
                        local InGang = RPC.execute('aspect_laptop:gangs:checkInGang')
                        return InGang
                    end,
                },
            },
            distance = 1.5
        })
    end
}