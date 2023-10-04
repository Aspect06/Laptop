MainFuncs = {
    LoadAnim = function(Dict)
        local Timeout = false

        if not HasAnimDictLoaded(Dict) then
            RequestAnimDict(Dict)

            SetTimeout(1000, function() Timeout = true end)

            while not HasAnimDictLoaded(Dict) and not Timeout do
                RequestAnimDict(Dict)
                Wait(0)
            end
        end

        return HasAnimDictLoaded(Dict)
    end,

    PlayAnimation = function(Prop, Anim)
        -- TriggerEvent('rz-prop:AddPropByName', prop)

        MainFuncs.AnimNoCancel(Anim[1], Anim[2])

        -- TriggerEvent('rz-prop:DestroyPropsByName', prop)
        ClearPedTasks(PlayerPedId())
    end,
}