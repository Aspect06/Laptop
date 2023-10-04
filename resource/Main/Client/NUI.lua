NUI = {
    Display = false,

    sendReactMessage = function(action, data)
        SendNUIMessage({
            action = action,
            data = data
        })
    end,
}

RegisterNUICallback('aspect_laptop:fetchData', function(data, cb)
    local Data = RPC.execute('aspect_laptop:getSettings')

    cb({
        Wallpaper = Data.background,
        DarkMode = Data.darkMode
    })
end)