ProgressionConfig = {
    ['Sprays'] = {
        {
            level = 1,
            min = 0,
            max = 50,
        },
        {
            level = 2,
            min = 50,
            max = 100,
        },
        {
            level = 3,
            min = 100,
            max = 150,
        },
        {
            level = 4,
            min = 150,
            max = 200,
        },
    },

    ['Weed'] = {
        {
            level = 1,
            min = 0,
            max = 100,

            Price = 50 -- This is $50 per bag on the basic level
        },
        {
            level = 2,
            min = 100,
            max = 200,

            Price = 50 -- This is $150 per bag on the middle level
        },
        {
            level = 3,
            min = 200,
            max = 300,

            Price = 50 -- This is $250 per bag on the best level
        }
    },

    ['Meth'] = {
        {
            level = 1,
            min = 0,
            max = 100,

            Price = 200, -- This is $200 per bag on the basic level
        },
        {
            level = 2,
            min = 100,
            max = 200,

            Price = 400, -- This is $400 per bag on the basic level
        },
        {
            level = 3,
            min = 200,
            max = 300,

            Price = 600, -- This is $600 per bag on the basic level
        }
    }
}

-- Information:
-- The more sprays you have placed the better craft bench you will get.
-- The more weed you have sold the better price you will get.
-- The more meth you have sold the better price you will get.