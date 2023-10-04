ProgressionFunc = {
    calculateSprays = function(src)
        local Gang = Gangs.FetchGang(src)
        Sprays = 0

        for k, v in ipairs(json.decode(Gang.GangSprays)) do
            Sprays = Sprays + 1
        end

        for k, v in ipairs(ProgressionConfig.Sprays) do
            if tonumber(Sprays) > 200 then
                v.level = 'MAX'
                v.max = 'MAX'

                return v
            end
            
            if Sprays >= v.min and Sprays <= v.max then
                return v
            end
        end
    end,

    calculateWeed = function(src)
        local Gang = Gangs.FetchGang(src)
        Weed = 0

        for k, v in ipairs(json.decode(Gang.progression)['Weed']) do
            Weed = Weed + 1
        end

        for k, v in ipairs(ProgressionConfig.Weed) do
            if tonumber(Weed) > 300 then
                v.level = 'MAX'
                v.max = 'MAX'

                return v
            end
            
            if Weed >= v.min and Weed <= v.max then
                return v
            end
        end
    end,

    calculateMeth = function(src)
        local Gang = Gangs.FetchGang(src)
        Meth = 0

        for k, v in ipairs(json.decode(Gang.progression)['Meth']) do
            Meth = Meth + 1
        end

        for k, v in ipairs(ProgressionConfig.Meth) do
            if tonumber(Meth) > 300 then
                v.level = 'MAX'
                v.max = 'MAX'

                return v
            end
            
            if Meth >= v.min and Meth <= v.max then
                return v
            end
        end
    end,

    calculateProfit = function(src, Drug)
        local Gang = Gangs.FetchGang(src)
        Profit = 0

        for k, v in ipairs(json.decode(Gang.progression)[Drug]) do
            Profit = Profit + v.price
        end

        if Profit == nil then
            Profit = 0
        end

        return Profit
    end,

    ReverseTable = function(ReverseText)
        local reversedTable = {}
    
        for k, v in ipairs(ReverseText) do
            reversedTable[#ReverseText + 1 - k] = v
        end
    
        return reversedTable
    end
}