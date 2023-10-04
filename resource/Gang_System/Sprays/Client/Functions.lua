GangSystem = {
    Functions = {
        InSprayRadius = function()
            local InGang = RPC.execute('aspect_laptop:gangs:checkInGang')
            if not InGang then return end

            local Sprays = RPC.execute('aspect_laptop:gangs:fetchSprays')
            NearSpray = false

            for k, v in ipairs(Sprays) do
                -- print('Distance: ' .. GetDistanceBetweenCoords(GetEntityCoords(PlayerPedId()), tonumber(v.Coords.x), tonumber(v.Coords.y), tonumber(v.Coords.z), false))
                if GetDistanceBetweenCoords(GetEntityCoords(PlayerPedId()), tonumber(v.Coords.x), tonumber(v.Coords.y), tonumber(v.Coords.z), false) < 100 then
                    NearSpray = true
                end
            end

            return NearSpray
        end,

        SprayCheck = function()
            local Sprays = RPC.execute('aspect_laptop:gangs:fetchAllSprays')

            CloseSpray = false

            for k, v in ipairs(Sprays) do
                -- print('Distance: ' .. GetDistanceBetweenCoords(GetEntityCoords(PlayerPedId()), tonumber(v.x), tonumber(v.y), tonumber(v.z), false))
                if GetDistanceBetweenCoords(GetEntityCoords(PlayerPedId()), tonumber(v.x), tonumber(v.y), tonumber(v.z), false) < 75.0 then
                    CloseSpray = true
                end
            end

            return CloseSpray
        end
    }
}

-- RegisterCommand('nearspray', function(data, args)
--     if args[1] == 1 then
--         print('[DEBUG] Checking if near my gang spray...')
--         local Radius = GangSystem.Functions.InSprayRadius()
--         print(Radius)
--     else
--         print('[DEBUG] Checking if near any gang spray...')
--         local Dist = GangSystem.Functions.SprayCheck()
--         print(Dist)
--     end
-- end)

RegisterCommand('testanim', function()
    MainFuncs.LoadAnim('switch@franklin@lamar_tagging_wall')
    -- DoingAnim = true

    -- Citizen.CreateThread(function()
    --     while DoingAnim do
    --         Wait(1)
    --         if not IsEntityPlayingAnim(PlayerPedId(), "switch@franklin@lamar_tagging_wall", "lamar_tagging_wall_loop_lamar", 3) then
    --             TaskPlayAnim(PlayerPedId(), 'switch@franklin@lamar_tagging_wall', 'lamar_tagging_wall_loop_lamar', 15.0, 2.0, -1, 16, 0, 0, 0, 0)
    --         end
    --     end

    -- end)

    -- Citizen.Wait(10000)
    -- DoingAnim = false
    
    TaskPlayAnim(PlayerPedId(), 'switch@franklin@lamar_tagging_wall', 'lamar_tagging_wall_loop_lamar', 15.0, 2.0, -1, 16, 0, 0, 0, 0)
    Citizen.Wait(5000)
    TaskPlayAnim(PlayerPedId(), 'switch@franklin@lamar_tagging_wall', 'lamar_tagging_exit_loop_lamar', 15.0, 2.0, -1, 16, 0, 0, 0, 0)
end)