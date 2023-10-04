Citizen.CreateThread(function()
    while GetResourceState('aspect_inventory') ~= 'started' do
        Citizen.Wait(500)
    end

    exports['aspect_inventory']:registerItem('laptop', function(item, token)
        if Item ~= "laptop" then return end

        NUI.Display = not NUI.Display
        Animation()
        NUI.sendReactMessage('aspect_laptop:toggleLaptop')
        Util.NUIFocus(true, true)
        
        return { 
            success = true
        }
    end)
end)

RegisterCommand('laptop', function()
    NUI.sendReactMessage('aspect_laptop:toggleLaptop')
    Util.NUIFocus(true, true)
end)

RegisterNUICallback('aspect_laptop:closeLaptop', function(data, cb)
    Util.NUIFocus(false, false)
    NUI.Display = not NUI.Display
end)

Animation = function()
    if not NUI.Display then return end
    if HasAnimDictLoaded("amb@code_human_in_bus_passenger_idles@female@tablet@base") then return end
    
    RequestAnimDict("amb@code_human_in_bus_passenger_idles@female@tablet@base")
    while not HasAnimDictLoaded("amb@code_human_in_bus_passenger_idles@female@tablet@base") do Citizen.Wait(100) end

    if not HasModelLoaded('prop_cs_tablet') then
        RequestModel('prop_cs_tablet')
        while not HasModelLoaded('prop_cs_tablet') do Citizen.Wait(100) end
    end

    local Tablet = CreateObject('prop_cs_tablet', 0.0, 0.0, 0.0, true, true, false)
    local tabletBoneIndex = GetPedBoneIndex(PlayerPedId(), 60309)

    AttachEntityToEntity(Tablet, PlayerPedId(), tabletBoneIndex, 0.03, 0.002, -0.0, 10.0, 160.0, 0.0, true, false, false, false, 2, true)
    SetModelAsNoLongerNeeded('prop_cs_tablet')

    CreateThread(function()
        while NUI.Display do
            Wait(0)
            if IsEntityPlayingAnim(PlayerPedId(), "amb@code_human_in_bus_passenger_idles@female@tablet@base", "base", 3) then return end
            TaskPlayAnim(PlayerPedId(), "amb@code_human_in_bus_passenger_idles@female@tablet@base", "base", 3.0, 3.0, -1, 49, 0, 0, 0, 0)
        end
        ClearPedSecondaryTask(PlayerPedId())
        Wait(250)
        DetachEntity(Tablet, true, false)
        DeleteEntity(Tablet)
    end)
end