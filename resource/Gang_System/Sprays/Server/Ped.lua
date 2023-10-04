PedConfig = {
    CalcSprayPrice = function(src)
        local Gang = Gangs.FetchGang(src)
        Sprays = 1

        for k, v in ipairs(json.decode(Gang.GangSprays)) do
            Sprays = Sprays + 1
        end

        return Sprays + 1
    end
}

RPC.register('aspect_laptop:gangs:sprayPrice', function(source)
    local src = source
    return PedConfig.CalcSprayPrice(src) * 10
end)