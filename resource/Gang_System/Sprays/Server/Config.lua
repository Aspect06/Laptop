Config = {
    SprayColors = {
        {
            Model = 'np_sprays_vagos',
            Color = 5, -- Vagos
        },
        {
            Model = 'np_sprays_st',
            Color = 4, -- Street Team
        },
        {
            Model = 'np_sprays_seaside',
            Color = 3, -- Seaside
        },
        {
            Model = 'np_sprays_rust',
            Color = 49, -- Rust
        },
        {
            Model = 'np_sprays_nbc',
            Color = 55, -- NBC
        },
        {
            Model = 'np_sprays_mandem',
            Color = 1, -- Mandem
        },
        {
            Model = 'np_sprays_lost',
            Color = 40, -- Lost MC
        },
        {
            Model = 'np_sprays_kingz',
            Color = 49, -- Kingz
        },
        {
            Model = 'np_sprays_hydra',
            Color = 52, -- Hydra
        },
        {
            Model = 'np_sprays_hoa',
            Color = 47, -- HOA
        },
        {
            Model = 'np_sprays_gsf',
            Color = 2, -- GSF
        },
        {
            Model = 'np_sprays_gg',
            Color = 38, -- Gulag Gang
        },
        {
            Model = 'np_sprays_cg',
            Color = 22, -- Chang Gang
        },
        {
            Model = 'np_sprays_bsk',
            Color = 75, -- BSK
        },
        {
            Model = 'np_sprays_bbmc',
            Color = 57, -- BBMC
        },
        {
            Model = 'np_sprays_ballas',
            Color = 27, -- Ballas
        },
        {
            Model = 'np_sprays_angels',
            Color = 32, -- Angels
        }
    }
}

RPC.register('aspect_laptop:gangs:passGangConfig', function(source, Type)
    if Type == 'Spray Colors' then return Config.SprayColors end
end)