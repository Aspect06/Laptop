RegisterNUICallback('aspect_laptop:settings:setWallpaper', function(data, cb)
    RPC.execute('aspect_laptop:settings:setBackground', data)
    NUI.sendReactMessage('aspect_laptop:main:update')

    cb(true)
end)

RegisterNUICallback('aspect_laptop:settings:updateDarkMode', function(data, cb)
    RPC.execute('aspect_laptop:settings:setDarkMode', data)
    NUI.sendReactMessage('aspect_laptop:main:update')

    cb(true)
end)